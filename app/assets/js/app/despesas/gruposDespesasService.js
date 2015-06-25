var GruposDespesasService = function($http) {

	var tratadorDeErros = require("../../tratadorDeErros");

	return {
		buscar : function() {
			return $http.get("/api/despesas/grupos").error(tratadorDeErros());
		},
		buscarPeloId : function (codigo){
			return $http.get("/api/despesas/grupos/" + codigo).error(tratadorDeErros());
		},
		novo : function(descricao) {
			return $http.post("/api/despesas/grupos", {
				"descricao" : descricao
			}).error(tratadorDeErros());
		},
		atualizar : function(codigo, novaDescricao) {
			return $http.put("/api/despesas/grupos", {
				"codigo" : codigo,
				"descricao" : novaDescricao
			}).error(tratadorDeErros());
		},
		remover : function(codigo) {
			var req = {
				 method: "DELETE",
				 url: "/api/despesas/grupos/" + codigo
			};	
			return $http(req).error(tratadorDeErros());
		}
	};
};

module.exports = [ "$http", GruposDespesasService ];
