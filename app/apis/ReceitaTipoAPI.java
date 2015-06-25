package apis;

import models.ReceitaTipo;
import models.inputs.ReceitaTipoInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.ReceitaTipoService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class ReceitaTipoAPI extends Controller {

	@Autowired
	private ReceitaTipoService receitaTipoService;

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private JsonParser jsonParser;

	@Autenticado
	@TratarExcecao
	public Result buscar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(receitaTipoService.buscar(idUsuario)));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long codigo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(receitaTipoService.buscar(idUsuario, codigo)));
	}

	@Autenticado
	@TratarExcecao
	public Result novo() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		ReceitaTipoInput receitaTipoInput = jsonParser.bindFromRequest(ReceitaTipoInput.class);
		receitaTipoService.novo(idUsuario, receitaTipoInput);
		return buscar();
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long codigo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		receitaTipoService.remover(idUsuario, codigo);
		return buscar();
	}

	@Autenticado
	@TratarExcecao
	public Result atualizar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		ReceitaTipo receitaTipo = jsonParser.bindFromRequest(ReceitaTipo.class);
		receitaTipoService.atualizar(idUsuario, receitaTipo);
		return buscar();
	}
}
