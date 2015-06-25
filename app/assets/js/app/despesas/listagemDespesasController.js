var ListagemDespesasController = function ($scope, $routeParams, GruposDespesasService, TiposDespesasService, DespesasService) {
    'use strict';

    GruposDespesasService.buscarPeloId($routeParams.idDespesaGrupo).success(function (grupoDespesa){
            $scope.grupoDespesa = grupoDespesa;
    });

    TiposDespesasService.buscarPeloId($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo).success(function (tipoDespesa){
            $scope.tipoDespesa = tipoDespesa;
    });

    DespesasService.buscar($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo).success(function (despesas){
            $scope.despesas = despesas;
    });

    $scope.remover = function (despesa) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta despesa não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                DespesasService.remover($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, despesa.codigo).success(function (listaAtualizada) {

                    console.info(listaAtualizada);
                    $scope.despesas = listaAtualizada;

                    swal({
                        title: "Feito!",
                        text: "Despesa removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

};

module.exports = ['$scope', '$routeParams', 'GruposDespesasService', 'TiposDespesasService', 'DespesasService', ListagemDespesasController];
