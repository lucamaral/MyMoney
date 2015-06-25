package exceptions.tratadores;

import org.springframework.stereotype.Service;

import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class TratadorDeExcecao {

	public MyMoneyException criarExcecao(Exception e) {
		MyMoneyException excecao = new MyMoneyException(ErrorCode.ERRO);
		excecao.adicionarInformacao(e.getMessage());
		return excecao;
	}
}
