package models;

public class TemplateDespesaTipo {

	private Long codigo;
	private String descricao;
	private Long idTemplateDespesaGrupo;

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

	public Long getIdTemplateDespesaGrupo() {
		return idTemplateDespesaGrupo;
	}

	public void setIdTemplateDespesaGrupo(Long idTemplateDespesaGrupo) {
		this.idTemplateDespesaGrupo = idTemplateDespesaGrupo;
	}

}
