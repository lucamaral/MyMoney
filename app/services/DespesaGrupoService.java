package services;

import java.util.List;

import models.DespesaGrupo;
import models.inputs.DespesaGrupoInput;

import org.springframework.stereotype.Service;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

@Service
public class DespesaGrupoService {

	public List<DespesaGrupo> buscar(Long idUsuario) {
		return DespesaGrupo.find(idUsuario).findList();
	}

	public DespesaGrupo buscar(Long idUsuario, Long codigo) {
		return DespesaGrupo.find(idUsuario, codigo).findUnique();
	}

	@Transactional
	public void novo(Long idUsuario, DespesaGrupoInput despesaGrupoInput) {
		DespesaGrupo despesaGrupo = new DespesaGrupo();
		despesaGrupo.setDescricao(despesaGrupoInput.getDescricao());
		despesaGrupo.setIdUsuario(idUsuario);
		despesaGrupo.save();
	}

	@Transactional
	public void remover(Long idUsuario, Long idDespesaGrupo) {
		DespesaGrupo despesaGrupo = buscar(idUsuario, idDespesaGrupo);
		Ebean.delete(despesaGrupo);
	}

	@Transactional
	public void atualizar(Long idUsuario, DespesaGrupo despesaGrupoParaAtualizar) {
		DespesaGrupo despesaGrupoOriginal = DespesaGrupo.find(idUsuario, despesaGrupoParaAtualizar.getCodigo()).findUnique();
		despesaGrupoOriginal.setDescricao(despesaGrupoParaAtualizar.getDescricao());
		despesaGrupoOriginal.save();
	}

}
