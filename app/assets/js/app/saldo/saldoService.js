var SaldoService = function($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar : function (){
            return $http.get("/api/saldo").error(tratadorDeErros());
        },
        atualizar : function (){
            return $http.put("/api/saldo").error(tratadorDeErros());
        }
    };
};

module.exports = [ "$http", SaldoService ];
