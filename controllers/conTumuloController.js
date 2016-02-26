angular.module('app').controller('conTumuloController', function($scope) {
    $scope.tumulos = [
        {numero:'001',quadra: 'A', cemiterio: {id: "1", nome: "Sagrado Coração de Jesus"}, responsavel: 'Juca', falecido: 'Sebastião', situacao: 'Em dia'},
        {numero:'011',quadra: 'B', cemiterio: {id: "2", nome: "Santíssimo"}, responsavel: 'João', falecido: 'Sérgio', situacao: 'Devendo'},
        {numero:'021',quadra: 'A', cemiterio: {id: "1", nome: "Sagrado Coração de Jesus"}, responsavel: 'José', falecido: 'Silvia', situacao: 'Pendente'}
        ];
    $scope.cemiterios = [{id: "1", nome: "Sagrado Coração de Jesus"},
                        {id: "2", nome: "Santíssimo"}];
                        
    $scope.quadras = [{id: "1", nome: "A"},
                      {id: "2", nome: "B"}];        
                                     
    $scope.direcao= true;    
    $scope.ordenar = function(x) {
        $scope.ordenacao = x;
        $scope.direcao = !$scope.direcao;
    }
});