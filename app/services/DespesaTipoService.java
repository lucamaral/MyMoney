package services;

import java.util.List;

import models.DespesaTipo;
import models.inputs.DespesaTipoInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.DespesaGrupoValidator;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class DespesaTipoService {

	@Autowired
	private DespesaGrupoValidator despesaGrupoValidator;

	public List<DespesaTipo> buscar(Long idUsuario, Long idDespesaGrupo) {
		despesaGrupoValidator.grupoPertenceAoUsuario(idUsuario, idDespesaGrupo);
		return DespesaTipo.findByGrupo(idDespesaGrupo).findList();
	}

	@Transactional
	public void novo(Long idUsuario, DespesaTipoInput despesaTipoInput) {
		DespesaTipo despesaTipo = new DespesaTipo();
		despesaTipo.setDescricao(despesaTipoInput.getDescricao());
		despesaTipo.setIdDespesaGrupo(despesaTipoInput.getIdDespesaGrupo());
		despesaTipo.save();
	}

	@Transactional
	public void remover(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo) {
		DespesaTipo despesaTipo = buscarPeloId(idUsuario, idDespesaGrupo, idDespesaTipo);
		Ebean.delete(despesaTipo);
	}

	@Transactional
	public void atualizar(Long idUsuario, DespesaTipo despesaTipoParaAtualizar) {
		DespesaTipo despesaTipo = buscarPeloId(idUsuario, despesaTipoParaAtualizar.getIdDespesaGrupo(), despesaTipoParaAtualizar.getCodigo());
		despesaTipo.setDescricao(despesaTipoParaAtualizar.getDescricao());
		despesaTipo.save();
	}

	public DespesaTipo buscarPeloId(Long idUsuario, Long idDespesaGrupo, Long idDespesaTipo) {
		despesaGrupoValidator.grupoPertenceAoUsuario(idUsuario, idDespesaGrupo);
		DespesaTipo despesaTipo = DespesaTipo.find(idDespesaGrupo, idDespesaTipo).findUnique();
		if (despesaTipo == null) {
			throw new MyMoneyException(ErrorCode.DESPESA_NAO_ENCONTRADA);
		}
		return despesaTipo;
	}

}
