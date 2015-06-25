var ListagemReservasController = function ($scope, $routeParams, ReservasService) {
    'use strict';

    ReservasService.buscar().success(function (reservas){
            $scope.reservas = reservas;
    });

    $scope.remover = function (codigo) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta reserva não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function(confirmado){
            if (confirmado === true) {
                ReservasService.remover(codigo).success(function(listaAtualizada) {
                    $scope.reservas = listaAtualizada;
                    swal("Feito!", "Reserva foi removida!", "success");
                    $scope.$parent.$broadcast('atualizarSaldo');
                });
            }

        });
    };

};

module.exports = ['$scope', '$routeParams', 'ReservasService', ListagemReservasController];
