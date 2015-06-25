package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import models.inputs.LoginInput;

import org.springframework.stereotype.Service;

import play.db.DB;
import exceptions.MyMoneyException;

@Service
public class LoginDAO {

	public boolean autenticar(LoginInput loginInput) throws MyMoneyException, SQLException {
		Connection connection = DB.getConnection();
		String sql = "select * from Usuario where dsEmail = '" + loginInput.getEmail() + "' and dsSenha = md5('" + loginInput.getSenha() + "');";
		Statement statement = connection.createStatement();
		ResultSet resultSet = statement.executeQuery(sql);
		boolean estahAutenticado = resultSet.next();
		connection.close();
		return estahAutenticado;
	}

}
