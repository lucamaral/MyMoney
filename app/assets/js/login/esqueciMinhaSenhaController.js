var EsqueciMinhaSenhaController = function ($scope, $http){
    'use strict';

    $scope.recuperarSenha = function (email){
        console.info(email);
    };

};

module.exports = ['$scope', '$http',  EsqueciMinhaSenhaController];
