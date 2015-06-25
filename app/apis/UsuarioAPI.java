package apis;

import java.sql.SQLException;

import models.Usuario;
import models.inputs.AlterarSenhaInput;
import models.inputs.UsuarioInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.UsuarioService;
import session.SessionHelper;
import authentication.Autenticado;
import exceptions.MyMoneyException;
import exceptions.tratadores.TratadorDeExcecao;
import exceptions.tratadores.TratarExcecao;

@Service
public class UsuarioAPI extends Controller {

	@Autowired
	private JsonParser jsonParser;

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private TratadorDeExcecao tratadorDeExcecaoSQL;

	@TratarExcecao
	public Result novo() throws MyMoneyException, SQLException {
		UsuarioInput usuarioInput = jsonParser.bindFromRequest(UsuarioInput.class);
		Usuario usuarioCriado = usuarioService.novo(usuarioInput);
		return ok(Json.toJson(usuarioCriado));
	}

	@Autenticado
	public Result buscarUsuarioDaSessao() {
		return ok(Json.toJson(sessionHelper.buscarDaSessao()));
	}

	@Autenticado
	@TratarExcecao
	public Result atualizarUsuarioDaSessao() throws MyMoneyException, SQLException {
		UsuarioInput usuarioInput = jsonParser.bindFromRequest(UsuarioInput.class);
		Long codigoUsuarioSessao = sessionHelper.buscarDaSessao().getCodigo();
		Usuario usuarioAtualizado = usuarioService.atualizar(codigoUsuarioSessao, usuarioInput);
		sessionHelper.colocarNaSessao(usuarioAtualizado);
		return ok(Json.toJson(usuarioAtualizado));
	}

	@Autenticado
	@TratarExcecao
	public Result atualizarSenhaUsuarioDaSessao() throws MyMoneyException, SQLException {
		AlterarSenhaInput alterarSenhaInput = jsonParser.bindFromRequest(AlterarSenhaInput.class);
		Long codigoUsuarioSessao = sessionHelper.buscarDaSessao().getCodigo();
		usuarioService.atualizarSenha(codigoUsuarioSessao, alterarSenhaInput);
		return ok();
	}

	@Autenticado
	@TratarExcecao
	public Result removerConta() throws SQLException, MyMoneyException {
		Long codigoUsuario = sessionHelper.buscarDaSessao().getCodigo();
		usuarioService.remover(codigoUsuario);
		return ok();
	}
}
