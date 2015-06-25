# Adicionar forma pagamento na tabela de receitas
 
# --- !Ups
 
ALTER TABLE Receita ADD COLUMN idFormaPagamento INT UNSIGNED NOT NULL;
ALTER TABLE Receita ADD CONSTRAINT idFormaPagamentoFK FOREIGN KEY (idFormaPagamento) references FormaPagamento(idFormaPagamento); 

# --- !Downs
 
ALTER TABLE Receita DROP COLUMN idFormaPagamento;
ALTER TABLE Receita DROP CONSTRAINT idFormaPagamentoFK;
