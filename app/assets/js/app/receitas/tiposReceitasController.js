var TiposReceitasController = function($scope, TiposReceitasService) {
	'use strict';

	TiposReceitasService.buscar().success(function(tiposReceitas) {
		$scope.tiposReceitas = tiposReceitas;
	});

	$scope.novo = function(descricao) {
		swal({
			title : "Novo tipo de receita...",
			text : "Informe uma descrição ;)",
			type : "input",
			showCancelButton : true,
			closeOnConfirm : false
		}, function(descricao) {
			if (descricao === false)
				return false;
			if (descricao === "") {
				swal.showInputError("A descrição não pode estar em branco ;(");
				return false
			}
			TiposReceitasService.novo(descricao).success(function (listaAtualizada){
				$scope.tiposReceitas = listaAtualizada;
				swal("Feito!", "Tipo de receita " + descricao + " criada!", "success");
			});
		});
	};

	$scope.remover = function(codigo) {
		swal({
			title: "Tem certeza meu?",
			text: "Este tipo de receita não estará mais disponível! Tá loko mano?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Sim, quero remover!",
			closeOnConfirm: false
		}, function(confirmado){
			if (confirmado === true) {
				TiposReceitasService.remover(codigo).success(function(listaAtualizada) {
					$scope.tiposReceitas = listaAtualizada;
					swal("Feito!", "Tipo de receita foi removida!", "success");
					$scope.$parent.$broadcast('atualizarSaldo');
				});
			}

		});
	};

	$scope.editar = function (tipoReceita){
		swal({
			title : "Editar tipo de receita...",
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
			if(novaDescricao === tipoReceita.descricao){
				swal("Feito!", "Tipo de receita " + novaDescricao + " atualizado!", "success");
			}
			TiposReceitasService.atualizar(tipoReceita.codigo, novaDescricao).success(function (listaAtualizada){
				$scope.tiposReceitas = listaAtualizada;
				swal("Feito!", "Tipo de receita " + novaDescricao + " atualizado!", "success");
			});
		});
	};

};

module.exports = [ '$scope', 'TiposReceitasService', TiposReceitasController ];
