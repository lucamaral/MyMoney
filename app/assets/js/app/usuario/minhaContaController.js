var MinhaContaController = function($scope, $http, $location) {
	'use strict';

	var tratadorDeErros = require("../../tratadorDeErros");

	$http.get("/api/usuarios/sessao").success(function(usuarioDaSessao) {
		$scope.usuario = usuarioDaSessao;
	}).error(tratadorDeErros());

	$scope.atualizarDados = function(usuario) {
		$http.post("/api/usuarios/sessao", usuario).success(
				function(usuarioAtualizado) {
					swal({
						title : "Usuario  atualizado com sucesso!",
						text : usuarioAtualizado.nome,
						type : "success",
						allowOutsideClick : true
					}, function() {
						$scope.usuario = usuarioAtualizado;
						$scope.$apply();
						$("#nomeDoUsuario").text(usuario.nome);
					});
				}).error(tratadorDeErros());
	};

	$scope.excluirConta = function() {
		swal({
			title : "Você perderá suas informações ;(",
			text : "Você tem certeza? ",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "Sim",
			cancelButtonText : "Não, o que eu estou fazendo?!",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				$http({
					url : "/api/usuarios/sessao",
					method : "DELETE"
				}).success(function() {
					setTimeout(function (){
						window.location = "/login";
					}, 2500);
					swal({
						title : "Sua conta foi removida ;(",
						text : "Você será redirecionado para o login",
						timer : 2000
					});
				}).error(tratadorDeErros());
			}
		});
	};

};

module.exports = [ '$scope', '$http', '$location', MinhaContaController ];
