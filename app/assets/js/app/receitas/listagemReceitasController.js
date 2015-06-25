var ListagemReceitasController = function ($scope, $routeParams, TiposReceitasService, ReceitasService) {
    'use strict';

    TiposReceitasService.buscarPeloId($routeParams.idReceitaTipo).success(function (tipoReceita){
        $scope.tipoReceita = tipoReceita;

        ReceitasService.buscar($routeParams.idReceitaTipo).success(function (receitas) {
            $scope.receitas = receitas;
        });
    });

    $scope.remover = function (codigo) {
        swal({
            title: "Tem certeza meu?",
            text: "Este receita não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function(confirmado){
            if (confirmado === true) {
                ReceitasService.remover($routeParams.idReceitaTipo, codigo).success(function(listaAtualizada) {
                    $scope.receitas = listaAtualizada;
                    swal("Feito!", "Receita foi removida!", "success");
                });
            }

        });
    };

};

module.exports = ['$scope', '$routeParams', 'TiposReceitasService', 'ReceitasService', ListagemReceitasController];
