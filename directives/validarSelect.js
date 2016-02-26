angular.module("app").directive('validarSelect',function(){
    return{
        link: function(scope, elem, attr, ctrl) {
            $(elem).bind('change', function() {
                var input = elem.parent().children('input');
                var label = elem.parent().children('label');
                elem.removeClass('valid invalid');
                
                if(!elem.hasClass('ng-empty')){
                    elem.addClass('valid');
                }else{
                    elem.addClass('invalid');
                    label.attr('data-error','Selecione uma opção');
                }
            });
        }
    }   
});