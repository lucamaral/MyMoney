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
@Table(name = "DespesaGrupo")
public class DespesaGrupo extends Model {

	private static final String DS_DESPESA_GRUPO = "dsDespesaGrupo";
	private static final String ID_DESPESA_GRUPO = "idDespesaGrupo";
	private static final String ID_USUARIO = "idUsuario";

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = ID_DESPESA_GRUPO)
	private Long codigo;

	@Column(name = DS_DESPESA_GRUPO)
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

	public static Finder<Long, DespesaGrupo> find = new Finder<Long, DespesaGrupo>(Long.class, DespesaGrupo.class);

	public static ExpressionList<DespesaGrupo> find(Long idUsuario) {
		return find.where().eq(ID_USUARIO, idUsuario);
	}

	public static ExpressionList<DespesaGrupo> find(Long idUsuario, Long idDespesaGrupo) {
		return find(idUsuario).eq(ID_DESPESA_GRUPO, idDespesaGrupo);
	}
}
