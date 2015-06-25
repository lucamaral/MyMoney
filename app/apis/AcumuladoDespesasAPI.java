package apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.AcumuladoDespesasService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class AcumuladoDespesasAPI extends Controller {

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private AcumuladoDespesasService acumuladoDespesasService;

	@Autenticado
	@TratarExcecao
	public Result buscarGrupos() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		return ok(Json.toJson(acumuladoDespesasService.buscarGrupos(idUsuario)));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarTipos(Long idDespesaGrupo) {
		return ok(Json.toJson(acumuladoDespesasService.buscarTipos(idDespesaGrupo)));
	}

}
