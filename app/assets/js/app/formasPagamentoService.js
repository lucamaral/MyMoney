var FormasPagamentoService = function($http) {

    var tratadorDeErros = require("../tratadorDeErros");

    return {
        buscar : function() {
            return $http.get("/api/formas-pagamento").error(tratadorDeErros());
        }
    };
};

module.exports = [ "$http", FormasPagamentoService ];
