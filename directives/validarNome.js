angular.module("app").directive('validarNome',function(){
    return{
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            var capitalize = function(inputValue) {
                if(inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if(capitalized !== inputValue) {
                    ctrl.$setViewValue(capitalized);
                    ctrl.$render();
                }         
                return capitalized;
            }
            ctrl.$parsers.push(capitalize);
            capitalize(scope[attr.ngModel]);  
        }
    }   
});