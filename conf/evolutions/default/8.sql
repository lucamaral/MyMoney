# Tabela de reservas
 
# --- !Ups
 
CREATE TABLE Reserva (
    idReserva INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vlPrevisao FLOAT,
    boPercentual CHAR(1),
    dtConsolidada DATE,
    idReceita INT UNSIGNED NOT NULL,
    foreign key (idReceita) references Receita(idReceita)
	on delete CASCADE
);
 
# --- !Downs
 
DROP TABLE Reserva;
