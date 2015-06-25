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
