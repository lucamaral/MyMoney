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
@Table(name = "DespesaTipo")
public class DespesaTipo extends Model {

	private static final String DS_DESPESA_TIPO = "dsDespesaTipo";
	public static final String ID_DESPESA_TIPO = "idDespesaTipo";
	private static final String ID_DESPESA_GRUPO = "idDespesaGrupo";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = ID_DESPESA_TIPO)
	private Long codigo;

	@Column(name = DS_DESPESA_TIPO)
	private String descricao;

	@ManyToOne
	@Column(name = ID_DESPESA_GRUPO)
	private Long idDespesaGrupo;

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

	public Long getIdDespesaGrupo() {
		return idDespesaGrupo;
	}

	public void setIdDespesaGrupo(Long idDespesaGrupo) {
		this.idDespesaGrupo = idDespesaGrupo;
	}

	public static Finder<Long, DespesaTipo> find = new Finder<Long, DespesaTipo>(Long.class, DespesaTipo.class);

	public static ExpressionList<DespesaTipo> findByGrupo(Long idDespesaGrupo) {
		return find.where().eq(ID_DESPESA_GRUPO, idDespesaGrupo);
	}

	public static ExpressionList<DespesaTipo> find(Long idDespesaGrupo, Long idDespesaTipo) {
		return findByGrupo(idDespesaGrupo).eq(ID_DESPESA_TIPO, idDespesaTipo);
	}
}
