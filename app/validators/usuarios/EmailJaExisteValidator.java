package validators.usuarios;

import java.sql.SQLException;

import models.inputs.UsuarioInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UsuarioDAO;
import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class EmailJaExisteValidator {

	@Autowired
	private UsuarioDAO usuarioDAO;

	public void validar(UsuarioInput usuarioInput) throws MyMoneyException, SQLException {
		Long codigoUsuarioBuscado = usuarioDAO.buscarCodigo(usuarioInput.getEmail());
		if (possuiUmUsuarioDiferenteComOMesmoEmail(usuarioInput.getCodigo(), codigoUsuarioBuscado)) {
			MyMoneyException excecaoEmailJaExiste = new MyMoneyException(ErrorCode.USUARIO_JA_EXISTE);
			excecaoEmailJaExiste.adicionarInformacao("Email: " + usuarioInput);
			throw excecaoEmailJaExiste;
		}
	}

	private boolean possuiUmUsuarioDiferenteComOMesmoEmail(Long codigoUsuarioInput, Long codigoUsuarioBuscado) {
		if (existeAlgumUsuarioJaCadastradoComOEmail(codigoUsuarioBuscado)) {
			if (ehUmUsuarioParaCadastro(codigoUsuarioInput)) {
				return true;
			}
			return usuarioAlteradoMudouOEmail(codigoUsuarioInput, codigoUsuarioBuscado);
		}
		return false;
	}

	private boolean usuarioAlteradoMudouOEmail(Long codigoUsuarioInput, Long codigoUsuarioBuscado) {
		return codigoUsuarioInput != codigoUsuarioBuscado;
	}

	private boolean existeAlgumUsuarioJaCadastradoComOEmail(Long codigoUsuarioBuscado) {
		return codigoUsuarioBuscado != UsuarioDAO.CODIGO_USUARIO_NAO_ENCONTRADO;
	}

	private boolean ehUmUsuarioParaCadastro(Long codigoUsuarioInput) {
		return codigoUsuarioInput == null;
	}
}
