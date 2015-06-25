package session;

import models.Usuario;

import org.springframework.stereotype.Service;

import play.mvc.Controller;

@Service
public class SessionHelper extends Controller {

	public static final String SESSION_USUARIO_EMAIL = "emailUsuario";
	public static final String SESSION_USUARIO_NOME = "nomeUsuario";
	public static final String SESSION_USUARIO_CODIGO = "codigoUsuario";

	public void colocarNaSessao(Usuario usuario) {
		session().clear();
		session(SessionHelper.SESSION_USUARIO_CODIGO, String.valueOf(usuario.getCodigo()));
		session(SessionHelper.SESSION_USUARIO_NOME, usuario.getNome());
		session(SessionHelper.SESSION_USUARIO_EMAIL, usuario.getEmail());
	}

	public Usuario buscarDaSessao() {
		Usuario usuarioDaSessao = new Usuario();
		usuarioDaSessao.setCodigo(Long.valueOf(session().get(SessionHelper.SESSION_USUARIO_CODIGO)));
		usuarioDaSessao.setNome(session().get(SessionHelper.SESSION_USUARIO_NOME));
		usuarioDaSessao.setEmail(session().get(SessionHelper.SESSION_USUARIO_EMAIL));
		return usuarioDaSessao;
	}

	public boolean algumUsuarioEstahLogado() {
		return session().get(SessionHelper.SESSION_USUARIO_EMAIL) != null;
	}
}
