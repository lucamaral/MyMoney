var loginApp = angular.module('loginApp', ['ngRoute']);
loginApp.config(require('./login/loginRoute'));

loginApp.controller('EsqueciMinhaSenhaController', require('./login/esqueciMinhaSenhaController'));
loginApp.controller('NovoUsuarioController', require('./login/novoUsuarioController'));
