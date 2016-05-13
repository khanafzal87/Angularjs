'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
function Paging($scope,itemFromAPI,$filter)
{
  $scope.sort = {       
                sortingOrder : 'patient_name',
                reverse : false
            };
  $scope.gap = 5;
  $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = itemFromAPI;
     var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size,start, end) {
        var ret = [];        
        console.log(size,start, end);
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         console.log(ret);        
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();


}
phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
phonecatControllers.controller('testCtrl',function($scope,Phone){
  $scope.phones = Phone.query();
    $scope.orderProp = 'age';
});
phonecatControllers.controller('testDetailCtrl', function($scope,Phone,$routeParams){
   $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
});
phonecatControllers.controller('meterCtrl',function($scope,Meter){

  $scope.meterData=Meter.query();
  });
phonecatControllers.controller('examCtrl',function($scope,Exam,$filter){
      $scope.orderByField = 'patient_name';
  $scope.reverseSort = false; 
  $scope.examData=Exam.query();

   
});

phonecatControllers.controller('exerciseCtrl',function($scope,Exercise){
 // $scope.exerciseData=Exercise.query();
  $scope.orderByField='patient_name';
  $scope.reverseSort=false;
  $scope.objects = Exercise.query();
// Paging($scope,$scope.exerciseData,$filter);
$scope.objects.$promise.then(function(){
    $scope.totalItems = $scope.objects.length;
  });
  //$scope.totalItems = $scope.objects.length;
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  
  $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.objects.indexOf(value);
    return (begin <= index && index < end);
  };
   

});
phonecatControllers.controller('patientCtrl',function($scope,Patient){
  $scope.patientData=Patient.query();
});
phonecatControllers.controller('patientLogCtrl',function($scope,$routeParams,PatientLog){
  //$scope.patientLogData=PatientLog.query();
  $scope.orderByField = 'patient_name';
  $scope.reverseSort = false; 
  $scope.module=$routeParams.logs;
  $scope.objects=PatientLog.query({logs: $routeParams.logs,meterid:$routeParams.meterid});
  $scope.objects.$promise.then(function(){
    $scope.totalItems = $scope.objects.length;
  });
  //$scope.totalItems = $scope.objects.length;
  $scope.currentPage = 1;
  $scope.numPerPage = 20;
  
  $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.objects.indexOf(value);
    return (begin <= index && index < end);
  };
   
});
phonecatControllers.controller('ngfnCtrl',function($scope){
  $scope.User1 = {};
  $scope.User2 = {};
  $scope.result;
  $scope.compare = function() {
    $scope.result = angular.equals($scope.User1, $scope.User2);
  };
});


