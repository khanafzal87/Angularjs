'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
phonecatServices.factory('Meter',function($resource){
	return $resource('phones/meterData.json',{},{
		query: {method:'GET',params:{phoneId:'phones'}, isArray:true}
	});
});
phonecatServices.factory('Exam',function($resource){
	return $resource('phones/exam.json',{},{
		query: {method:'GET',params:{phoneId:'phones'}, isArray:true}
	});
});
phonecatServices.factory('Exercise',function($resource){
	return $resource('phones/exercise.json',{},{
		query:{method:'GET',isArray:true}
	});
});

phonecatServices.factory('Patient',function($resource){
		return $resource('http://api.development.mymeterlink.com/logs/patient?accessToken=Mm65pcwW',{},{
		//return $resource('http://api.mymeterlink.com/index.php/logs/patient?accessToken=svFgGLFD',{},{
		query:{method:'GET',isArray:true}
	});
});
phonecatServices.factory('PatientLog',function($resource){

return $resource('http://api.development.mymeterlink.com/logs/:logs/:meterid?accessToken=Mm65pcwW',{},{
	query:{method:'GET',isArray:true}
});
});
phonecatServices.factory('taginput',function($resource){
return $resource('phones/tag.json',{},{
	query:{method:'GET',isArray:true}
})
})