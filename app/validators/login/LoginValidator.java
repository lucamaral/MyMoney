package validators.login;

import models.inputs.LoginInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.CampoCaracterEmBrancoValidator;
import exceptions.MyMoneyException;

@Service
public class LoginValidator {

	@Autowired
	private CampoCaracterEmBrancoValidator campoCaracterEmBrancoValidator;

	public void validarLogin(LoginInput loginInput) throws MyMoneyException {
		campoCaracterEmBrancoValidator.validar("Email", loginInput.getEmail());
		campoCaracterEmBrancoValidator.validar("Senha", loginInput.getSenha());
	}

}
