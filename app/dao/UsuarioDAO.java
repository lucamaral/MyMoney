package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import models.Usuario;
import models.inputs.UsuarioInput;

import org.springframework.stereotype.Service;

import play.db.DB;
import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class UsuarioDAO {

	public static final long CODIGO_USUARIO_NAO_ENCONTRADO = -1L;

	public Usuario novo(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		Connection connection = DB.getConnection();
		PreparedStatement statement = connection.prepareStatement("insert into Usuario (dsUsuario, dsEmail, dsSenha) values (?, ?, md5(?));");
		statement.setString(1, usuarioInput.getNome());
		statement.setString(2, usuarioInput.getEmail());
		statement.setString(3, usuarioInput.getSenha());
		statement.executeUpdate();
		connection.close();
		return buscar(usuarioInput.getEmail());
	}

	public Usuario buscar(String email) throws MyMoneyException, SQLException {
		Connection connection = DB.getConnection();
		Statement statement = connection.createStatement();
		ResultSet resultSet = statement.executeQuery("select idUsuario, dsUsuario, dsEmail from Usuario where dsEmail = '" + email + "';");
		if (resultSet.next()) {
			Usuario usuario = new Usuario();
			usuario.setCodigo(resultSet.getLong("idUsuario"));
			usuario.setNome(resultSet.getString("dsUsuario"));
			usuario.setEmail(resultSet.getString("dsEmail"));
			connection.close();
			return usuario;
		}
		connection.close();
		MyMoneyException excecaoEmailNaoCorrespondente = new MyMoneyException(ErrorCode.EMAIL_NAO_CORRESPONDENTE);
		excecaoEmailNaoCorrespondente.adicionarInformacao("Email : " + email);
		throw excecaoEmailNaoCorrespondente;
	}

	public Long buscarCodigo(String email) throws SQLException {
		try {
			return buscar(email).getCodigo();
		} catch (MyMoneyException e) {
			return CODIGO_USUARIO_NAO_ENCONTRADO;
		}
	}

	public Usuario atualizar(Long codigoUsuarioSessao, UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		Connection connection = DB.getConnection();
		PreparedStatement statement = connection.prepareStatement("update Usuario set dsUsuario = ?, dsEmail = ? where idUsuario = ?");
		statement.setString(1, usuarioInput.getNome());
		statement.setString(2, usuarioInput.getEmail());
		statement.setLong(3, codigoUsuarioSessao);
		statement.executeUpdate();
		connection.close();
		return buscar(usuarioInput.getEmail());
	}

	public boolean antigaSenhaValida(Long codigoUsuario, String antigaSenha) throws SQLException {
		Connection connection = DB.getConnection();
		Statement statement = connection.createStatement();
		String sql = "select * from Usuario where idUsuario = '" + codigoUsuario + "' and dsSenha = md5('" + antigaSenha + "');";
		ResultSet resultSet = statement.executeQuery(sql);
		boolean achouSenhaAntiga = resultSet.next();
		connection.close();
		return achouSenhaAntiga;
	}

	public void atualizarSenha(Long codigoUsuarioSessao, String novaSenha) throws SQLException {
		Connection connection = DB.getConnection();
		PreparedStatement statement = connection.prepareStatement("update Usuario set dsSenha = md5(?) where idUsuario = ?");
		statement.setString(1, novaSenha);
		statement.setLong(2, codigoUsuarioSessao);
		statement.executeUpdate();
		connection.close();
	}

	public void remover(Long codigoUsuario) throws SQLException, MyMoneyException {
		Connection connection = DB.getConnection();
		Statement statement = connection.createStatement();
		String sql = "delete from Usuario where idUsuario = '" + codigoUsuario + "';";
		statement.execute(sql);
		connection.close();
	}

}
