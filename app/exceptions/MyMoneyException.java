package exceptions;

import java.util.ArrayList;
import java.util.List;

public class MyMoneyException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private ErrorCode errorCode;
	private List<String> informacoes = new ArrayList<>();

	public MyMoneyException(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	@Override
	public String getMessage() {
		return this.errorCode.getMensagem();
	}

	public void adicionarInformacao(String informacao) {
		informacoes.add(informacao);
	}

	public InformacoesErro getInformacoes() {
		return new InformacoesErro(errorCode.getMensagem(), informacoes);
	}

}
