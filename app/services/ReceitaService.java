package services;

import java.util.List;

import models.Receita;
import models.ReceitaTipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.ReceitaTipoValidator;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

@Service
public class ReceitaService {

	@Autowired
	private ReceitaTipoValidator receitaTipoValidator;

	public List<Receita> buscar(Long idUsuario, Long idReceitaTipo) {
		receitaTipoValidator.tipoPertenceAoUsuario(idUsuario, idReceitaTipo);
		return Receita.find(idReceitaTipo).findList();
	}

	public Receita buscarPeloId(Long idReceitaTipo, Long idReceita) {
		return Receita.find(idReceitaTipo, idReceita);
	}

	@Transactional
	public Receita salvar(Long idReceitaTipo, Receita receitaInput) {
		Receita receita = getReceita(receitaInput.getCodigo());
		receita.setDescricao(receitaInput.getDescricao());
		receita.setDataPrevista(receitaInput.getDataPrevista());
		receita.setDataRecebimento(receitaInput.getDataRecebimento());
		receita.setValorOriginal(receitaInput.getValorOriginal());
		receita.setValorRecebido(receitaInput.getValorRecebido());
		receita.setIdReceitaTipo(idReceitaTipo);
		receita.setIdFormaPagamento(receitaInput.getIdFormaPagamento());
		receita.setRecorrente(false);
		receita.save();
		return receita;
	}

	public void remover(Long idReceitaTipo, Long idReceita) {
		Receita receita = buscarPeloId(idReceitaTipo, idReceita);
		Ebean.delete(receita);
	}

	public Float buscarAcumulado(Long idUsuario) {
		Float acumulado = 0f;
		List<ReceitaTipo> receitasTipos = ReceitaTipo.find(idUsuario).findList();
		for (ReceitaTipo receitaTipo : receitasTipos) {
			List<Receita> receitas = Receita.find(receitaTipo.getCodigo()).findList();
			for (Receita receita : receitas) {
				Float valorOriginal = receita.getValorOriginal();
				Float valorRecebido = receita.getValorRecebido();
				acumulado += valorRecebido == null ? valorOriginal : valorRecebido;
			}
		}
		return acumulado;
	}

	private Receita getReceita(Long idReceita) {
		if (idReceita == null) {
			return new Receita();
		}
		return Receita.findUnique(idReceita);
	}

}
