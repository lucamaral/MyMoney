var LoginRouteProvider =  function($routeProvider) {
    'use strict';

    $routeProvider.
      when('/', {
        templateUrl: '/assets/dist/templates/login/login.html'
      }).
      when('/esqueci-minha-senha', {
        templateUrl: '/assets/dist/templates/login/esqueci-minha-senha.html',
        controller: 'EsqueciMinhaSenhaController'
      }).
      when('/novo-usuario', {
        templateUrl: '/assets/dist/templates/login/novo-usuario.html',
        controller: 'NovoUsuarioController'
      }).
      otherwise({
        redirectTo: '/'
      });
};

 module.exports = ['$routeProvider', LoginRouteProvider];
