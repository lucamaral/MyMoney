package apis;

import java.util.List;

import models.Despesa;
import models.DespesaComGrupo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.DespesaService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class DespesaAPI extends Controller {

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private DespesaService despesaService;

	@Autowired
	private JsonParser jsonParser;

	@Autenticado
	@TratarExcecao
	public Result buscar(Long idDespesaGrupo, Long idDespesaTipo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaService.buscar(idUsuario, idDespesaGrupo, idDespesaTipo)));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long idDespesaGrupo, Long idDespesaTipo, Long idDespesa) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(despesaService.buscarPeloId(idUsuario, idDespesaGrupo, idDespesaTipo, idDespesa)));
	}

	@Autenticado
	@TratarExcecao
	public Result salvar(Long idDespesaGrupo, Long idDespesaTipo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		Despesa despesaInput = jsonParser.bindFromRequest(Despesa.class);
		return ok(Json.toJson(despesaService.salvar(idUsuario, idDespesaGrupo, idDespesaTipo, despesaInput)));
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long idDespesaGrupo, Long idDespesaTipo, Long idDespesa) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		despesaService.remover(idUsuario, idDespesaGrupo, idDespesaTipo, idDespesa);
		return buscar(idDespesaGrupo, idDespesaTipo);
	}

	@Autenticado
	@TratarExcecao
	public Result buscarDespesasParaPagar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		List<DespesaComGrupo> despesas = despesaService.buscarDespesasParaPagar(idUsuario);
		return ok(Json.toJson(despesas));
	}
}
