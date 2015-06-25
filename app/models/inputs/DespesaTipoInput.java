package models.inputs;

public class DespesaTipoInput {

	private String descricao;
	private Long idDespesaGrupo;

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
}
