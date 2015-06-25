var GruposDespesasController = function($scope, GruposDespesasService) {
	'use strict';

	GruposDespesasService.buscar().success(function(gruposDespesas) {
		$scope.gruposDespesas = gruposDespesas;
	});

	$scope.novo = function(descricao) {
		swal({
			title : "Novo grupo de despesas...",
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
			GruposDespesasService.novo(descricao).success(function (listaAtualizada){
				$scope.gruposDespesas = listaAtualizada;
				swal("Feito!", "Grupo de despesa " + descricao + " criado!", "success");
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
				GruposDespesasService.remover(codigo).success(function(listaAtualizada) {
					$scope.gruposDespesas = listaAtualizada;
					swal("Feito!", "Grupo de despesa removido!", "success");
					$scope.$parent.$broadcast('atualizarSaldo');
				});
			}

		});
	};

	$scope.editar = function (grupoDespesa){
		swal({
			title : "Editar grupo de despesa...",
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
			if(novaDescricao === grupoDespesa.descricao){
				swal("Feito!", "Grupo de despesa " + novaDescricao + " atualizado!", "success");
			}
			GruposDespesasService.atualizar(grupoDespesa.codigo, novaDescricao).success(function (listaAtualizada){
				$scope.gruposDespesas = listaAtualizada;
				swal("Feito!", "Grupo de despesa " + novaDescricao + " atualizado!", "success");
			});
		});
	};

};

module.exports = [ '$scope', 'GruposDespesasService', GruposDespesasController ];
