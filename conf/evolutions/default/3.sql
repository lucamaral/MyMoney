# Tabela de grupos de despesas
 
# --- !Ups
 
CREATE TABLE DespesaGrupo(
    idDespesaGrupo INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsDespesaGrupo varchar(45) NOT NULL UNIQUE,
    idUsuario INT UNSIGNED NOT NULL,
    foreign key (idUsuario) references Usuario(idUsuario)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE DespesaGrupo;
