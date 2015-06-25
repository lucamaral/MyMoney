package apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.FormasPagamentoService;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class FormasPagamentoAPI extends Controller {

	@Autowired
	private FormasPagamentoService formasPagamentoService;

	@Autenticado
	@TratarExcecao
	public Result buscar() {
		return ok(Json.toJson(formasPagamentoService.buscar()));
	}
}
