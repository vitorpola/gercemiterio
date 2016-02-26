angular.module('app').factory('dbService',function($http){
   
   var mensagemErro = function(data){
       Materialize.toast('Ops! Aconteceu um erro.<br>' + data , 3000, 'err');
   }
   
   var _buscarTipos = function(){
       return $http.get("http://localhost:3000/tipos").error(function (data, status) {mensagemErro(data)});
   };
   var _buscarCemiterios = function(){
       return $http.get("http://localhost:3000/cemiterios").error(function (data, status) {mensagemErro(data)});
   };
   var _buscarNumeros = function(idCemiterio, quadra){
       var url = "http://localhost:3000/numTumulos";
       
       if(typeof idCemiterio != 'undefined' && typeof quadra != 'undefined')
            url+="/cemiterio="+idCemiterio+"&quadra="+quadra;
       else if (typeof idCemiterio != 'undefined' )
            url+="/cemiterio="+idCemiterio;
       else if (typeof quadra != 'undefined')
            url+="/quadra="+quadra;
            
       return $http.get(url).error(function (data, status) {mensagemErro(data)});
   };
   var _buscarTitularPorCPF = function(cpf){
       return $http.get("http://localhost:3000/titular/cpf="+cpf).error(function (data, status) {mensagemErro(data)});
   }
   var _cadastrarTumulo = function(tumulo){
       return $http.post("http://localhost:3000/tumulos", tumulo).error(function (data, status) {mensagemErro(data)});
   }
   
   return {
       buscarTipos: _buscarTipos,
       buscarCemiterios: _buscarCemiterios,
       buscarNumeros: _buscarNumeros,
       buscarTitularPorCPF: _buscarTitularPorCPF,
       cadastrarTumulo: _cadastrarTumulo
   };
});