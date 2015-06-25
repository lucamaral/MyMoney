package services;

import java.util.Date;
import java.util.List;

import models.Saldo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avaje.ebean.annotation.Transactional;

@Service
public class SaldoService {

	@Autowired
	private DespesaService despesaService;

	@Autowired
	private ReceitaService receitaService;

	@Autowired
	private ReservaService reservaService;

	public Saldo buscar(Long idUsuario) {
		List<Saldo> saldos = Saldo.buscarOrdenadoPelaData(idUsuario);
		if (saldos.isEmpty()) {
			return atualizar(idUsuario);
		}
		return saldos.get(0);
	}

	@Transactional
	public Saldo atualizar(Long idUsuario) {
		Float acumuladoDespesas = despesaService.buscarAcumulado(idUsuario);
		Float acumuladoReceitas = receitaService.buscarAcumulado(idUsuario);
		Float acumuladoReservas = reservaService.buscarAcumulado(idUsuario);
		Saldo saldo = new Saldo();
		saldo.setData(new Date());
		saldo.setValor(acumuladoReceitas - acumuladoDespesas - acumuladoReservas);
		saldo.setAcumuladoReservas(acumuladoReservas);
		saldo.setAcumuladoDespesas(acumuladoDespesas);
		saldo.setAcumuladoReceitas(acumuladoReceitas);
		saldo.setIdUsuario(idUsuario);
		saldo.save();
		return saldo;
	}

}
