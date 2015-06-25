package services;

import java.util.List;

import models.FormaPagamento;

import org.springframework.stereotype.Service;

@Service
public class FormasPagamentoService {

	public List<FormaPagamento> buscar() {
		return FormaPagamento.find.all();
	}

}
