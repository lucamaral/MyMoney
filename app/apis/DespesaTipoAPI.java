package apis;

import models.DespesaTipo;
import models.inputs.DespesaTipoInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DespesaTipoService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class DespesaTipoAPI extends Controller {

	@Autowired
	private DespesaTipoService despesaTipoService;

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private JsonParser jsonParser;

	@Autenticado
	@TratarExcecao
	public Result buscar(Long idDespesaGrupo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaTipoService.buscar(idUsuario, idDespesaGrupo)));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long idDespesaGrupo, Long idDespesaTipo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaTipoService.buscarPeloId(idUsuario, idDespesaGrupo, idDespesaTipo)));
	}

	@Autenticado
	@TratarExcecao
	public Result novo(Long idDespesaGrupo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		DespesaTipoInput despesaTipoInput = jsonParser.bindFromRequest(DespesaTipoInput.class);
		despesaTipoInput.setIdDespesaGrupo(idDespesaGrupo);
		despesaTipoService.novo(idUsuario, despesaTipoInput);
		return buscar(despesaTipoInput.getIdDespesaGrupo());
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long idDespesaGrupo, Long codigo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		despesaTipoService.remover(idUsuario, idDespesaGrupo, codigo);
		return buscar(idDespesaGrupo);
	}

	@Autenticado
	@TratarExcecao
	public Result atualizar(Long idDespesaGrupo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		DespesaTipo despesaTipoParaAtualizar = jsonParser.bindFromRequest(DespesaTipo.class);
		despesaTipoParaAtualizar.setIdDespesaGrupo(idDespesaGrupo);
		despesaTipoService.atualizar(idUsuario, despesaTipoParaAtualizar);
		return buscar(idDespesaGrupo);
	}
}
