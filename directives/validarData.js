angular.module("app").directive('validarData',function(){
    return{
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            
            var _formatarData = function(data){
                if(typeof data != 'undefined'){
                    data = data.replace(/[^0-9]+/g, "");
                    if(data.length > 2){data = data.substring(0,2) + "/" + data.substring(2);} 
                    if(data.length > 5){data = data.substring(0,5) + "/" + data.substring(5,9);}
                    return data;
                }
            }
            
            var _testaData = function(data){
                var valor = data.split('/');
                var dia = valor[0];
                var mes = valor[1];
                var ano = valor[2];
                var anoAtual = (new Date).getFullYear();
                
                if(dia > 0 && dia < 32 && mes > 0 && mes <13 && ano > 1800 && ano < anoAtual){
                    return true;
                }else{
                    return false;
                }
            }
            
            $(elem).bind('keyup', function() {
                ctrl.$setViewValue(_formatarData(ctrl.$viewValue));
                ctrl.$render();
                
                if(typeof ctrl.$viewValue != 'undefined' && ctrl.$viewValue.length === 10){
                    elem.removeClass('valid invalid');
                    if(_testaData(ctrl.$viewValue)){
                        elem.addClass('valid');
                    }else{
                        elem.addClass('invalid');
                        elem.parent().children('label').attr('data-error','Data inválida');
                    }
                }
            });
            
             ctrl.$parsers.push(function (value){
                if(_testaData(ctrl.$viewValue)){
                    return value;
                }
            });
        }
    }   
});