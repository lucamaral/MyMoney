var GraficoSaldoController = function ($scope, $filter, SaldoService, AcumuladoService, LabelGraficoGenerator) {
    'use strict';

    var itensNavegados = [];
    atualizarGraficoDinamicamente("saldo");

    function atualizarGraficoDinamicamente(item) {
        if ((item === "saldo") || ((item.nivel !== "receitas") && (item.nivel !== "despesas"))) {
            itensNavegados.push(item);
        }
        if (item === "saldo") {
            SaldoService.buscar().success(function (saldo) {
                $scope.valorAcumulado = "Saldo : " + $filter('currency')(saldo.valor);
                $scope.labels = [LabelGraficoGenerator.acumulado("receitas"), LabelGraficoGenerator.acumulado("despesas"), LabelGraficoGenerator.acumulado("reservas")];
                $scope.data = [saldo.acumuladoReceitas, saldo.acumuladoDespesas, parseFloat(saldo.acumuladoReservas.toFixed(2))];
                $scope.colours = ['#337ab7', '#d9534f', '#5cb85c'];
            });
        } else {
            $scope.colours = [
              '#97BBCD', // blue
              '#DCDCDC', // light grey
              '#F7464A', // red
              '#46BFBD', // green
              '#FDB45C', // yellow
              '#949FB1', // grey
              '#4D5360'  // dark grey
            ];
            switch (item.nivel) {
            case "acumulado":
                if (item.tipo === "receitas") {
                    AcumuladoService.buscarTiposReceitas().success(function (tiposReceitas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < tiposReceitas.length; i++) {
                            var tipoReceita = tiposReceitas[i];
                            labels.push(LabelGraficoGenerator.tipoReceita(tipoReceita.codigo, tipoReceita.descricao));
                            data.push(tipoReceita.acumulado);
                            valorAcumulado += tipoReceita.acumulado;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado grupos receitas : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "despesas") {
                    AcumuladoService.buscarGruposDespesas().success(function (gruposDespesas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < gruposDespesas.length; i++) {
                            var grupoDespesa = gruposDespesas[i];
                            labels.push(LabelGraficoGenerator.grupo(grupoDespesa.codigo, grupoDespesa.descricao));
                            data.push(grupoDespesa.acumulado);
                            valorAcumulado += grupoDespesa.acumulado;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado grupos despesas : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "reservas") {
                    AcumuladoService.buscarReservas().success(function (reservas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < reservas.length; i++) {
                            var reserva = reservas[i];
                            var descricao = reserva.valor < 0 ? "Retirada " : "Reserva " + $filter('date')(reserva.dataReserva, 'dd-MM-yyyy');
                            labels.push(LabelGraficoGenerator.reservas(reserva.codigo, descricao));
                            data.push(parseFloat(reserva.valor.toFixed(2)));
                            valorAcumulado += parseFloat(reserva.valor.toFixed(2));
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado reservas : " + $filter('currency')(valorAcumulado);
                    });
                }
                break;
            case "grupo":
                // sempre será despesas
                // item.id pega o id do grupo que entrou
                AcumuladoService.buscarTiposDespesas(item.id).success(function (tiposDespesas) {
                    var labels = [];
                    var data = [];
                    var valorAcumulado = 0;
                    for (var i = 0; i < tiposDespesas.length; i++) {
                        var tipoDespesa = tiposDespesas[i];
                        labels.push(LabelGraficoGenerator.tipoDespesa(item.id, tipoDespesa.codigo, tipoDespesa.descricao));
                        data.push(tipoDespesa.acumulado);
                        valorAcumulado += tipoDespesa.acumulado;
                    }
                    $scope.labels = labels;
                    $scope.data = data;
                    $scope.valorAcumulado = "Acumulado tipos despesas do grupo " + item.label + " : " + $filter('currency')(valorAcumulado);
                });
                break;
            case "tipo":
                // item.id pega o id do tipo que entrou
                if (item.tipo === "receitas") {
                    AcumuladoService.buscarReceitas(item.id).success(function (receitas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < receitas.length; i++) {
                            var receita = receitas[i];
                            labels.push(LabelGraficoGenerator.receitas(item.id, receita.codigo, receita.descricao));
                            data.push(receita.valorRecebido || receita.valorOriginal);
                            valorAcumulado += receita.valorRecebido || receita.valorOriginal;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado receitas do tipo " + item.label + " : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "despesas") {
                    AcumuladoService.buscarDespesas(item.idDespesaGrupo, item.id).success(function (despesas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < despesas.length; i++) {
                            var despesa = despesas[i];
                            labels.push(LabelGraficoGenerator.despesas(item.idDespesaGrupo, item.id, despesa.codigo, despesa.descricao));
                            data.push(despesa.valorPago || despesa.valorOriginal);
                            valorAcumulado += despesa.valorPago || despesa.valorOriginal;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado despesas do tipo " + item.label + " : " + $filter('currency')(valorAcumulado);
                    });
                }
                break;
            default:
                // nao fazer nada, vai entrar aqui quando for as despesas, as receitas e as reservas.
            }
        }
    }

    $scope.atualizarGrafico = function (points, event) {
        if (points.length > 0) {
            var item = points[0].label;
            atualizarGraficoDinamicamente(item);
        }
    };

    $scope.voltarUmNivel = function () {
        if (itensNavegados.length >= 2) {
            atualizarGraficoDinamicamente(itensNavegados[itensNavegados.length - 2]);
            itensNavegados = itensNavegados.slice(0, itensNavegados.length - 2);
        } else {
            atualizarGraficoDinamicamente("saldo");
        }
    };

};

module.exports = ['$scope',
                                    '$filter',
                                     'SaldoService',
                                     'AcumuladoService',
                                     'LabelGraficoGenerator',
                                     GraficoSaldoController];
