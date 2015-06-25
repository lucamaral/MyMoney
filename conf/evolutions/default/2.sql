# Tabela de tipos de receitas
 
# --- !Ups
 
CREATE TABLE ReceitaTipo (
    idReceitaTipo INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsReceitaTipo varchar(45) NOT NULL UNIQUE,
    idUsuario INT UNSIGNED NOT NULL,
    foreign key (idUsuario) references Usuario(idUsuario)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE ReceitaTipo;
