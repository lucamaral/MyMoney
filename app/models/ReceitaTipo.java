package models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.ebean.Model;

import com.avaje.ebean.ExpressionList;

@Entity
@Table(name = "ReceitaTipo")
public class ReceitaTipo extends Model {

	private static final String DS_RECEITA_TIPO = "dsReceitaTipo";
	public static final String ID_RECEITA_TIPO = "idReceitaTipo";
	private static final String ID_USUARIO = "idUsuario";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = ID_RECEITA_TIPO)
	private Long codigo;

	@Column(name = DS_RECEITA_TIPO)
	private String descricao;

	@ManyToOne
	@Column(name = ID_USUARIO)
	private Long idUsuario;

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

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public static Finder<Long, ReceitaTipo> find = new Finder<Long, ReceitaTipo>(Long.class, ReceitaTipo.class);

	public static ExpressionList<ReceitaTipo> find(Long idUsuario) {
		return find.where().eq(ID_USUARIO, idUsuario);
	}

	public static ExpressionList<ReceitaTipo> find(Long idUsuario, Long idReceitaTipo) {
		return find(idUsuario).eq(ID_RECEITA_TIPO, idReceitaTipo);
	}
}
