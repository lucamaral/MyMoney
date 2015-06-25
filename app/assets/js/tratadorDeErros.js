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
