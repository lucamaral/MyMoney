package apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.AcumuladoReceitasService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class AcumuladoReceitasAPI extends Controller {

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private AcumuladoReceitasService acumuladoReceitasService;

	@Autenticado
	@TratarExcecao
	public Result buscarTipos() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(acumuladoReceitasService.buscarTipos(idUsuario)));
	}
}
