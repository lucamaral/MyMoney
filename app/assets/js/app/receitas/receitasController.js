var ReceitasController = function ($scope, $route, $routeParams, $location, TiposReceitasService, FormasPagamentoService, ReceitasService) {
    'use strict';

    if ($routeParams.idReceita !== "nova") {
        ReceitasService.buscarPeloId($routeParams.idReceitaTipo, $routeParams.idReceita).success(atualizarScopeComReceita);
    } else {
        $scope.receita = {
            descricao: "",
            dataPrevista: new Date(),
            valorOriginal: 0,
            idFormaPagamento: "",
            idReceitaTipo: parseInt($routeParams.idReceitaTipo)
        };
    }

    TiposReceitasService.buscar().success(function (tiposReceitas) {
        $scope.tiposReceitas = tiposReceitas;
    });

    FormasPagamentoService.buscar().success(function (formasPagamento) {
        $scope.formasPagamento = formasPagamento;
    });
    
    $scope.salvar = function (receita) {
        ReceitasService.salvar(receita).success(function (receitaSalva) {
            atualizarScopeComReceita(receitaSalva);
            var newParams = {
                idReceitaTipo: receitaSalva.idReceitaTipo,
                idReceita: receitaSalva.codigo
            };
            $route.updateParams(newParams);
            $routeParams = newParams;
            swal("Feito!", "Receita  '" + receita.descricao + "' salva!", "success");

            $scope.$parent.$broadcast('atualizarSaldo');
        });
    };

    $scope.remover = function (idReceita) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta receita não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                ReceitasService.remover($routeParams.idReceitaTipo, idReceita).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("/receitas/tipos/" + $routeParams.idReceitaTipo + "/receitas");
                        $scope.$apply();
                    }, 2250);

                    swal({
                        title: "Feito!",
                        text: "Receita removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

    function atualizarScopeComReceita(receita) {
        $scope.receita = receita;
        if ($scope.receita.dataRecebimento) {
            $scope.receita.dataRecebimento = new Date($scope.receita.dataRecebimento);
        }
        if ($scope.receita.dataPrevista) {
            $scope.receita.dataPrevista = new Date($scope.receita.dataPrevista);
        }
    }
};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'TiposReceitasService',
                                      'FormasPagamentoService',
                                      'ReceitasService',
                                      ReceitasController];
