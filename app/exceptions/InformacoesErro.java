package exceptions;

import java.util.ArrayList;
import java.util.List;

public class InformacoesErro {

	private String mensagem;
	private List<String> informacoes = new ArrayList<>();

	public InformacoesErro() {
		super();
	}

	public InformacoesErro(String mensagem, List<String> informacoes) {
		this();
		this.mensagem = mensagem;
		this.informacoes = informacoes;
	}

	public String getMensagem() {
		return mensagem;
	}

	public List<String> getInformacoes() {
		return informacoes;
	}

}