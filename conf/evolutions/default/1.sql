# Tabela de usuários
 
# --- !Ups
 
CREATE TABLE Usuario (
    idUsuario INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dsUsuario varchar(45) NOT NULL,
    dsEmail varchar(200) NOT NULL,
    dsSenha varchar(32) NOT NULL
);
 
# --- !Downs
 
DROP TABLE Usuario;
