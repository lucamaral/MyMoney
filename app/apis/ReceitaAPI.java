package apis;

import java.util.List;

import models.Receita;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.ReceitaService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class ReceitaAPI extends Controller {

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private ReceitaService receitaService;

	@Autowired
	private JsonParser jsonParser;

	@Autenticado
	@TratarExcecao
	public Result buscar(Long idReceitaTipo) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		List<Receita> receitas = receitaService.buscar(idUsuario, idReceitaTipo);
		return ok(Json.toJson(receitas));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long idReceitaTipo, Long idReceita) {
		Receita receita = receitaService.buscarPeloId(idReceitaTipo, idReceita);
		return ok(Json.toJson(receita));
	}

	@Autenticado
	@TratarExcecao
	public Result salvar(Long idReceitaTipo) {
		Receita receitaInput = jsonParser.bindFromRequest(Receita.class);
		Receita receitaSalva = receitaService.salvar(idReceitaTipo, receitaInput);
		return ok(Json.toJson(receitaSalva));
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long idReceitaTipo, Long idReceita) {
		receitaService.remover(idReceitaTipo, idReceita);
		return buscar(idReceitaTipo);
	}
}
