var DespesasController = function ($scope, $route, $routeParams, $location, GruposDespesasService, TiposDespesasService, FormasPagamentoService, DespesasService) {
    'use strict';

    if ($routeParams.idDespesa !== "nova") {
        DespesasService.buscarPeloId($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, $routeParams.idDespesa).success(atualizarScopeComDespesa);
    } else {
        $scope.despesa = {
            descricao: "",
            dataVencimento: new Date(),
            dataPagamento: null,
            valorOriginal: 0,
            valorPago: null,
            idDespesaTipo: parseInt($routeParams.idDespesaTipo),
            idFormaPagamento: ""
        };
    }

    $scope.idDespesaGrupo = parseInt($routeParams.idDespesaGrupo);

    GruposDespesasService.buscar().success(function (gruposDespesas) {
        $scope.gruposDespesas = gruposDespesas;
    });

    FormasPagamentoService.buscar().success(function (formasPagamento) {
        $scope.formasPagamento = formasPagamento;
    });

    function atualizarScopeComDespesa(despesa) {
        $scope.despesa = despesa;
        if ($scope.despesa.dataVencimento) {
            $scope.despesa.dataVencimento = new Date($scope.despesa.dataVencimento);
        }
        if ($scope.despesa.dataPagamento) {
            $scope.despesa.dataPagamento = new Date($scope.despesa.dataPagamento);
        }
    }

    $scope.buscarTiposDespesas = function () {
        if ($scope.idDespesaGrupo !== 0) {
            TiposDespesasService.buscar($scope.idDespesaGrupo).success(function (tiposDespesas) {
                $scope.tiposDespesas = tiposDespesas;
            });
        }
    };

    $scope.salvar = function (despesa) {
        DespesasService.salvar($scope.idDespesaGrupo, despesa).success(function (despesaSalva) {
            atualizarScopeComDespesa(despesaSalva);
            var newParams = {
                idDespesaGrupo: $scope.idDespesaGrupo,
                idDespesaTipo: despesaSalva.idDespesaTipo,
                idDespesa: despesaSalva.codigo
            };
            $routeParams = newParams;
            $route.updateParams(newParams);
            swal("Feito!", "Despesa '" + despesa.descricao + "' salva!", "success");

            $scope.$parent.$broadcast('atualizarSaldo');
        });
    };

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
                DespesasService.remover($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, despesa.codigo).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("despesas/grupos/" + $routeParams.idDespesaGrupo + "/tipos/" + $routeParams.idDespesaTipo + "/despesas");
                        $scope.$apply();
                    }, 2250);

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

    $scope.buscarTiposDespesas();
};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'GruposDespesasService',
                                      'TiposDespesasService',
                                      'FormasPagamentoService',
                                      'DespesasService',
                                      DespesasController];
