package services;

import java.util.ArrayList;
import java.util.List;

import models.Acumulado;
import models.Despesa;
import models.DespesaGrupo;
import models.DespesaTipo;

import org.springframework.stereotype.Service;

@Service
public class AcumuladoDespesasService {

	public List<Acumulado> buscarGrupos(Long idUsuario) {
		List<Acumulado> despesasGrupoAcumulados = new ArrayList<Acumulado>();

		for (DespesaGrupo despesaGrupo : DespesaGrupo.find(idUsuario).findList()) {
			Acumulado acumuladoPorGrupo = new Acumulado();
			Float totalPorGrupo = 0f;
			for (DespesaTipo despesaTipo : DespesaTipo.findByGrupo(despesaGrupo.getCodigo()).findList()) {
				for (Despesa despesa : Despesa.findList(despesaTipo.getCodigo())) {
					Float valorOriginal = despesa.getValorOriginal();
					Float valorPago = despesa.getValorPago();
					totalPorGrupo += valorPago == null ? valorOriginal : valorPago;
				}
			}
			acumuladoPorGrupo.setCodigo(despesaGrupo.getCodigo());
			acumuladoPorGrupo.setDescricao(despesaGrupo.getDescricao());
			acumuladoPorGrupo.setAcumulado(totalPorGrupo);
			despesasGrupoAcumulados.add(acumuladoPorGrupo);
		}

		return despesasGrupoAcumulados;
	}

	public List<Acumulado> buscarTipos(Long idDespesaGrupo) {
		List<Acumulado> despesasTiposAcumulados = new ArrayList<Acumulado>();

		for (DespesaTipo despesaTipo : DespesaTipo.findByGrupo(idDespesaGrupo).findList()) {
			Acumulado acumuladoPorTipo = new Acumulado();
			Float totalPorTipo = 0f;
			for (Despesa despesa : Despesa.findList(despesaTipo.getCodigo())) {
				Float valorOriginal = despesa.getValorOriginal();
				Float valorPago = despesa.getValorPago();
				totalPorTipo += valorPago == null ? valorOriginal : valorPago;
			}
			acumuladoPorTipo.setCodigo(despesaTipo.getCodigo());
			acumuladoPorTipo.setDescricao(despesaTipo.getDescricao());
			acumuladoPorTipo.setAcumulado(totalPorTipo);
			despesasTiposAcumulados.add(acumuladoPorTipo);
		}

		return despesasTiposAcumulados;
	}

}
