package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.ebean.Model;

import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.annotation.ConcurrencyMode;
import com.avaje.ebean.annotation.EntityConcurrencyMode;

@Entity
@Table(name = "Reserva")
@EntityConcurrencyMode(ConcurrencyMode.NONE)
public class Reserva extends Model {

	public static final String ID_RESERVA = "idReserva";
	private static final String VALOR = "valor";
	private static final String ID_USUARIO = "idUsuario";
	private static final String DATA_RESERVA = "dataReserva";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = ID_RESERVA)
	private Long codigo;

	@Column(name = VALOR)
	private Float valor;

	@Column(name = DATA_RESERVA)
	private Date dataReserva;

	@ManyToOne
	@Column(name = ID_USUARIO)
	private Long idUsuario;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public Float getValor() {
		return valor;
	}

	public void setValor(Float valor) {
		this.valor = valor;
	}

	public Date getDataReserva() {
		return dataReserva;
	}

	public void setDataReserva(Date dataReserva) {
		this.dataReserva = dataReserva;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public static Finder<Long, Reserva> find = new Finder<Long, Reserva>(Long.class, Reserva.class);

	private static ExpressionList<Reserva> find(Long idUsuario) {
		return find.where().eq(ID_USUARIO, idUsuario);
	}

	public static List<Reserva> findPorUsuario(Long idUsuario) {
		return find(idUsuario).findList();
	}

	public static Reserva find(Long idUsuario, Long idReserva) {
		return find(idUsuario).eq(ID_RESERVA, idReserva).findUnique();
	}

}
