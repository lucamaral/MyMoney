package apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.SaldoService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class SaldoAPI extends Controller {

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private SaldoService saldoService;

	@Autenticado
	@TratarExcecao
	public Result buscar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(saldoService.buscar(idUsuario)));
	}

	@Autenticado
	@TratarExcecao
	public Result atualizar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(saldoService.atualizar(idUsuario)));
	}
}
