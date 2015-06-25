(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var AppRouteProvider = function ($routeProvider) {
    'use strict';

    $routeProvider.
    when('/', {
        templateUrl: '/assets/dist/templates/app/index.html'
    }).
    when('/minha-conta', {
        templateUrl: '/assets/dist/templates/app/usuario/minha-conta.html',
        controller: 'MinhaContaController'
    }).
    when('/minha-conta/alterar-senha', {
        templateUrl: '/assets/dist/templates/app/usuario/alterar-senha.html',
        controller: 'AlterarSenhaController'
    }).
    when('/receitas/tipos', {
        templateUrl: '/assets/dist/templates/app/receitas/tipos.html',
        controller: 'TiposReceitasController'
    }).
    when('/receitas/tipos/:idReceitaTipo/receitas', {
        templateUrl: '/assets/dist/templates/app/receitas/listagemReceitas.html',
        controller: 'ListagemReceitasController'
    }).
    when('/receitas/tipos/:idReceitaTipo/receitas/:idReceita', {
        templateUrl: '/assets/dist/templates/app/receitas/receitas.html',
        controller: 'ReceitasController'
    }).
    when('/despesas/grupos', {
        templateUrl: 'assets/dist/templates/app/despesas/grupos.html',
        controller: 'GruposDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos', {
        templateUrl: 'assets/dist/templates/app/despesas/tipos.html',
        controller: 'TiposDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos/:idDespesaTipo/despesas', {
        templateUrl: 'assets/dist/templates/app/despesas/listagemDespesas.html',
        controller: 'ListagemDespesasController'
    }).
    when('/despesas/grupos/:idDespesaGrupo/tipos/:idDespesaTipo/despesas/:idDespesa', {
        templateUrl: 'assets/dist/templates/app/despesas/despesas.html',
        controller: 'DespesasController'
    }).
    when('/reservas/:idReserva', {
        templateUrl: 'assets/dist/templates/app/reservas/reservas.html',
        controller: 'ReservasController'
    }).
    when('/reservas', {
        templateUrl: 'assets/dist/templates/app/reservas/listagemReservas.html',
        controller: 'ListagemReservasController'
    }).
    otherwise({
        redirectTo: '/'
    });
};

module.exports = ['$routeProvider', AppRouteProvider];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/appRoute.js","/app")
},{"+7ZJp0":31,"buffer":28}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var DespesasAPagarController = function ($scope, DespesasService) {
    'use strict';

    DespesasService.buscarDespesasParaPagar().success(function (despesasAPagar){
            $scope.despesasAPagar = despesasAPagar;
            var totalAPagar = 0;
            for(var i = 0; i<despesasAPagar.length; i++){
                totalAPagar += despesasAPagar[i].valorAPagar;
            }
            $scope.totalAPagar = totalAPagar;
    });

    $scope.dataAtual = new Date();

};

module.exports = ['$scope', 'DespesasService', DespesasAPagarController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/despesasAPagarController.js","/app/despesas")
},{"+7ZJp0":31,"buffer":28}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var DespesasController = function ($scope, $route, $routeParams, $location, GruposDespesasService, TiposDespesasService, FormasPagamentoService, DespesasService) {
    'use strict';

    if ($routeParams.idDespesa !== "nova") {
        DespesasService.buscarPeloId($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, $routeParams.idDespesa).success(atualizarScopeComDespesa);
    } else {
        $scope.despesa = {
            descricao: "",
            dataVencimento: new Date(),
            dataPagamento: null,
            valorOriginal: 0,
            valorPago: null,
            idDespesaTipo: parseInt($routeParams.idDespesaTipo),
            idFormaPagamento: ""
        };
    }

    $scope.idDespesaGrupo = parseInt($routeParams.idDespesaGrupo);

    GruposDespesasService.buscar().success(function (gruposDespesas) {
        $scope.gruposDespesas = gruposDespesas;
    });

    FormasPagamentoService.buscar().success(function (formasPagamento) {
        $scope.formasPagamento = formasPagamento;
    });

    function atualizarScopeComDespesa(despesa) {
        $scope.despesa = despesa;
        if ($scope.despesa.dataVencimento) {
            $scope.despesa.dataVencimento = new Date($scope.despesa.dataVencimento);
        }
        if ($scope.despesa.dataPagamento) {
            $scope.despesa.dataPagamento = new Date($scope.despesa.dataPagamento);
        }
    }

    $scope.buscarTiposDespesas = function () {
        if ($scope.idDespesaGrupo !== 0) {
            TiposDespesasService.buscar($scope.idDespesaGrupo).success(function (tiposDespesas) {
                $scope.tiposDespesas = tiposDespesas;
            });
        }
    };

    $scope.salvar = function (despesa) {
        DespesasService.salvar($scope.idDespesaGrupo, despesa).success(function (despesaSalva) {
            atualizarScopeComDespesa(despesaSalva);
            var newParams = {
                idDespesaGrupo: $scope.idDespesaGrupo,
                idDespesaTipo: despesaSalva.idDespesaTipo,
                idDespesa: despesaSalva.codigo
            };
            $routeParams = newParams;
            $route.updateParams(newParams);
            swal("Feito!", "Despesa '" + despesa.descricao + "' salva!", "success");

            $scope.$parent.$broadcast('atualizarSaldo');
        });
    };

    $scope.remover = function (despesa) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta despesa não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                DespesasService.remover($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, despesa.codigo).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("despesas/grupos/" + $routeParams.idDespesaGrupo + "/tipos/" + $routeParams.idDespesaTipo + "/despesas");
                        $scope.$apply();
                    }, 2250);

                    swal({
                        title: "Feito!",
                        text: "Despesa removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

    $scope.buscarTiposDespesas();
};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'GruposDespesasService',
                                      'TiposDespesasService',
                                      'FormasPagamentoService',
                                      'DespesasService',
                                      DespesasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/despesasController.js","/app/despesas")
},{"+7ZJp0":31,"buffer":28}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var DespesasService = function ($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar: function (idDespesaGrupo, idDespesaTipo) {
            return $http.get("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas").error(tratadorDeErros());
        },
        buscarPeloId: function (idDespesaGrupo, idDespesaTipo, idDespesa) {
            return $http.get("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas/" + idDespesa).error(tratadorDeErros());
        },
        buscarDespesasParaPagar: function () {
            return $http.get("/api/despesas/para-pagar").error(tratadorDeErros());
        },
        salvar: function (idDespesaGrupo, despesa) {
            return $http.post("/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + despesa.idDespesaTipo + "/despesas", despesa).error(tratadorDeErros());
        },
        remover: function (idDespesaGrupo, idDespesaTipo, idDespesa) {
            var req = {
                method: "DELETE",
                url: "/api/despesas/grupos/" + idDespesaGrupo + "/tipos/" + idDespesaTipo + "/despesas/" + idDespesa
            };
            return $http(req).error(tratadorDeErros());
        }
    };
};

module.exports = ["$http", DespesasService];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/despesasService.js","/app/despesas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/gruposDespesasController.js","/app/despesas")
},{"+7ZJp0":31,"buffer":28}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/gruposDespesasService.js","/app/despesas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ListagemDespesasController = function ($scope, $routeParams, GruposDespesasService, TiposDespesasService, DespesasService) {
    'use strict';

    GruposDespesasService.buscarPeloId($routeParams.idDespesaGrupo).success(function (grupoDespesa){
            $scope.grupoDespesa = grupoDespesa;
    });

    TiposDespesasService.buscarPeloId($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo).success(function (tipoDespesa){
            $scope.tipoDespesa = tipoDespesa;
    });

    DespesasService.buscar($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo).success(function (despesas){
            $scope.despesas = despesas;
    });

    $scope.remover = function (despesa) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta despesa não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                DespesasService.remover($routeParams.idDespesaGrupo, $routeParams.idDespesaTipo, despesa.codigo).success(function (listaAtualizada) {

                    console.info(listaAtualizada);
                    $scope.despesas = listaAtualizada;

                    swal({
                        title: "Feito!",
                        text: "Despesa removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

};

module.exports = ['$scope', '$routeParams', 'GruposDespesasService', 'TiposDespesasService', 'DespesasService', ListagemDespesasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/listagemDespesasController.js","/app/despesas")
},{"+7ZJp0":31,"buffer":28}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/tiposDespesasController.js","/app/despesas")
},{"+7ZJp0":31,"buffer":28}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/despesas/tiposDespesasService.js","/app/despesas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var FormasPagamentoService = function($http) {

    var tratadorDeErros = require("../tratadorDeErros");

    return {
        buscar : function() {
            return $http.get("/api/formas-pagamento").error(tratadorDeErros());
        }
    };
};

module.exports = [ "$http", FormasPagamentoService ];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/formasPagamentoService.js","/app")
},{"+7ZJp0":31,"../tratadorDeErros":27,"buffer":28}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ListagemReceitasController = function ($scope, $routeParams, TiposReceitasService, ReceitasService) {
    'use strict';

    TiposReceitasService.buscarPeloId($routeParams.idReceitaTipo).success(function (tipoReceita){
        $scope.tipoReceita = tipoReceita;

        ReceitasService.buscar($routeParams.idReceitaTipo).success(function (receitas) {
            $scope.receitas = receitas;
        });
    });

    $scope.remover = function (codigo) {
        swal({
            title: "Tem certeza meu?",
            text: "Este receita não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function(confirmado){
            if (confirmado === true) {
                ReceitasService.remover($routeParams.idReceitaTipo, codigo).success(function(listaAtualizada) {
                    $scope.receitas = listaAtualizada;
                    swal("Feito!", "Receita foi removida!", "success");
                });
            }

        });
    };

};

module.exports = ['$scope', '$routeParams', 'TiposReceitasService', 'ReceitasService', ListagemReceitasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/receitas/listagemReceitasController.js","/app/receitas")
},{"+7ZJp0":31,"buffer":28}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ReceitasController = function ($scope, $route, $routeParams, $location, TiposReceitasService, FormasPagamentoService, ReceitasService) {
    'use strict';

    if ($routeParams.idReceita !== "nova") {
        ReceitasService.buscarPeloId($routeParams.idReceitaTipo, $routeParams.idReceita).success(atualizarScopeComReceita);
    } else {
        $scope.receita = {
            descricao: "",
            dataPrevista: new Date(),
            valorOriginal: 0,
            idFormaPagamento: "",
            idReceitaTipo: parseInt($routeParams.idReceitaTipo)
        };
    }

    TiposReceitasService.buscar().success(function (tiposReceitas) {
        $scope.tiposReceitas = tiposReceitas;
    });

    FormasPagamentoService.buscar().success(function (formasPagamento) {
        $scope.formasPagamento = formasPagamento;
    });
    
    $scope.salvar = function (receita) {
        ReceitasService.salvar(receita).success(function (receitaSalva) {
            atualizarScopeComReceita(receitaSalva);
            var newParams = {
                idReceitaTipo: receitaSalva.idReceitaTipo,
                idReceita: receitaSalva.codigo
            };
            $route.updateParams(newParams);
            $routeParams = newParams;
            swal("Feito!", "Receita  '" + receita.descricao + "' salva!", "success");

            $scope.$parent.$broadcast('atualizarSaldo');
        });
    };

    $scope.remover = function (idReceita) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta receita não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                ReceitasService.remover($routeParams.idReceitaTipo, idReceita).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("/receitas/tipos/" + $routeParams.idReceitaTipo + "/receitas");
                        $scope.$apply();
                    }, 2250);

                    swal({
                        title: "Feito!",
                        text: "Receita removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

    function atualizarScopeComReceita(receita) {
        $scope.receita = receita;
        if ($scope.receita.dataRecebimento) {
            $scope.receita.dataRecebimento = new Date($scope.receita.dataRecebimento);
        }
        if ($scope.receita.dataPrevista) {
            $scope.receita.dataPrevista = new Date($scope.receita.dataPrevista);
        }
    }
};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'TiposReceitasService',
                                      'FormasPagamentoService',
                                      'ReceitasService',
                                      ReceitasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/receitas/receitasController.js","/app/receitas")
},{"+7ZJp0":31,"buffer":28}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ReceitasService = function($http) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscar : function(idReceitaTipo) {
            return $http.get("/api/receitas/tipos/" + idReceitaTipo + "/receitas").error(tratadorDeErros());
        },
        buscarPeloId : function (idReceitaTipo, idReceita){
            return $http.get("/api/receitas/tipos/" + idReceitaTipo + "/receitas/" + idReceita).error(tratadorDeErros());
        },
        salvar : function(receita) {
            return $http.post("/api/receitas/tipos/" + receita.idReceitaTipo + "/receitas", receita).error(tratadorDeErros());
        },
        remover : function(idReceitaTipo, codigo) {
            var req = {
                 method: "DELETE",
                 url: "/api/receitas/tipos/" + idReceitaTipo + "/receitas/" + codigo
            };
            return $http(req).error(tratadorDeErros());
        }
    };
};

