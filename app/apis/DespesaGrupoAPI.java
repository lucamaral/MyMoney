package apis;

import models.DespesaGrupo;
import models.inputs.DespesaGrupoInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DespesaGrupoService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class DespesaGrupoAPI extends Controller {

	@Autowired
	private DespesaGrupoService despesaGrupoService;

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private JsonParser jsonParser;

	@Autenticado
	@TratarExcecao
	public Result buscar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaGrupoService.buscar(idUsuario)));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long codigo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaGrupoService.buscar(idUsuario, codigo)));
	}

	@Autenticado
	@TratarExcecao
	public Result novo() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		DespesaGrupoInput despesaGrupoInput = jsonParser.bindFromRequest(DespesaGrupoInput.class);
		despesaGrupoService.novo(idUsuario, despesaGrupoInput);
		return buscar();
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long codigo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		despesaGrupoService.remover(idUsuario, codigo);
		return buscar();
	}

	@Autenticado
	@TratarExcecao
	public Result atualizar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		DespesaGrupo despesaGrupo = jsonParser.bindFromRequest(DespesaGrupo.class);
		despesaGrupoService.atualizar(idUsuario, despesaGrupo);
		return buscar();
	}
}
