package services;

import java.util.ArrayList;
import java.util.List;

import models.Despesa;
import models.DespesaComGrupo;
import models.DespesaGrupo;
import models.DespesaTipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

@Service
public class DespesaService {

	@Autowired
	private DespesaTipoService despesaTipoService;

	public List<Despesa> buscar(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo) {
		validarGrupoETipo(idUsuario, idDespesaGrupo, idDespesaTipo);
		return Despesa.findList(idDespesaTipo);
	}

	public Despesa buscarPeloId(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo, Long idDespesa) {
		validarGrupoETipo(idUsuario, idDespesaGrupo, idDespesaTipo);
		return Despesa.findUnique(idDespesaTipo, idDespesa);
	}

	@Transactional
	public Despesa salvar(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo, Despesa despesaInput) {
		validarGrupoETipo(idUsuario, idDespesaGrupo, idDespesaTipo);
		Despesa despesa = getDespesa(despesaInput.getCodigo());
		despesa.setDescricao(despesaInput.getDescricao());
		despesa.setDataPagamento(despesaInput.getDataPagamento());
		despesa.setDataVencimento(despesaInput.getDataVencimento());
		despesa.setValorOriginal(despesaInput.getValorOriginal());
		despesa.setValorPago(despesaInput.getValorPago());
		despesa.setIdDespesaTipo(idDespesaTipo);
		despesa.setIdFormaPagamento(despesaInput.getIdFormaPagamento());
		despesa.setRecorrente(false);
		despesa.save();
		return despesa;
	}

	public void remover(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo, Long idDespesa) {
		Despesa despesa = buscarPeloId(idUsuario, idDespesaGrupo, idDespesaTipo, idDespesa);
		Ebean.delete(despesa);
	}

	public Float buscarAcumulado(Long idUsuario) {
		Float acumulado = 0f;
		List<DespesaGrupo> despesasGrupos = DespesaGrupo.find(idUsuario).findList();
		for (DespesaGrupo despesaGrupo : despesasGrupos) {
			List<DespesaTipo> despesasTipos = DespesaTipo.findByGrupo(despesaGrupo.getCodigo()).findList();
			for (DespesaTipo despesaTipo : despesasTipos) {
				List<Despesa> despesas = Despesa.findList(despesaTipo.getCodigo());
				for (Despesa despesa : despesas) {
					Float valorOriginal = despesa.getValorOriginal();
					Float valorPago = despesa.getValorPago();
					acumulado += valorPago == null ? valorOriginal : valorPago;
				}
			}
		}
		return acumulado;
	}

	private void validarGrupoETipo(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo) {
		despesaTipoService.buscarPeloId(idUsuario, idDespesaGrupo, idDespesaTipo);
	}

	private Despesa getDespesa(Long idDespesa) {
		if (idDespesa == null) {
			return new Despesa();
		}
		return Despesa.findUnique(idDespesa);
	}

	public List<DespesaComGrupo> buscarDespesasParaPagar(Long idUsuario) {
		List<DespesaComGrupo> despesasVencendo = new ArrayList<DespesaComGrupo>();
		for (DespesaGrupo despesaGrupo : DespesaGrupo.find(idUsuario).findList()) {
			List<DespesaTipo> despesasTipos = DespesaTipo.findByGrupo(despesaGrupo.getCodigo()).findList();
			for (DespesaTipo despesaTipo : despesasTipos) {
				List<Despesa> despesas = Despesa.findList(despesaTipo.getCodigo());
				for (Despesa despesa : despesas) {
					if (despesa.getDataPagamento() == null) {
						DespesaComGrupo despesaComGrupo = new DespesaComGrupo();
						despesaComGrupo.setDataVencimento(despesa.getDataVencimento());
						despesaComGrupo.setDescricao(despesa.getDescricao());
						despesaComGrupo.setIdDespesa(despesa.getCodigo());
						despesaComGrupo.setIdDespesaTipo(despesaTipo.getCodigo());
						despesaComGrupo.setIdDespesaGrupo(despesaGrupo.getCodigo());
						despesaComGrupo.setValorAPagar(despesa.getValorOriginal());
						despesasVencendo.add(despesaComGrupo);
					}
				}
			}
		}
		return despesasVencendo;
	}
}
