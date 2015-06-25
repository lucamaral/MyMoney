# update tabela saldo

# --- !Ups

ALTER TABLE Saldo DROP COLUMN vlReservaConsolidada;
ALTER TABLE Saldo DROP COLUMN vlReservaFlutuante;
ALTER TABLE Saldo ADD vlReservas FLOAT;

# --- !Downs

