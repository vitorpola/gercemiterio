angular.module('app', []).controller('cadTumuloController', function($scope) {
    $scope.cemiterios = [{id: "1", nome: "Sagrado Coração de Jesus", sigla: "SCJ"},
                         {id: "2", nome: "Santíssimo", sigla: "SAN"}];
                        
    $scope.quadras = [{id: "1", nome: "A"},
                      {id: "2", nome: "B"}];        
                                 
    $scope.tipos = [{id: "1", nome: "Simples"},
                    {id: "2", nome: "Com grade"},
                    {id: "3", nome: "Duplo"},
                    {id: "2", nome: "Triplo"}];    
                 
    var num = 1;
    $scope.falecidos = [{nome: "", nascimento: "", falecimento: ""}];      
    
    
    $scope.addFalecido = function () {
        $scope.falecidos.push({ 
            name: "",
            nascimento: "",
            falecimento: "",
        });
    };
    
    $scope.removeFalecido = function(fal) {
        var index = $scope.falecidos.indexOf(fal);
        $scope.falecidos.splice(index, 1);
        Materialize.toast("Falecido excluído" ,1000);  
    };
          
    $scope.cadastrar = function(tumulo) {
        Materialize.toast("Cadastro realizado com sucesso!" , 2000, "ok");  
        console.log("ID CEMITÉRIO: "+tumulo.cemiterio);
        console.log("ID QUADRA: "+tumulo.quadra);
        console.log("NÚMERO: "+tumulo.numero);
        console.log("ID TIPO: "+tumulo.tipo);
        console.log("FOTO: "+tumulo.foto);
        delete $scope.tumulo;
    }   
});