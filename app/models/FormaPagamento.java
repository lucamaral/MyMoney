package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.db.ebean.Model;

@Entity
@Table(name = "FormaPagamento")
public class FormaPagamento extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final String ID_FORMA_PAGAMENTO = "idFormaPagamento";

	private static final String DS_FORMA_PAGAMENTO = "dsFormaPagamento";

	@Id
	@Column(name = ID_FORMA_PAGAMENTO)
	private Long codigo;

	@Column(name = DS_FORMA_PAGAMENTO)
	private String descricao;

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

	public static Finder<Long, FormaPagamento> find = new Finder<Long, FormaPagamento>(Long.class, FormaPagamento.class);

}
