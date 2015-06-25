var DespesasAPagarController = function ($scope, DespesasService) {
    'use strict';

    DespesasService.buscarDespesasParaPagar().success(function (despesasAPagar){
            $scope.despesasAPagar = despesasAPagar;
            var totalAPagar = 0;
            for(var i = 0; i<despesasAPagar.length; i++){
                totalAPagar += despesasAPagar[i].valorAPagar;
            }
            $scope.totalAPagar = totalAPagar;
    });

    $scope.dataAtual = new Date();

};

module.exports = ['$scope', 'DespesasService', DespesasAPagarController];
