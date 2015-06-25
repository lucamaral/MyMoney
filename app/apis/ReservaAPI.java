package apis;

import java.util.List;

import models.Reserva;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.ReservaService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.tratadores.TratarExcecao;

@Service
public class ReservaAPI extends Controller {

	@Autowired
	private JsonParser jsonParser;

	@Autowired
	private ReservaService reservaService;

	@Autowired
	private SessionHelper sessionHelper;

	@Autenticado
	@TratarExcecao
	public Result buscar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		List<Reserva> reservas = reservaService.buscar(idUsuario);
		return ok(Json.toJson(reservas));
	}

	@Autenticado
	@TratarExcecao
	public Result buscarPeloId(Long idReserva) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		Reserva reserva = reservaService.buscarPeloId(idUsuario, idReserva);
		return ok(Json.toJson(reserva));
	}

	@Autenticado
	@TratarExcecao
	public Result salvar() {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		Reserva reserva = jsonParser.bindFromRequest(Reserva.class);
		Reserva reservaSalva = reservaService.salvar(idUsuario, reserva);
		return ok(Json.toJson(reservaSalva));
	}

	@Autenticado
	@TratarExcecao
	public Result remover(Long idReserva) {
		Long idUsuario = sessionHelper.buscarDaSessao().getCodigo();
		reservaService.remover(idUsuario, idReserva);
		return buscar();
	}
}
