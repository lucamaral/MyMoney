package services;

import java.sql.SQLException;

import models.Usuario;
import models.inputs.AlterarSenhaInput;
import models.inputs.UsuarioInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.usuarios.AlterarSenhaValidator;
import validators.usuarios.UsuarioValidator;
import dao.UsuarioDAO;
import exceptions.MyMoneyException;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioValidator usuarioValidator;

	@Autowired
	private UsuarioDAO usuarioDAO;

	@Autowired
	private AlterarSenhaValidator alterarSenhaValidator;

	public Usuario novo(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		usuarioValidator.novo(usuarioInput);
		return usuarioDAO.novo(usuarioInput);
	}

	public Usuario buscar(String email) throws MyMoneyException, SQLException {
		return usuarioDAO.buscar(email);
	}

	public Usuario atualizar(Long codigoUsuarioSessao, UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		usuarioValidator.atualizar(usuarioInput);
		return usuarioDAO.atualizar(codigoUsuarioSessao, usuarioInput);
	}

	public void atualizarSenha(Long codigoUsuarioSessao, AlterarSenhaInput alterarSenhaInput) throws MyMoneyException, SQLException {
		alterarSenhaValidator.validar(codigoUsuarioSessao, alterarSenhaInput);
		usuarioDAO.atualizarSenha(codigoUsuarioSessao, alterarSenhaInput.getNovaSenha());
	}

	public void remover(Long codigoUsuario) throws SQLException, MyMoneyException {
		usuarioDAO.remover(codigoUsuario);
	}
}
