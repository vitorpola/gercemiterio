angular.module('app').controller('cadTumuloController', function($scope, dbService) {
        
    var carregarDados = function(){
        delete $scope.tumulo;
        delete $scope.titulares;
        delete $scope.falecidos;
        dbService.buscarTipos().success(function(data, status){ $scope.tipos = data; });
        dbService.buscarCemiterios().success(function(data, status){ $scope.cemiterios = data;});
        $scope.falecidos = [{}];      
        $scope.titulares = [{},{}];
        $('input').removeClass('valid');
        $('select').removeClass('valid');
    };
    
    carregarDados();
        
    $scope.verificaNumero = function(idCemiterio,quadra,numero){
        var numerosTumulo = [{}];
        $('#inputNumero').removeClass('valid invalid');
        
        //Busca no banco os numero já cadastrados e coloco no array numeros
        dbService.buscarNumeros(idCemiterio ,quadra).success(function(data, status){ 
            numerosTumulo = data;
            var flag = true;
            if(typeof numero != 'undefined'){
                //Verificar se numero digitado já existe no array numeros
                for(i=0;i<numerosTumulo.length;i++){
                    if(numerosTumulo[i].numero == numero){
                        flag = false;
                    }
                }
                if(flag  && numero > 0){
                    $('#inputNumero').addClass('valid');
                }else{
                    $('#inputNumero').addClass('invalid');
                    $('#labelNumero').attr('data-error','Indisponível');
                }
            }
        });
    };
    
    
    $scope.buscarTitular = function(titular,tumulo,index){
        var input = $("#cpf"+index);
        var dados = $(".titular"+index);
        input.removeClass('invalid valid');
        dados.removeClass('valid');
        if(typeof titular.cpf != 'undefined'){
            if($scope.titulares[0].cpf == $scope.titulares[1].cpf){
                input.addClass('invalid');
                $('#lbl_cpf'+index).attr('data-error','CPF já incluído');
            }else{
                dbService.buscarTitularPorCPF(titular.cpf).success(function(data, status){
                    if(typeof data[0]    != 'undefined'){
                        titular.idTitular = data[0].idTitular;
                        titular.nome = data[0].nome;
                        titular.telefone = data[0].telefone;
                        titular.celular = data[0].celular;
                        titular.email = data[0].email;
                        input.addClass('valid');
                        dados.addClass('valid');
                    }else{
                        input.addClass('invalid');
                        $('#lbl_cpf'+index).attr('data-error','Titular não encontrado');
                        Materialize.toast("Titular Não Encontrado <a class='btn waves-effect waves-light' href='cad_titular.html'>CADASTRAR</a>" , 6000, "err");
                    }
                });
            }
        }else{
            titular.nome = undefined;
            titular.telefone = undefined;
            titular.celular = undefined;
            titular.email = undefined;
        }
    };
    
    $scope.addFalecido = function () {
        $scope.falecidos.push({});
    };
    
    $scope.removeFalecido = function(fal) {
       $scope.falecidos.splice($scope.falecidos.indexOf(fal), 1);
    };
    
    $scope.verificaData = function (nascimento,falecimento, index) {
        var input = $('#dt_fal_'+index);      
        var label = input.parent().children('label');
        
        if(typeof nascimento != 'undefined'&& typeof falecimento != 'undefined'){
            var dtN = nascimento.split('/');
            var dtF = falecimento.split('/');       
            var nasc = new Date(dtN[2], dtN[1]-1, dtN[0]);
            var fal = new Date(dtF[2], dtF[1]-1, dtF[0]);
           
            if(fal < nasc){
                input.removeClass('valid');
                input.addClass('invalid');
                label.attr('data-error','Nascimento > falecimento');
            }
        }
        
    }
          
    $scope.cadastrarTumulo = function(tumulo, titulares, falecidos) {
        if($(':input').hasClass('invalid')){
            Materialize.toast('Corrija as informação em vermelho para cadastrar.', 2000, 'err');
        }else{
            tumulo.falecidos = falecidos;
            tumulo.titulares = titulares;
            
            dbService.cadastrarTumulo(tumulo).success(function (data) {
                if(data){
                    Materialize.toast("Cadastro realizado com sucesso!" , 2000, "ok");  
                    carregarDados();   
                }else{
                    Materialize.toast("Ops, Aconteceu algum erro!" , 2000, "err");  
                }
            });
        }
    };   
    
});