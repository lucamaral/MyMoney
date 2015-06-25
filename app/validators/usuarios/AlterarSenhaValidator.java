package validators.usuarios;

import java.sql.SQLException;

import models.inputs.AlterarSenhaInput;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UsuarioDAO;
import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class AlterarSenhaValidator {

	@Autowired
	private SenhaUsuarioValidator senhaUsuarioValidator;

	@Autowired
	private UsuarioDAO usuarioDAO;

	public void validar(Long codigoUsuario, AlterarSenhaInput alterarSenhaInput) throws MyMoneyException, SQLException {
		if (!usuarioDAO.antigaSenhaValida(codigoUsuario, alterarSenhaInput.getAntigaSenha())) {
			throw new MyMoneyException(ErrorCode.SENHA_ANTIGA_NAO_CORRESPONDENTE);
		}
		senhaUsuarioValidator.validar(alterarSenhaInput.getNovaSenha());
	}

}
