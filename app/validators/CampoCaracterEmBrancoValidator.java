package validators;

import static exceptions.ErrorCode.USUARIO_CAMPO_VAZIO;

import org.springframework.stereotype.Service;

import exceptions.MyMoneyException;

@Service
public class CampoCaracterEmBrancoValidator {

	public void validar(String nomeCampo, String valorCampo) throws MyMoneyException {
		if (valorCampo == null || valorCampo.isEmpty()) {
			MyMoneyException excecaoCampoVazio = new MyMoneyException(USUARIO_CAMPO_VAZIO);
			excecaoCampoVazio.adicionarInformacao("Campo em branco: " + nomeCampo);
			throw excecaoCampoVazio;
		}
	}
}
