# Tabela de formas de pagamento
 
# --- !Ups
 
CREATE TABLE FormaPagamento(
    idFormaPagamento INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsFormaPagamento varchar(45) NOT NULL UNIQUE
);

INSERT INTO FormaPagamento (dsFormaPagamento) values ('DINHERIO');
 
# --- !Downs
 
DROP TABLE FormaPagamento;
