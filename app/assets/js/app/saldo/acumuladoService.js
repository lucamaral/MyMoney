var AcumuladoService = function ($http, DespesasService, ReceitasService, ReservasService) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscarTiposReceitas: function () {
            return $http.get("/api/acumulado/receitas/tipos").error(tratadorDeErros());
        },
        buscarGruposDespesas: function () {
            return $http.get("/api/acumulado/despesas/grupos").error(tratadorDeErros());
        },
        buscarReceitas: function (idReceitaTipo) {
            return ReceitasService.buscar(idReceitaTipo);
        },
        buscarTiposDespesas: function (idDespesaGrupo) {
            return $http.get("/api/acumulado/despesas/grupos/" + idDespesaGrupo + "/tipos").error(tratadorDeErros());
        },
        buscarDespesas: function (idDespesaGrupo, idDespesaTipo) {
            return DespesasService.buscar(idDespesaGrupo, idDespesaTipo);
        },
        buscarReservas: function () {
            return ReservasService.buscar();
        }
    };
};

module.exports = ["$http", 'DespesasService', 'ReceitasService', 'ReservasService', AcumuladoService];
