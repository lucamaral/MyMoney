var CadastrarNovoUsuarioController = function ($scope,  $http, $location){
    'use strict';

    var tratadorDeErros = require("../tratadorDeErros");

    $scope.cadastrar = function (usuario){
            $http.post("/api/usuarios", usuario)
                .success(function (usuarioCriado){
                    swal({
                            title: "Usuario  criado com sucesso!",
                            text : usuarioCriado.nome,
                            type : "success",
                            allowOutsideClick : true
                    },function (){
                        $location.path("/");
                        $scope.$apply();
                    });
                })
                .error(tratadorDeErros(function (){
                         $scope.usuario = {};
                         $scope.$apply();
                 }));
    };
};

module.exports = ['$scope', '$http', '$location', CadastrarNovoUsuarioController];
