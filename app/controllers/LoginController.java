package controllers;

import java.sql.SQLException;

import models.Usuario;
import models.inputs.LoginInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parsers.JsonParser;
import play.mvc.Controller;
import play.mvc.Result;
import services.LoginService;
import services.UsuarioService;
import session.SessionHelper;
import exceptions.MyMoneyException;

@Service
public class LoginController extends Controller {

	@Autowired
	private JsonParser jsonParser;

	@Autowired
	private LoginService loginService;

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private SessionHelper sessionHelper;

	public Result logar() {
		session().clear();
		try {
			LoginInput loginInput = jsonParser.bindFromRequest(LoginInput.class);
			return fazerLogin(loginInput);
		} catch (MyMoneyException e) {
			return redirecionarParaLoginComErro(e.getMessage());
		} catch (SQLException e) {
			return redirecionarParaLoginComErro(e.getMessage());
		}
	}

	private Result fazerLogin(LoginInput loginInput) throws MyMoneyException, SQLException {
		if (loginService.autenticar(loginInput)) {
			Usuario usuario = usuarioService.buscar(loginInput.getEmail());
			sessionHelper.colocarNaSessao(usuario);
			return redirect("/");
		}
		return redirecionarParaLoginComErro("Usuário Inválido...");
	}

	private Result redirecionarParaLoginComErro(String erro) {
		flash("erro", erro);
		return redirect("/login");
	}
}
