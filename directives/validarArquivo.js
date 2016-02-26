angular.module("app").directive('validarArquivo',function(){
    return{
        link: function(scope, elem, attr, ctrl) {
            $(elem).bind('change', function() {
                var label = $("#labelArquivo");
                label.removeClass('valid invalid');
                
                if(typeof this.files[0] != 'undefined'){
                    var arquivo = this.files[0];
                    var tipo = arquivo.type.split('/')[0];
                    
                    if(tipo != 'image'){
                            Materialize.toast("Formato Inválido!", 3000, "err");
                            label.addClass('invalid');
                    }else{
                            label.addClass('valid');
                    }
                }   
            });
        }
    }   
});