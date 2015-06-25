package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.ebean.Model;

import com.avaje.ebean.ExpressionList;

@Entity
@Table(name = "Receita")
public class Receita extends Model {

	private static final long serialVersionUID = 1L;

	private static final String ID_RECEITA = "idReceita";
	private static final String DS_RECEITA = "dsReceita";
	private static final String DT_RECEBIMENTO = "dtRecebimento";
	private static final String DT_PREVISTA = "dtPrevista";
	private static final String VL_ORIGINAL = "vlOriginal";
	private static final String VL_RECEBIDO = "vlRecebido";
	private static final String BO_RECORRENTE = "boRecorrente";

	@Id
	@GeneratedValue
	@Column(name = ID_RECEITA)
	private Long codigo;

	@Column(name = DS_RECEITA)
	private String descricao;

	@Column(name = DT_RECEBIMENTO)
	private Date dataRecebimento;

	@Column(name = DT_PREVISTA)
	private Date dataPrevista;

	@Column(name = VL_ORIGINAL)
	private Float valorOriginal;

	@Column(name = VL_RECEBIDO)
	private Float valorRecebido;

	@Column(name = BO_RECORRENTE)
	private Boolean recorrente;

	@ManyToOne
	@Column(name = ReceitaTipo.ID_RECEITA_TIPO)
	private Long idReceitaTipo;

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

	public Date getDataRecebimento() {
		return dataRecebimento;
	}

	public void setDataRecebimento(Date dataRecebimento) {
		this.dataRecebimento = dataRecebimento;
	}

	public Date getDataPrevista() {
		return dataPrevista;
	}

	public void setDataPrevista(Date dataPrevista) {
		this.dataPrevista = dataPrevista;
	}

	public Float getValorOriginal() {
		return valorOriginal;
	}

	public void setValorOriginal(Float valorOriginal) {
		this.valorOriginal = valorOriginal;
	}

	public Float getValorRecebido() {
		return valorRecebido;
	}

	public void setValorRecebido(Float valorRecebido) {
		this.valorRecebido = valorRecebido;
	}

	public Boolean getRecorrente() {
		return recorrente;
	}

	public void setRecorrente(Boolean recorrente) {
		this.recorrente = recorrente;
	}

	public Long getIdReceitaTipo() {
		return idReceitaTipo;
	}

	public void setIdReceitaTipo(Long idReceitaTipo) {
		this.idReceitaTipo = idReceitaTipo;
	}

	public Long getIdFormaPagamento() {
		return idFormaPagamento;
	}

	public void setIdFormaPagamento(Long idFormaPagamento) {
		this.idFormaPagamento = idFormaPagamento;
	}

	public static Finder<Long, Receita> find = new Finder<Long, Receita>(Long.class, Receita.class);

	public static ExpressionList<Receita> find(Long idReceitaTipo) {
		return find.where().eq(ReceitaTipo.ID_RECEITA_TIPO, idReceitaTipo);
	}

	public static Receita find(Long idReceitaTipo, Long idReceita) {
		return find(idReceitaTipo).where().eq(ID_RECEITA, idReceita).findUnique();
	}

	public static Receita findUnique(Long idReceita) {
		return find.where().eq(ID_RECEITA, idReceita).findUnique();
	}

}
