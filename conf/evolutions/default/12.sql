# tabela de saldo

# --- !Ups

CREATE TABLE Saldo (
    idSaldo INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vlSaldo FLOAT,
    dtSaldo DATE,
    vlReceitas FLOAT,
    vlDespesas FLOAT,
    vlReservaConsolidada FLOAT,
    vlReservaFlutuante FLOAT,
    idUsuario INT UNSIGNED NOT NULL,
    foreign key (idUsuario) references Usuario(idUsuario)
	on delete CASCADE
);

# --- !Downs

DROP TABLE Saldo;

