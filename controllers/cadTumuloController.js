angular.module('app', []).controller('cadTumuloController', function($scope) {
    
    function carregar() {
        $scope.cemiterios = [{id: "1", nome: "Sagrado Coração de Jesus"},
                         {id: "2", nome: "Santíssimo"}];
                                    
        $scope.tipos = [{id: "1", nome: "Simples"},
                        {id: "2", nome: "Com grade"},
                        {id: "3", nome: "Duplo"},
                        {id: "2", nome: "Triplo"}];    
        
        $scope.falecidos = [{nome: "", nascimento: "", falecimento: ""}];      
        $scope.titulares = [{id: "", cpf: "", nome: "", celular: "", telefone: "", email: "" },{id: "", cpf: "", nome: "", celular: "", telefone: "", email: "" }];      
    }
    
    carregar();
                 
    var num = 1;
    
    
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
    
    $scope.buscarTitular = function(cpf){
            
            if(cpf == "111.111.111-11"){
                Materialize.toast("Titular Encontrado" ,1000);  
                titular.nome = "Vitor Pola Baptista Coelho";
                titular.id = 1;
                titular.celular = "(12)99722-0224";
                titular.telefone = "(12)3671-2197";
                titular.email = "vitorpola@gmail.com";
            }else{
                Materialize.toast("Titular Não Encontrado" + cpf ,1000, "err");
                jQuery()  
            }
           
    }
          
    $scope.cadastrar = function(tumulo, titulares, falecidos) {
        Materialize.toast("Cadastro realizado com sucesso!" , 2000, "ok");  
        console.log("ID CEMITÉRIO: "+tumulo.cemiterio);
        console.log("ID QUADRA: "+tumulo.quadra);
        console.log("NÚMERO: "+tumulo.numero);
        console.log("ID TIPO: "+tumulo.tipo);
        var i;
        for(i=0; i < titulares.length; i++){
            console.log("TITULAR "+i+" :" + titulares[i].nome);
        }
        for(i=0; i < falecidos.length; i++){
            console.log("FALECIDO "+i+" :" + falecidos[i].nome);
        }
        delete $scope.tumulo;
        delete $scope.titulares;
        delete $scope.falecidos;
        carregar();
    }   
});