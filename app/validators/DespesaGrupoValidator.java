package validators;

import models.DespesaGrupo;

import org.springframework.stereotype.Service;

import exceptions.ErrorCode;
import exceptions.MyMoneyException;

@Service
public class DespesaGrupoValidator {

	public void grupoPertenceAoUsuario(Long idUsuario, Long idDespesaGrupo) {
		DespesaGrupo despesaGrupoEncontrado = DespesaGrupo.find(idUsuario,
				idDespesaGrupo).findUnique();
		if (despesaGrupoEncontrado == null) {
			throw new MyMoneyException(
					ErrorCode.DESPESA_GRUPO_NAO_PERTENCE_AO_USUARIO);
		}
	}
	
}
