var TiposDespesasService = function($http) {

	var tratadorDeErros = require("../../tratadorDeErros");

	return {
		buscar : function(codigo) {
			return $http.get("/api/despesas/grupos/" + codigo + "/tipos").error(tratadorDeErros());
		},
		buscarPeloId : function (idDespesaGrupo, idDespesaTipo){
		    return $http.get("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo).error(tratadorDeErros());
		},
		novo : function(idDespesaGrupo, descricao) {
			return $http.post("/api/despesas/grupos/" + idDespesaGrupo + "/tipos", {
				"descricao" : descricao
			}).error(tratadorDeErros());
		},
		atualizar : function(idDespesaGrupo, codigo, novaDescricao) {
			return $http.put("/api/despesas/grupos/" + idDespesaGrupo + "/tipos", {
				"codigo" : codigo,
				"descricao" : novaDescricao
			}).error(tratadorDeErros());
		},
		remover : function(idDespesaGrupo, codigo) {
			var req = {
				 method: "DELETE",
				 url: "/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + codigo
			};
			return $http(req).error(tratadorDeErros());
		}
	};
};

module.exports = [ "$http", TiposDespesasService ];
