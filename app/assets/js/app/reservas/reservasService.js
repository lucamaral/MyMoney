var ReservasService = function ($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar: function () {
            return $http.get("/api/reservas").error(tratadorDeErros());
        },
        buscarPeloId : function (idReserva){
            return $http.get("/api/reservas/" + idReserva).error(tratadorDeErros());
        },
        salvar: function (reserva) {
            return $http.post("/api/reservas", reserva).error(tratadorDeErros());
        },
        remover: function (idReserva) {
            var req = {
                method: "DELETE",
                url: "/api/reservas/" + idReserva
            };
            return $http(req).error(tratadorDeErros());
        }
    };
};

module.exports = ["$http", ReservasService];
