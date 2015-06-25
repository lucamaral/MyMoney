package validators.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import validators.CampoCaracterEmBrancoValidator;
import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class SenhaUsuarioValidator {

	private static final int TAMANHO_MINIMO_SENHA = 6;

	@Autowired
	private CampoCaracterEmBrancoValidator campoCaracterEmBrancoValidator;

	public void validar(String senha) throws MyMoneyException {
		campoCaracterEmBrancoValidator.validar("Senha", senha);
		validarTamanhoSenha(senha);
	}

	private void validarTamanhoSenha(String senha) throws MyMoneyException {
		int tamanhoSenha = senha.length();
		if (tamanhoSenha < TAMANHO_MINIMO_SENHA) {
			MyMoneyException excecaoSenhaPequena = new MyMoneyException(ErrorCode.SENHA_PEQUENA);
			excecaoSenhaPequena.adicionarInformacao("Tamanho da senha : " + tamanhoSenha);
			throw excecaoSenhaPequena;
		}
	}
}
