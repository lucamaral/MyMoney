package controllers;

import org.springframework.stereotype.Service;

import play.mvc.Content;
import play.mvc.Controller;
import play.mvc.Result;
import session.SessionHelper;
import authentication.Autenticado;

@Service
public class Application extends Controller {

	@Autenticado
	public Result inicio() {
		String nomeDoUsuario = session(SessionHelper.SESSION_USUARIO_NOME);
		return ok(views.html.index.render(nomeDoUsuario));
	}

	public Result telaLogin() {
		session().clear();
		Content page = views.html.login.render();
		if (possuiErroDeValidacao()) {
			return unauthorized(page);
		}
		return ok(page);
	}

	private boolean possuiErroDeValidacao() {
		return flash("erro") != null;
	}
}
