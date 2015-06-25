var SaldoController = function ($scope, SaldoService) {
    'use strict';

    SaldoService.buscar().success(function (saldo) {
        $scope.saldo = saldo;
    });

    $scope.$on('atualizarSaldo', function () {
        SaldoService.atualizar().success(function (saldoAtualizado) {
            $scope.saldo = saldoAtualizado;
            $scope.$parent.$broadcast('saldoAtualizado', saldoAtualizado);
        });
    });

};

module.exports = ['$scope', 'SaldoService', SaldoController];
