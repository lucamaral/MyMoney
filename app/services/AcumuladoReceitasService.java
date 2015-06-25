package services;

import java.util.ArrayList;
import java.util.List;

import models.Acumulado;
import models.Receita;
import models.ReceitaTipo;

import org.springframework.stereotype.Service;

@Service
public class AcumuladoReceitasService {

	public List<Acumulado> buscarTipos(Long idUsuario) {
		List<Acumulado> receitasTiposAcumulados = new ArrayList<Acumulado>();
		for (ReceitaTipo receitaTipo : ReceitaTipo.find(idUsuario).findList()) {
			Acumulado acumuladoPorTipo = new Acumulado();
			Float totalPorTipo = 0f;

			for (Receita receita : Receita.find(receitaTipo.getCodigo()).findList()) {
				Float valorOriginal = receita.getValorOriginal();
				Float valorRecebido = receita.getValorRecebido();
				totalPorTipo += valorRecebido == null ? valorOriginal : valorRecebido;
			}

			acumuladoPorTipo.setCodigo(receitaTipo.getCodigo());
			acumuladoPorTipo.setDescricao(receitaTipo.getDescricao());
			acumuladoPorTipo.setAcumulado(totalPorTipo);
			receitasTiposAcumulados.add(acumuladoPorTipo);
		}
		return receitasTiposAcumulados;
	}
}
