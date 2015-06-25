package services;

import java.sql.SQLException;

import models.inputs.LoginInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.login.LoginValidator;
import dao.LoginDAO;
import exceptions.MyMoneyException;

@Service
public class LoginService {

	@Autowired
	private LoginDAO loginDAO;

	@Autowired
	private LoginValidator loginValidator;

	public boolean autenticar(LoginInput loginInput) throws MyMoneyException, SQLException {
		loginValidator.validarLogin(loginInput);
		return loginDAO.autenticar(loginInput);
	}

}
