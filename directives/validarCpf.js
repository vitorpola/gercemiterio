angular.module("app").directive('validarCpf',function(){
    return{
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            var _formatarCpf = function(cpf){
                if(typeof cpf == 'undefined'){
                    return cpf;
                }else{
                    cpf = cpf.replace(/[^0-9]+/g, "");
                    if(cpf.length > 3){cpf = cpf.substring(0,3) + "." + cpf.substring(3);} 
                    if(cpf.length > 7){cpf = cpf.substring(0,7) + "." + cpf.substring(7);}
                    if(cpf.length > 11){cpf = cpf.substring(0,11) + "-" + cpf.substring(11,13);}
                    return cpf;
                }
            }
                
            var _testaCpf = function (cpf) {
                cpf = cpf.replace(/[^0-9]+/g, "");
                var soma;
                var resto;
                soma = 0;
                if (cpf == "00000000000"){return false;}  
                for (i=1; i<=9; i++){soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);}
                resto = (soma * 10) % 11; 
                if ((resto == 10) || (resto == 11)){resto = 0;}
                if (resto != parseInt(cpf.substring(9, 10)) ){ return false; }
                soma = 0;
                for (i = 1; i <= 10; i++){ soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);}
                resto = (soma * 10) % 11;
                if ((resto == 10) || (resto == 11)) resto = 0;  
                if (resto != parseInt(cpf.substring(10, 11))) return false; 
                return true; 
            }
                     
            $(elem).bind('keyup', function() {
                ctrl.$setViewValue(_formatarCpf(ctrl.$viewValue));
                ctrl.$render();
                
                if(ctrl.$viewValue.length === 14){
                    if(!_testaCpf(ctrl.$viewValue)){
                        elem.addClass('invalid');
                        elem.parent().children('label').attr('data-error','CPF inválido');
                    }
                }else{
                     elem.removeClass('valid invalid');
                }
            });
            
            ctrl.$parsers.push(function (value){
                if(_testaCpf(ctrl.$viewValue)){
                    return value = value.replace(/[^0-9]+/g, "");
                }
            });
        }
    }   
});