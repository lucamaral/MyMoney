package validators;

import models.ReceitaTipo;

import org.springframework.stereotype.Service;

import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class ReceitaTipoValidator {

	public void tipoPertenceAoUsuario(Long idUsuario, Long idReceitaTipo) {
		ReceitaTipo receitaTipo = ReceitaTipo.find(idUsuario, idReceitaTipo).findUnique();
		if (receitaTipo == null) {
			throw new MyMoneyException(ErrorCode.RECEITA_TIPO_NAO_PERTENCE_AO_USUARIO);
		}
	}

}
