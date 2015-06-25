var AppRouteProvider = function ($routeProvider) {
    'use strict';

    $routeProvider.
    when('/', {
        templateUrl: '/assets/dist/templates/app/index.html'
    }).
    when('/minha-conta', {
        templateUrl: '/assets/dist/templates/app/usuario/minha-conta.html',
        controller: 'MinhaContaController'
    }).
    when('/minha-conta/alterar-senha', {
        templateUrl: '/assets/dist/templates/app/usuario/alterar-senha.html',
        controller: 'AlterarSenhaController'
    }).
    when('/receitas/tipos', {
        templateUrl: '/assets/dist/templates/app/receitas/tipos.html',
        controller: 'TiposReceitasController'
    }).
    when('/receitas/tipos/:idReceitaTipo/receitas', {
        templateUrl: '/assets/dist/templates/app/receitas/listagemReceitas.html',
        controller: 'ListagemReceitasController'
    }).
    when('/receitas/tipos/:idReceitaTipo/receitas/:idReceita', {
        templateUrl: '/assets/dist/templates/app/receitas/receitas.html',
        controller: 'ReceitasController'
    }).
    when('/despesas/grupos', {
        templateUrl: 'assets/dist/templates/app/despesas/grupos.html',
        controller: 'GruposDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos', {
        templateUrl: 'assets/dist/templates/app/despesas/tipos.html',
        controller: 'TiposDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos/:idDespesaTipo/despesas', {
        templateUrl: 'assets/dist/templates/app/despesas/listagemDespesas.html',
        controller: 'ListagemDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos/:idDespesaTipo/despesas/:idDespesa', {
        templateUrl: 'assets/dist/templates/app/despesas/despesas.html',
        controller: 'DespesasController'
    }).
    when('/reservas/:idReserva', {
        templateUrl: 'assets/dist/templates/app/reservas/reservas.html',
        controller: 'ReservasController'
    }).
    when('/reservas', {
        templateUrl: 'assets/dist/templates/app/reservas/listagemReservas.html',
        controller: 'ListagemReservasController'
    }).
    otherwise({
        redirectTo: '/'
    });
};

module.exports = ['$routeProvider', AppRouteProvider];
