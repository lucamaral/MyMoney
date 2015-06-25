# Atualização tabela de reservas
 
# --- !Ups

DROP TABLE Reserva;

CREATE TABLE Reserva (
    idReserva INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    valor FLOAT,
    idUsuario INT UNSIGNED NOT NULL,
    foreign key (idUsuario) references Usuario(idUsuario)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE Reserva;
