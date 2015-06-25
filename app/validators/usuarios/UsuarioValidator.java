package validators.usuarios;

import java.sql.SQLException;

import models.inputs.UsuarioInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.CampoCaracterEmBrancoValidator;
import exceptions.MyMoneyException;

@Service
public class UsuarioValidator {

	@Autowired
	private CampoCaracterEmBrancoValidator campoCaracterEmBrancoValidator;

	@Autowired
	private SenhaUsuarioValidator senhaUsuarioValidator;

	@Autowired
	private EmailJaExisteValidator emailJaExisteValidator;

	public void novo(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		validacaoBasicaSemSenha(usuarioInput);
		senhaUsuarioValidator.validar(usuarioInput.getSenha());
	}

	public void atualizar(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		validacaoBasicaSemSenha(usuarioInput);
	}

	private void validacaoBasicaSemSenha(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		campoCaracterEmBrancoValidator.validar("Email", usuarioInput.getEmail());
		campoCaracterEmBrancoValidator.validar("Nome", usuarioInput.getNome());
		emailJaExisteValidator.validar(usuarioInput);
	}

}
