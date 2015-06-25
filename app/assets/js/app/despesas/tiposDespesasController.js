var TiposDespesasController = function($scope, $routeParams, GruposDespesasService, TiposDespesasService) {
	'use strict';

	GruposDespesasService.buscarPeloId($routeParams.idDespesaGrupo).success(function (grupoDespesa){
			$scope.grupoDespesa = grupoDespesa;

			TiposDespesasService.buscar($routeParams.idDespesaGrupo).success(function(tiposDespesas) {
				$scope.tiposDespesas = tiposDespesas;
			});

	});

	$scope.novo = function(descricao) {
		swal({
			title : "Novo tipo de despesas...",
			text : "Informe uma descrição ;)",
			type : "input",
			showCancelButton : true,
			closeOnConfirm : false
		}, function(descricao) {
			if (descricao === false)
				return false;
			if (descricao === "") {
				swal.showInputError("A descrição não pode estar em branco ;(");
				return false;
			}
			TiposDespesasService.novo($routeParams.idDespesaGrupo, descricao).success(function (listaAtualizada){
				$scope.tiposDespesas = listaAtualizada;
				swal("Feito!", "Tipo de despesa " + descricao + " criado!", "success");
			});
		});
	};

	$scope.remover = function(codigo) {
		swal({
			title: "Tem certeza meu?",
			text: "Este grupo de despesa não estará mais disponível! Tá loko mano?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Sim, quero remover!",
			closeOnConfirm: false
		}, function(confirmado){
			if (confirmado === true) {
				TiposDespesasService.remover($routeParams.idDespesaGrupo, codigo).success(function(listaAtualizada) {
					$scope.tiposDespesas = listaAtualizada;
					swal("Feito!", "Tipo de despesa removido!", "success");
					$scope.$parent.$broadcast('atualizarSaldo');
				});
			}

		});
	};

	$scope.editar = function (tipoDespesa){
		swal({
			title : "Editar tipo de despesa...",
			text : "Informe uma nova descrição ;)",
			type : "input",
			showCancelButton : true,
			closeOnConfirm : false
		}, function (novaDescricao){
			if (novaDescricao === false)
				return false;
			if (novaDescricao === "") {
				swal.showInputError("A descrição não pode estar em branco ;(");
				return false;
			}
			if(novaDescricao === tipoDespesa.descricao){
				swal("Feito!", "Tipo de despesa " + novaDescricao + " atualizado!", "success");
			}
			TiposDespesasService.atualizar($routeParams.idDespesaGrupo, tipoDespesa.codigo, novaDescricao).success(function (listaAtualizada){
				$scope.tiposDespesas = listaAtualizada;
				swal("Feito!", "Tipo de despesa " + novaDescricao + " atualizado!", "success");
			});
		});
	};

};

module.exports = [ '$scope','$routeParams', 'GruposDespesasService', 'TiposDespesasService', TiposDespesasController ];
