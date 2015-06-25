package services;

import java.util.List;

import models.ReceitaTipo;
import models.inputs.ReceitaTipoInput;

import org.springframework.stereotype.Service;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

@Service
public class ReceitaTipoService {
	
	public List<ReceitaTipo> buscar(Long idUsuario) {
		return ReceitaTipo.find(idUsuario).findList();
	}
	
	public ReceitaTipo buscar(Long idUsuario, Long codigo) {
		return ReceitaTipo.find(idUsuario, codigo).findUnique();
	}

	@Transactional
	public void novo(Long idUsuario, ReceitaTipoInput receitaTipoInput) {
		ReceitaTipo receitaTipo = new ReceitaTipo();
		receitaTipo.setDescricao(receitaTipoInput.getDescricao());
		receitaTipo.setIdUsuario(idUsuario);
		receitaTipo.save();
	}

	@Transactional
	public void remover(Long idUsuario, Long idReceitaTipo) {
		ReceitaTipo receitaTipo = buscar(idUsuario, idReceitaTipo);
		Ebean.delete(receitaTipo);
	}
	
	@Transactional
	public void atualizar(Long idUsuario, ReceitaTipo receitaTipoParaAtualizar) {
		ReceitaTipo receitaTipoOriginal = ReceitaTipo.find(idUsuario, receitaTipoParaAtualizar.getCodigo()).findUnique();
		receitaTipoOriginal.setDescricao(receitaTipoParaAtualizar.getDescricao());
		receitaTipoOriginal.save();
	}
}
