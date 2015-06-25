# Tabela de receitas
 
# --- !Ups
 
CREATE TABLE Receita(
    idReceita INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsReceita varchar(45) NOT NULL UNIQUE,
    dtRecebimento DATE,
    dtPrevista DATE,
    vlOriginal FLOAT,
    vlRecebido FLOAT,
    boRecorrente CHAR NOT NULL,
    idReceitaTipo INT UNSIGNED NOT NULL,
    foreign key (idReceitaTipo) references ReceitaTipo(idReceitaTipo)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE Receita;
