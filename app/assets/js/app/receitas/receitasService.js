var ReceitasService = function($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar : function(idReceitaTipo) {
            return $http.get("/api/receitas/tipos/" + idReceitaTipo + "/receitas").error(tratadorDeErros());
        },
        buscarPeloId : function (idReceitaTipo, idReceita){
            return $http.get("/api/receitas/tipos/" + idReceitaTipo + "/receitas/" + idReceita).error(tratadorDeErros());
        },
        salvar : function(receita) {
            return $http.post("/api/receitas/tipos/" + receita.idReceitaTipo + "/receitas", receita).error(tratadorDeErros());
        },
        remover : function(idReceitaTipo, codigo) {
            var req = {
                 method: "DELETE",
                 url: "/api/receitas/tipos/" + idReceitaTipo + "/receitas/" + codigo
            };
            return $http(req).error(tratadorDeErros());
        }
    };
};

module.exports = [ "$http", ReceitasService ];
