var AlterarSenhaController = function ($scope, $http, $location){
    'use strict';

    var tratadorDeErros = require("../../tratadorDeErros");

    $scope.atualizarSenha = function(antigaSenha, novaSenha){
          $http.post("/api/usuarios/sessao/senha", {
                "antigaSenha" : antigaSenha,
                "novaSenha" : novaSenha
          }).success(function (){
              swal({
                      title: "Senha  atualizada com sucesso!",
                      type : "success",
                      allowOutsideClick : true
              }, function (){
                  $location.path("/minha-conta");
                  $scope.$apply();
              });
          }).error(tratadorDeErros());
    };

};

module.exports = ['$scope', '$http', '$location',  AlterarSenhaController];
