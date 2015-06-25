var TiposReceitasService = function($http) {

	var tratadorDeErros = require("../../tratadorDeErros");

	return {
		buscar : function() {
			return $http.get("/api/receitas/tipos").error(tratadorDeErros());
		},
		buscarPeloId : function (idReceitaTipo){
			return $http.get("/api/receitas/tipos/" + idReceitaTipo).error(tratadorDeErros());
		},
		novo : function(descricao) {
			return $http.post("/api/receitas/tipos", {
				"descricao" : descricao
			}).error(tratadorDeErros());
		},
		atualizar : function(codigo, novaDescricao) {
			return $http.put("/api/receitas/tipos", {
				"codigo" : codigo,
				"descricao" : novaDescricao
			}).error(tratadorDeErros());
		},
		remover : function(codigo) {
			var req = {
				 method: "DELETE",
				 url: "/api/receitas/tipos/" + codigo
			};
			return $http(req).error(tratadorDeErros());
		}
	};
};

module.exports = [ "$http", TiposReceitasService ];
