package exceptions;

public enum ErrorCode {

	USUARIO_JA_EXISTE(1L, "Usuário já existe"), USUARIO_CAMPO_VAZIO(2L, "Campo do usuário em branco"), SENHA_PEQUENA(3L, "Senha pequena para um usuário"), EMAIL_NAO_CORRESPONDENTE(
			4L, "Email não corresponde a nenhum usuário"), ERRO(5L, "Erro"), SENHA_ANTIGA_NAO_CORRESPONDENTE(6L, "Senha antiga não correspondente"), USUARIO_NAO_FOI_REMOVIDO(
			7L, "Usuário não foi removido"), DESCRICAO_RECEITA_TIPO_JA_UTILIZADA(8L, "Descrição para tipo de receita já utilizada"), RECEITA_TIPO_NAO_ENCONTRADA(
			9L, "Tipo de receita não encontrada"), RECEITA_TIPO_NAO_REMOVIDA(10L, "Receita tipo não removida"), RECEITA_TIPO_NAO_ATUALIZADA(11L,
			"Receita tipo não atualizada"), DESCRICAO_DESPESA_GRUPO_JA_UTILIZADA(12L, "Descrição para grupo de despesa já utilizada"), DESPESA_GRUPO_NAO_PERTENCE_AO_USUARIO(
			13L, "Grupo de despesa não pertence ao usuário"), DESPESA_NAO_ENCONTRADA(14L, "Despesa não encontrada"), RECEITA_TIPO_NAO_PERTENCE_AO_USUARIO(15L,
			"Tipo de receita não pertence ao usuário");

	private final Long codigo;
	private final String mensagem;

	ErrorCode(Long code, String message) {
		this.codigo = code;
		this.mensagem = message;
	}

	public Long getCodigo() {
		return codigo;
	}

	public String getMensagem() {
		return mensagem;
	}

}
