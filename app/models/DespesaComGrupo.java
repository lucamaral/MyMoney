package models;

import java.util.Date;

public class DespesaComGrupo {

	private Long idDespesa;
	private Long idDespesaTipo;
	private Long idDespesaGrupo;
	private Float valorAPagar;
	private String descricao;
	private Date dataVencimento;

	public Long getIdDespesa() {
		return idDespesa;
	}

	public void setIdDespesa(Long idDespesa) {
		this.idDespesa = idDespesa;
	}

	public Long getIdDespesaTipo() {
		return idDespesaTipo;
	}

	public void setIdDespesaTipo(Long idDespesaTipo) {
		this.idDespesaTipo = idDespesaTipo;
	}

	public Long getIdDespesaGrupo() {
		return idDespesaGrupo;
	}

	public void setIdDespesaGrupo(Long idDespesaGrupo) {
		this.idDespesaGrupo = idDespesaGrupo;
	}

	public Float getValorAPagar() {
		return valorAPagar;
	}

	public void setValorAPagar(Float valorAPagar) {
		this.valorAPagar = valorAPagar;
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

}