module.exports = [ "$http", ReceitasService ];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/receitas/receitasService.js","/app/receitas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/receitas/tiposReceitasController.js","/app/receitas")
},{"+7ZJp0":31,"buffer":28}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/receitas/tiposReceitasService.js","/app/receitas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ListagemReservasController = function ($scope, $routeParams, ReservasService) {
    'use strict';

    ReservasService.buscar().success(function (reservas){
            $scope.reservas = reservas;
    });

    $scope.remover = function (codigo) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta reserva não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function(confirmado){
            if (confirmado === true) {
                ReservasService.remover(codigo).success(function(listaAtualizada) {
                    $scope.reservas = listaAtualizada;
                    swal("Feito!", "Reserva foi removida!", "success");
                    $scope.$parent.$broadcast('atualizarSaldo');
                });
            }

        });
    };

};

module.exports = ['$scope', '$routeParams', 'ReservasService', ListagemReservasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/reservas/listagemReservasController.js","/app/reservas")
},{"+7ZJp0":31,"buffer":28}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var ReservasController = function ($scope, $route, $routeParams, $location, SaldoService, ReservasService) {
    'use strict';

    function atualizarSaldo(){
        SaldoService.buscar().success(function (saldo) {
            $scope.saldo = saldo;
        });
    }

    atualizarSaldo();

    if ($routeParams.idReserva === "nova") {
        $scope.reserva = {
            codigo: null,
            valor: null,
            dataReserva : null
        };
    } else {
        ReservasService.buscarPeloId($routeParams.idReserva).success(function (reserva) {
            $scope.reserva = reserva;
            $scope.reserva.dataReserva = new Date(reserva.dataReserva);
            $scope.reserva.valor = parseFloat(reserva.valor.toFixed(2));
        });
    }

    $scope.ehPercentual = false;
    $scope.valorPercentual = null;

    $scope.calcularValorEmPercentual = function () {
        if ($scope.valorPercentual) {
            if ($scope.valorPercentual > 100) {
                sweetAlert("Oops...", "Você não pode reservar mais de 100% de seu saldo", "error");
                $scope.valorPercentual = null;
                $scope.reserva.valor = null;
                return;
            }
            if ($scope.valorPercentual <= 0) {
                sweetAlert("Oops...", "Você não pode reservar 0% ou menos de seu saldo", "error");
                $scope.valorPercentual = null;
                $scope.reserva.valor = null;
                return;
            }
            var valorFinal = $scope.saldo.valor * ($scope.valorPercentual / 100);
            $scope.reserva.valor = parseFloat(valorFinal.toFixed(2));
        } else {
            $scope.reserva.valor = null;
        }
    };

    $scope.salvar = function (reserva) {
        if ($scope.reserva.valor > $scope.saldo.valor) {
            sweetAlert("Oops...", "Você não pode reservar mais do que você tem em saldo ;(", "error");
            $scope.reserva.valor = null;
            return;
        }
        reserva.dataReserva = new Date();
        ReservasService.salvar(reserva).success(function (reservaSalva) {
            $scope.reserva = reservaSalva;
            $scope.reserva.valor = parseFloat(reservaSalva.valor.toFixed(2));
            $scope.reserva.dataReserva = new Date(reservaSalva.dataReserva);
            swal("Feito!", "Reserva salva!", "success");
            var newParams = {
                idReserva: reservaSalva.codigo
            };
            $route.updateParams(newParams);
            $routeParams = newParams;
            $scope.$parent.$broadcast('atualizarSaldo');
            $scope.$on('saldoAtualizado', function (event, saldoAtualizado){
                    $scope.saldo = saldoAtualizado;
            });
        });
    };

    $scope.remover = function (idReserva) {
        swal({
            title: "Tem certeza meu?",
            text: "Esta reserva não estará mais disponível! Tá loko mano?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, quero remover!",
            closeOnConfirm: false
        }, function (confirmado) {
            if (confirmado === true) {
                ReservasService.remover(idReserva).success(function () {

                    $scope.$parent.$broadcast('atualizarSaldo');

                    setTimeout(function () {
                        $location.path("/reservas");
                        $scope.$apply();
                    }, 2250);

                    swal({
                        title: "Feito!",
                        text: "Reserva removida!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                });
            }
        });
    };

};

module.exports = ['$scope',
                                      '$route',
                                      '$routeParams',
                                      '$location',
                                      'SaldoService',
                                      'ReservasService',
                                      ReservasController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/reservas/reservasController.js","/app/reservas")
},{"+7ZJp0":31,"buffer":28}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/reservas/reservasService.js","/app/reservas")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var AcumuladoService = function ($http, DespesasService, ReceitasService, ReservasService) {

    var tratadorDeErros = require("../../tratadorDeErros");

    return {
        buscarTiposReceitas: function () {
            return $http.get("/api/acumulado/receitas/tipos").error(tratadorDeErros());
        },
        buscarGruposDespesas: function () {
            return $http.get("/api/acumulado/despesas/grupos").error(tratadorDeErros());
        },
        buscarReceitas: function (idReceitaTipo) {
            return ReceitasService.buscar(idReceitaTipo);
        },
        buscarTiposDespesas: function (idDespesaGrupo) {
            return $http.get("/api/acumulado/despesas/grupos/" + idDespesaGrupo + "/tipos").error(tratadorDeErros());
        },
        buscarDespesas: function (idDespesaGrupo, idDespesaTipo) {
            return DespesasService.buscar(idDespesaGrupo, idDespesaTipo);
        },
        buscarReservas: function () {
            return ReservasService.buscar();
        }
    };
};

module.exports = ["$http", 'DespesasService', 'ReceitasService', 'ReservasService', AcumuladoService];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/saldo/acumuladoService.js","/app/saldo")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var GraficoSaldoController = function ($scope, $filter, SaldoService, AcumuladoService, LabelGraficoGenerator) {
    'use strict';

    var itensNavegados = [];
    atualizarGraficoDinamicamente("saldo");

    function atualizarGraficoDinamicamente(item) {
        if ((item === "saldo") || ((item.nivel !== "receitas") && (item.nivel !== "despesas"))) {
            itensNavegados.push(item);
        }
        if (item === "saldo") {
            SaldoService.buscar().success(function (saldo) {
                $scope.valorAcumulado = "Saldo : " + $filter('currency')(saldo.valor);
                $scope.labels = [LabelGraficoGenerator.acumulado("receitas"), LabelGraficoGenerator.acumulado("despesas"), LabelGraficoGenerator.acumulado("reservas")];
                $scope.data = [saldo.acumuladoReceitas, saldo.acumuladoDespesas, parseFloat(saldo.acumuladoReservas.toFixed(2))];
                $scope.colours = ['#337ab7', '#d9534f', '#5cb85c'];
            });
        } else {
            $scope.colours = [
              '#97BBCD', // blue
              '#DCDCDC', // light grey
              '#F7464A', // red
              '#46BFBD', // green
              '#FDB45C', // yellow
              '#949FB1', // grey
              '#4D5360'  // dark grey
            ];
            switch (item.nivel) {
            case "acumulado":
                if (item.tipo === "receitas") {
                    AcumuladoService.buscarTiposReceitas().success(function (tiposReceitas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < tiposReceitas.length; i++) {
                            var tipoReceita = tiposReceitas[i];
                            labels.push(LabelGraficoGenerator.tipoReceita(tipoReceita.codigo, tipoReceita.descricao));
                            data.push(tipoReceita.acumulado);
                            valorAcumulado += tipoReceita.acumulado;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado grupos receitas : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "despesas") {
                    AcumuladoService.buscarGruposDespesas().success(function (gruposDespesas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < gruposDespesas.length; i++) {
                            var grupoDespesa = gruposDespesas[i];
                            labels.push(LabelGraficoGenerator.grupo(grupoDespesa.codigo, grupoDespesa.descricao));
                            data.push(grupoDespesa.acumulado);
                            valorAcumulado += grupoDespesa.acumulado;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado grupos despesas : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "reservas") {
                    AcumuladoService.buscarReservas().success(function (reservas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < reservas.length; i++) {
                            var reserva = reservas[i];
                            var descricao = reserva.valor < 0 ? "Retirada " : "Reserva " + $filter('date')(reserva.dataReserva, 'dd-MM-yyyy');
                            labels.push(LabelGraficoGenerator.reservas(reserva.codigo, descricao));
                            data.push(parseFloat(reserva.valor.toFixed(2)));
                            valorAcumulado += parseFloat(reserva.valor.toFixed(2));
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado reservas : " + $filter('currency')(valorAcumulado);
                    });
                }
                break;
            case "grupo":
                // sempre será despesas
                // item.id pega o id do grupo que entrou
                AcumuladoService.buscarTiposDespesas(item.id).success(function (tiposDespesas) {
                    var labels = [];
                    var data = [];
                    var valorAcumulado = 0;
                    for (var i = 0; i < tiposDespesas.length; i++) {
                        var tipoDespesa = tiposDespesas[i];
                        labels.push(LabelGraficoGenerator.tipoDespesa(item.id, tipoDespesa.codigo, tipoDespesa.descricao));
                        data.push(tipoDespesa.acumulado);
                        valorAcumulado += tipoDespesa.acumulado;
                    }
                    $scope.labels = labels;
                    $scope.data = data;
                    $scope.valorAcumulado = "Acumulado tipos despesas do grupo " + item.label + " : " + $filter('currency')(valorAcumulado);
                });
                break;
            case "tipo":
                // item.id pega o id do tipo que entrou
                if (item.tipo === "receitas") {
                    AcumuladoService.buscarReceitas(item.id).success(function (receitas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < receitas.length; i++) {
                            var receita = receitas[i];
                            labels.push(LabelGraficoGenerator.receitas(item.id, receita.codigo, receita.descricao));
                            data.push(receita.valorRecebido || receita.valorOriginal);
                            valorAcumulado += receita.valorRecebido || receita.valorOriginal;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado receitas do tipo " + item.label + " : " + $filter('currency')(valorAcumulado);
                    });
                } else if (item.tipo === "despesas") {
                    AcumuladoService.buscarDespesas(item.idDespesaGrupo, item.id).success(function (despesas) {
                        var labels = [];
                        var data = [];
                        var valorAcumulado = 0;
                        for (var i = 0; i < despesas.length; i++) {
                            var despesa = despesas[i];
                            labels.push(LabelGraficoGenerator.despesas(item.idDespesaGrupo, item.id, despesa.codigo, despesa.descricao));
                            data.push(despesa.valorPago || despesa.valorOriginal);
                            valorAcumulado += despesa.valorPago || despesa.valorOriginal;
                        }
                        $scope.labels = labels;
                        $scope.data = data;
                        $scope.valorAcumulado = "Acumulado despesas do tipo " + item.label + " : " + $filter('currency')(valorAcumulado);
                    });
                }
                break;
            default:
                // nao fazer nada, vai entrar aqui quando for as despesas, as receitas e as reservas.
            }
        }
    }

    $scope.atualizarGrafico = function (points, event) {
        if (points.length > 0) {
            var item = points[0].label;
            atualizarGraficoDinamicamente(item);
        }
    };

    $scope.voltarUmNivel = function () {
        if (itensNavegados.length >= 2) {
            atualizarGraficoDinamicamente(itensNavegados[itensNavegados.length - 2]);
            itensNavegados = itensNavegados.slice(0, itensNavegados.length - 2);
        } else {
            atualizarGraficoDinamicamente("saldo");
        }
    };

};

module.exports = ['$scope',
                                    '$filter',
                                     'SaldoService',
                                     'AcumuladoService',
                                     'LabelGraficoGenerator',
                                     GraficoSaldoController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/saldo/graficoSaldoController.js","/app/saldo")
},{"+7ZJp0":31,"buffer":28}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var LabelGraficoGenerator = (function () {

    function toStringFn() {
        return this.label;
    }

    return {
        acumulado: function (tipo) {
            return {
                'nivel': "acumulado",
                'tipo': tipo,
                'label': "Acumulado " + tipo,
                'toString': toStringFn
            }
        },
        grupo: function (id, descricao) {
            return {
                'id': id,
                'nivel': "grupo",
                'tipo': "despesas",
                'label': descricao,
                'toString': toStringFn
            }
        },
        tipoReceita: function (id, descricao) {
            return {
                'id': id,
                'nivel': "tipo",
                'tipo': 'receitas',
                'label': descricao,
                'toString': toStringFn
            }
        },
        tipoDespesa : function (idDespesaGrupo, id, descricao){
            return {
                'id': id,
                'idDespesaGrupo' : idDespesaGrupo,
                'nivel': "tipo",
                'tipo': 'despesas',
                'label': descricao,
                'toString': toStringFn
            }
        },
        despesas: function (idDespesaGrupo, idDespesaTipo, id, descricao) {
            return {
                'id': id,
                'idDespesaGrupo' : idDespesaGrupo,
                'idDespesaTipo' : idDespesaTipo,
                'nivel': "despesas",
                'tipo': "despesas",
                'label': descricao,
                'toString': toStringFn
            }
        },
        receitas: function (idReceitaTipo, id, descricao) {
            return {
                'id': id,
                'idReceitaTipo' : idReceitaTipo,
                'nivel': "receitas",
                'tipo': "receitas",
                'label': descricao,
                'toString': toStringFn
            }
        },
        reservas : function(id, descricao){
            return {
                'id': id,
                'nivel': "reservas",
                'tipo': "reservas",
                'label': descricao,
                'toString': toStringFn
            }
        }
    };
});

module.exports = [LabelGraficoGenerator];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/saldo/labelGraficoGenerator.js","/app/saldo")
},{"+7ZJp0":31,"buffer":28}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var SaldoController = function ($scope, SaldoService) {
    'use strict';

    SaldoService.buscar().success(function (saldo) {
        $scope.saldo = saldo;
    });

    $scope.$on('atualizarSaldo', function () {
        SaldoService.atualizar().success(function (saldoAtualizado) {
            $scope.saldo = saldoAtualizado;
            $scope.$parent.$broadcast('saldoAtualizado', saldoAtualizado);
        });
    });

};

module.exports = ['$scope', 'SaldoService', SaldoController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/saldo/saldoController.js","/app/saldo")
},{"+7ZJp0":31,"buffer":28}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/saldo/saldoService.js","/app/saldo")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var AlterarSenhaController = function ($scope, $http, $location){
    'use strict';

    var tratadorDeErros = require("../../tratadorDeErros");

    $scope.atualizarSenha = function(antigaSenha, novaSenha){
          $http.post("/api/usuarios/sessao/senha", {
                "antigaSenha" : antigaSenha,
                "novaSenha" : novaSenha
          }).success(function (){
              swal({
                      title: "Senha  atualizada com sucesso!",
                      type : "success",
                      allowOutsideClick : true
              }, function (){
                  $location.path("/minha-conta");
                  $scope.$apply();
              });
          }).error(tratadorDeErros());
    };

};

module.exports = ['$scope', '$http', '$location',  AlterarSenhaController];

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/usuario/alterarSenhaController.js","/app/usuario")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/app/usuario/minhaContaController.js","/app/usuario")
},{"+7ZJp0":31,"../../tratadorDeErros":27,"buffer":28}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var myMoneyApp = angular.module("myMoneyApp", ['ngRoute', 'ui.bootstrap.datetimepicker', 'chart.js']);
myMoneyApp.config(require('./app/appRoute'));

/* controllers */
myMoneyApp.controller("SaldoController", require('./app/saldo/saldoController'));
myMoneyApp.controller("GraficoSaldoController", require('./app/saldo/graficoSaldoController'));
myMoneyApp.controller("MinhaContaController", require('./app/usuario/minhaContaController'));
myMoneyApp.controller("AlterarSenhaController", require('./app/usuario/alterarSenhaController'));
myMoneyApp.controller('TiposReceitasController', require('./app/receitas/tiposReceitasController'));
myMoneyApp.controller('GruposDespesasController', require('./app/despesas/gruposDespesasController'));
myMoneyApp.controller('TiposDespesasController', require('./app/despesas/tiposDespesasController'));
myMoneyApp.controller('ListagemReceitasController', require('./app/receitas/listagemReceitasController'));
myMoneyApp.controller('ReceitasController', require('./app/receitas/receitasController'));
myMoneyApp.controller('ListagemDespesasController', require('./app/despesas/listagemDespesasController'));
myMoneyApp.controller('DespesasController', require('./app/despesas/despesasController'));
myMoneyApp.controller('ReservasController', require('./app/reservas/reservasController'));
myMoneyApp.controller('ListagemReservasController', require('./app/reservas/listagemReservasController'));
myMoneyApp.controller("DespesasAPagarController", require('./app/despesas/despesasAPagarController'));

/* services */
myMoneyApp.factory("TiposReceitasService", require("./app/receitas/tiposReceitasService"));
myMoneyApp.factory("GruposDespesasService", require("./app/despesas/gruposDespesasService"));
myMoneyApp.factory("TiposDespesasService", require("./app/despesas/tiposDespesasService"));
myMoneyApp.factory("ReceitasService", require("./app/receitas/receitasService"));
myMoneyApp.factory("FormasPagamentoService", require("./app/formasPagamentoService"));
myMoneyApp.factory("DespesasService", require('./app/despesas/despesasService'));
myMoneyApp.factory("SaldoService", require('./app/saldo/saldoService'));
myMoneyApp.factory("AcumuladoService", require("./app/saldo/acumuladoService"));
myMoneyApp.factory("ReservasService", require('./app/reservas/reservasService'));


/* util */
myMoneyApp.factory("LabelGraficoGenerator", require('./app/saldo/labelGraficoGenerator'));

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_7ffe9b6a.js","/")
},{"+7ZJp0":31,"./app/appRoute":1,"./app/despesas/despesasAPagarController":2,"./app/despesas/despesasController":3,"./app/despesas/despesasService":4,"./app/despesas/gruposDespesasController":5,"./app/despesas/gruposDespesasService":6,"./app/despesas/listagemDespesasController":7,"./app/despesas/tiposDespesasController":8,"./app/despesas/tiposDespesasService":9,"./app/formasPagamentoService":10,"./app/receitas/listagemReceitasController":11,"./app/receitas/receitasController":12,"./app/receitas/receitasService":13,"./app/receitas/tiposReceitasController":14,"./app/receitas/tiposReceitasService":15,"./app/reservas/listagemReservasController":16,"./app/reservas/reservasController":17,"./app/reservas/reservasService":18,"./app/saldo/acumuladoService":19,"./app/saldo/graficoSaldoController":20,"./app/saldo/labelGraficoGenerator":21,"./app/saldo/saldoController":22,"./app/saldo/saldoService":23,"./app/usuario/alterarSenhaController":24,"./app/usuario/minhaContaController":25,"buffer":28}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var TratadorDeErros = function (depoisDeMostrarOErroFn){
    'use strict';

        function tratamentoDeErro(informacoesErro, status){
            if(estahAutenticado(status)){
                mostrarMensagemDeErro(informacoesErro.mensagem);
            }else{
                mostrarMensagemDeNaoAutenticado();
            }
        }

        function estahAutenticado(status){
            return status !== 401;
        }

        function mostrarMensagemDeErro(mensagem){
            swal({
                    title: "Oops...",
                    text : mensagem,
                    type : "error",
                    allowOutsideClick : true
            },depoisDeMostrarOErroFn);
        }

        function mostrarMensagemDeNaoAutenticado(){
            setTimeout(function (){
                window.location = "/login";
            }, 3250);
            swal({
                title: "Você não está mais logado...",
                text : "Redirecionando para tela de login..",
                type : "error",
                showConfirmButton: false,
                timer: 3000
            });
        }

        return tratamentoDeErro;
};

module.exports = TratadorDeErros;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/tratadorDeErros.js","/")
},{"+7ZJp0":31,"buffer":28}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"+7ZJp0":31,"base64-js":29,"buffer":28,"ieee754":30}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"+7ZJp0":31,"buffer":28}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"+7ZJp0":31,"buffer":28}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
},{"+7ZJp0":31,"buffer":28}]},{},[26])