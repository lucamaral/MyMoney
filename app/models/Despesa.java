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

@Entity
@Table(name = "Despesa")
public class Despesa extends Model {

	private static final long serialVersionUID = 1L;

	private static final String ID_DESPESA = "idDespesa";

	private static final String DS_DESPESA = "dsDespesa";

	private static final String DT_VENCTO = "dtVencto";

	private static final String DT_PAGTO = "dtPagto";

	private static final String VL_ORIGINAL = "vlOriginal";

	private static final String VL_PAGO = "vlPago";

	private static final String BO_RECORRENTE = "boRecorrente";

	@Id
	@GeneratedValue
	@Column(name = ID_DESPESA)
	private Long codigo;

	@Column(name = DS_DESPESA)
	private String descricao;

	@Column(name = DT_VENCTO)
	private Date dataVencimento;

	@Column(name = DT_PAGTO)
	private Date dataPagamento;

	@Column(name = VL_ORIGINAL)
	private Float valorOriginal;

	@Column(name = VL_PAGO)
	private Float valorPago;

	@Column(name = BO_RECORRENTE)
	private Boolean recorrente;

	@ManyToOne
	@Column(name = DespesaTipo.ID_DESPESA_TIPO)
	private Long idDespesaTipo;

	@ManyToOne
	@Column(name = FormaPagamento.ID_FORMA_PAGAMENTO)
	private Long idFormaPagamento;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Date getDataVencimento() {
		return dataVencimento;
	}

	public void setDataVencimento(Date dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public Date getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(Date dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public Float getValorOriginal() {
		return valorOriginal;
	}

	public void setValorOriginal(Float valorOriginal) {
		this.valorOriginal = valorOriginal;
	}

	public Float getValorPago() {
		return valorPago;
	}

	public void setValorPago(Float valorPago) {
		this.valorPago = valorPago;
	}

	public Boolean getRecorrente() {
		return recorrente;
	}

	public void setRecorrente(Boolean recorrente) {
		this.recorrente = recorrente;
	}

	public Long getIdDespesaTipo() {
		return idDespesaTipo;
	}

	public void setIdDespesaTipo(Long idDespesaTipo) {
		this.idDespesaTipo = idDespesaTipo;
	}

	public Long getIdFormaPagamento() {
		return idFormaPagamento;
	}

	public void setIdFormaPagamento(Long idFormaPagamento) {
		this.idFormaPagamento = idFormaPagamento;
	}

	public static Finder<Long, Despesa> find = new Finder<Long, Despesa>(Long.class, Despesa.class);

	public static List<Despesa> findList(Long idDespesaTipo) {
		return find(idDespesaTipo).findList();
	}

	private static ExpressionList<Despesa> find(Long idDespesaTipo) {
		return find.where().eq(DespesaTipo.ID_DESPESA_TIPO, idDespesaTipo);
	}

	public static Despesa findUnique(Long idDespesaTipo, Long idDespesa) {
		return find(idDespesaTipo).eq(ID_DESPESA, idDespesa).findUnique();
	}

	public static Despesa findUnique(Long idDespesa) {
		return find.where().eq(ID_DESPESA, idDespesa).findUnique();
	}

}
