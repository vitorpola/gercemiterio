angular.module("app").directive('validarNumTumulo',function(){
    return{
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            
            var _formatarData = function(data){
                data = data.replace(/[^0-9]+/g, "");
                data = data.substring(0,3);
                return data;
            }
            
            $(elem).bind('keyup', function() {
                ctrl.$setViewValue(_formatarData(ctrl.$viewValue));
                ctrl.$render();
            });
            
            $(elem).bind('blur', function() {
                if(typeof ctrl.$viewValue != 'undefined'){
                    if(ctrl.$viewValue.length == 1)
                        ctrl.$setViewValue(_formatarData('00'+ctrl.$viewValue));
                    else if(ctrl.$viewValue.length == 2)
                        ctrl.$setViewValue(_formatarData('0'+ctrl.$viewValue));
                    ctrl.$render();
                }
            });
            
            ctrl.$parsers.push(function (value){
                if(ctrl.$viewValue.length === 3){
                    return value;
                }
            });
        }
        
    }   
});