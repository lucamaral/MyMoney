# Tabela de tipos de despesas
 
# --- !Ups
 
CREATE TABLE DespesaTipo(
    idDespesaTipo INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsDespesaTipo varchar(45) NOT NULL UNIQUE,
    idDespesaGrupo INT UNSIGNED NOT NULL,
    foreign key (idDespesaGrupo) references DespesaGrupo(idDespesaGrupo)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE DespesaTipo;
