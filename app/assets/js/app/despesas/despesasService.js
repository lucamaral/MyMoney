var DespesasService = function ($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar: function (idDespesaGrupo, idDespesaTipo) {
            return $http.get("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas").error(tratadorDeErros());
        },
        buscarPeloId: function (idDespesaGrupo, idDespesaTipo, idDespesa) {
            return $http.get("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas/" + idDespesa).error(tratadorDeErros());
        },
        buscarDespesasParaPagar: function () {
            return $http.get("/api/despesas/para-pagar").error(tratadorDeErros());
        },
        salvar: function (idDespesaGrupo, despesa) {
            return $http.post("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + despesa.idDespesaTipo + "/despesas", despesa).error(tratadorDeErros());
        },
        remover: function (idDespesaGrupo, idDespesaTipo, idDespesa) {
            var req = {
                method: "DELETE",
                url: "/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas/" + idDespesa
            };
            return $http(req).error(tratadorDeErros());
        }
    };
};

module.exports = ["$http", DespesasService];
