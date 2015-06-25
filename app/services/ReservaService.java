package services;

import java.util.List;

import models.Reserva;

import org.springframework.stereotype.Service;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;

@Service
public class ReservaService {

	public List<Reserva> buscar(Long idUsuario) {
		return Reserva.findPorUsuario(idUsuario);
	}

	public Reserva buscarPeloId(Long idUsuario, Long idReserva) {
		return Reserva.find(idUsuario, idReserva);
	}

	@Transactional
	public Reserva salvar(Long idUsuario, Reserva reservaParaSalvar) {
		Reserva reserva = getReserva(idUsuario, reservaParaSalvar.getCodigo());
		reserva.setIdUsuario(idUsuario);
		reserva.setValor(reservaParaSalvar.getValor());
		reserva.setDataReserva(reservaParaSalvar.getDataReserva());
		reserva.save();
		return reserva;
	}

	private Reserva getReserva(Long idUsuario, Long idReserva) {
		if (idReserva == null) {
			return new Reserva();
		}
		return Reserva.find(idUsuario, idReserva);
	}

	@Transactional
	public void remover(Long idUsuario, Long idReserva) {
		Reserva reserva = buscarPeloId(idUsuario, idReserva);
		Ebean.delete(reserva);
	}

	public Float buscarAcumulado(Long idUsuario) {
		Float acumuladoReservas = 0f;
		List<Reserva> reservas = buscar(idUsuario);
		for (Reserva reserva : reservas) {
			acumuladoReservas += reserva.getValor();
		}
		return acumuladoReservas;
	}

}
