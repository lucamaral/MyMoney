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

@Entity
@Table(name = "Saldo")
public class Saldo extends Model {

	private static final long serialVersionUID = 1L;

	private static final String ID_SALDO = "idSaldo";

	private static final String VL_SALDO = "vlSaldo";

	private static final String ID_USUARIO = "idUsuario";

	private static final String DT_SALDO = "dtSaldo";

	private static final String VL_RECEITAS = "vlReceitas";

	private static final String VL_DESPESAS = "vlDespesas";

	private static final String VL_RESERVAS = "vlReservas";

	@Id
	@GeneratedValue
	@Column(name = ID_SALDO)
	private Long codigo;

	@Column(name = VL_SALDO)
	private Float valor;

	@ManyToOne
	@Column(name = ID_USUARIO)
	private Long idUsuario;

	@Column(name = DT_SALDO)
	private Date data;

	@Column(name = VL_RECEITAS)
	private Float acumuladoReceitas;

	@Column(name = VL_DESPESAS)
	private Float acumuladoDespesas;

	@Column(name = VL_RESERVAS)
	private Float acumuladoReservas;

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

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Float getAcumuladoReceitas() {
		return acumuladoReceitas;
	}

	public void setAcumuladoReceitas(Float acumuladoReceitas) {
		this.acumuladoReceitas = acumuladoReceitas;
	}

	public Float getAcumuladoDespesas() {
		return acumuladoDespesas;
	}

	public void setAcumuladoDespesas(Float acumuladoDespesas) {
		this.acumuladoDespesas = acumuladoDespesas;
	}

	public Float getAcumuladoReservas() {
		return acumuladoReservas;
	}

	public void setAcumuladoReservas(Float acumuladoReservas) {
		this.acumuladoReservas = acumuladoReservas;
	}

	public static Finder<Long, Saldo> find = new Finder<Long, Saldo>(Long.class, Saldo.class);

	public static List<Saldo> buscarOrdenadoPelaData(Long idUsuario) {
		return find.where().eq(ID_USUARIO, idUsuario).orderBy("idSaldo desc").findList();
	}

}
