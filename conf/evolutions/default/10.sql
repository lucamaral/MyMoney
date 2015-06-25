# Tabela de despesas
 
# --- !Ups
 
CREATE TABLE Despesa(
    idDespesa INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsDespesa varchar(45) NOT NULL,
    dtVencto DATE,
    dtPagto DATE,
    vlOriginal FLOAT,
    vlPago FLOAT,
    boRecorrente CHAR NOT NULL,
    idDespesaTipo INT UNSIGNED NOT NULL,
    idFormaPagamento INT UNSIGNED NOT NULL,
    foreign key (idDespesaTipo) references DespesaTipo(idDespesaTipo) on delete CASCADE,
	foreign key (idFormaPagamento) references FormaPagamento(idFormaPagamento) on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE Despesa;
