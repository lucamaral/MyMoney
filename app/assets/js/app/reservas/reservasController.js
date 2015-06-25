var ReservasController = function ($scope, $route, $routeParams, $location, SaldoService, ReservasService) {
    'use strict';

    function atualizarSaldo(){
        SaldoService.buscar().success(function (saldo) {
            $scope.saldo = saldo;
        });
    }

    atualizarSaldo();

    if ($routeParams.idReserva === "nova") {
        $scope.reserva = {
            codigo: null,
            valor: null,
            dataReserva : null
        };
    } else {
        ReservasService.buscarPeloId($routeParams.idReserva).success(function (reserva) {
            $scope.reserva = reserva;
            $scope.reserva.dataReserva = new Date(reserva.dataReserva);
            $scope.reserva.valor = parseFloat(reserva.valor.toFixed(2));
        });
    }

    $scope.ehPercentual = false;
    $scope.valorPercentual = null;

    $scope.calcularValorEmPercentual = function () {
        if ($scope.valorPercentual) {
            if ($scope.valorPercentual > 100) {
                sweetAlert("Oops...", "Você não pode reservar mais de 100% de seu saldo", "error");
                $scope.valorPercentual = null;
                $scope.reserva.valor = null;
                return;
            }
            if ($scope.valorPercentual <= 0) {
                sweetAlert("Oops...", "Você não pode reservar 0% ou menos de seu saldo", "error");
                $scope.valorPercentual = null;
                $scope.reserva.valor = null;
                return;
            }
            var valorFinal = $scope.saldo.valor * ($scope.valorPercentual / 100);
            $scope.reserva.valor = parseFloat(valorFinal.toFixed(2));
        } else {
            $scope.reserva.valor = null;
        }
    };

    $scope.salvar = function (reserva) {
        if ($scope.reserva.valor > $scope.saldo.valor) {
            sweetAlert("Oops...", "Você não pode reservar mais do que você tem em saldo ;(", "error");
            $scope.reserva.valor = null;
            return;
        }
        reserva.dataReserva = new Date();
        ReservasService.salvar(reserva).success(function (reservaSalva) {
            $scope.reserva = reservaSalva;
            $scope.reserva.valor = parseFloat(reservaSalva.valor.toFixed(2));
            $scope.reserva.dataReserva = new Date(reservaSalva.dataReserva);
            swal("Feito!", "Reserva salva!", "success");
            var newParams = {
                idReserva: reservaSalva.codigo
            };
            $route.updateParams(newParams);
            $routeParams = newParams;
            $scope.$parent.$broadcast('atualizarSaldo');
            $scope.$on('saldoAtualizado', function (event, saldoAtualizado){
                    $scope.saldo = saldoAtualizado;
            });
        });
    };

    $scope.remover = function (idReserva) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta reserva não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                ReservasService.remover(idReserva).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("/reservas");
                        $scope.$apply();
                    }, 2250);

                    swal({
                        title: "Feito!",
                        text: "Reserva removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'SaldoService',
                                      'ReservasService',
                                      ReservasController];
