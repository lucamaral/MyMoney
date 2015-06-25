var myMoneyApp = angular.module("myMoneyApp", ['ngRoute', 'ui.bootstrap.datetimepicker', 'chart.js']);
myMoneyApp.config(require('./app/appRoute'));

/* controllers */
myMoneyApp.controller("SaldoController", require('./app/saldo/saldoController'));
myMoneyApp.controller("GraficoSaldoController", require('./app/saldo/graficoSaldoController'));
myMoneyApp.controller("MinhaContaController", require('./app/usuario/minhaContaController'));
myMoneyApp.controller("AlterarSenhaController", require('./app/usuario/alterarSenhaController'));
myMoneyApp.controller('TiposReceitasController', require('./app/receitas/tiposReceitasController'));
myMoneyApp.controller('GruposDespesasController', require('./app/despesas/gruposDespesasController'));
myMoneyApp.controller('TiposDespesasController', require('./app/despesas/tiposDespesasController'));
myMoneyApp.controller('ListagemReceitasController', require('./app/receitas/listagemReceitasController'));
myMoneyApp.controller('ReceitasController', require('./app/receitas/receitasController'));
myMoneyApp.controller('ListagemDespesasController', require('./app/despesas/listagemDespesasController'));
myMoneyApp.controller('DespesasController', require('./app/despesas/despesasController'));
myMoneyApp.controller('ReservasController', require('./app/reservas/reservasController'));
myMoneyApp.controller('ListagemReservasController', require('./app/reservas/listagemReservasController'));
myMoneyApp.controller("DespesasAPagarController", require('./app/despesas/despesasAPagarController'));

/* services */
myMoneyApp.factory("TiposReceitasService", require("./app/receitas/tiposReceitasService"));
myMoneyApp.factory("GruposDespesasService", require("./app/despesas/gruposDespesasService"));
myMoneyApp.factory("TiposDespesasService", require("./app/despesas/tiposDespesasService"));
myMoneyApp.factory("ReceitasService", require("./app/receitas/receitasService"));
myMoneyApp.factory("FormasPagamentoService", require("./app/formasPagamentoService"));
myMoneyApp.factory("DespesasService", require('./app/despesas/despesasService'));
myMoneyApp.factory("SaldoService", require('./app/saldo/saldoService'));
myMoneyApp.factory("AcumuladoService", require("./app/saldo/acumuladoService"));
myMoneyApp.factory("ReservasService", require('./app/reservas/reservasService'));


/* util */
myMoneyApp.factory("LabelGraficoGenerator", require('./app/saldo/labelGraficoGenerator'));
