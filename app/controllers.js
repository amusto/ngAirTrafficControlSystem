'use strict';

/* Controllers */
var myControllers = angular.module('myControllers', []);

myControllers.controller('controllerMainConsole', ["$scope", "$rootScope", "systemInfo", "airTrafficDataFactory", "acQueue", function ($scope, $rootScope, systemInfo, airTrafficDataFactory, acQueue){
    $rootScope.displayConsole = true;
    $rootScope.displayRegisterAircraft = false;
    $rootScope.mySystem = systemInfo.data;
    $scope.airTrafficManager = airTrafficDataFactory.getManager();
    $scope.aircraftStructure = {
        type: 'passenger',
        size: 'large',
        arrivalTime: '',
        departureTime: '',
        airline: '',
        tailNum: '',
        departurePriority: ''
    };
    $scope.currentQueue = $scope.airTrafficManager.queue;
    console.log($scope.currentQueue);

    $scope.pageTitle = "Main Control Panel";
    $scope.pageMessage = "Welcome to my Air Traffic Control System";


    $rootScope.aqm_request_process = (function() {

        /*var privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }*/

        return {
            systemBoot: function(command) {
                if(command=='on'){
                    $rootScope.displayConsole = true;
                    $rootScope.mySystem = {
                        "status" :'active',
                        "startupTime" : Date.now()
                    };
                }else if(command=='off'){
                    $rootScope.displayConsole = false;
                    $rootScope.mySystem = {
                        "status" :'inactive',
                        "shutdownTime" : Date.now()
                    };
                }
            },

            enQueueAircraft: function() {
                var aircraftObject = {
                    type: $scope.incomingAircraft.type,
                    size: $scope.incomingAircraft.size,
                    arrivalTime: $scope.incomingAircraft.arrivalTime,
                    departureTime: $scope.incomingAircraft.departureTime,
                    airline: '',
                    tailNum: '',
                    departurePriority: ''
                };
                $scope.airTrafficManager.queue.push(aircraftObject);
                $scope.airTrafficManager.details.totalActiveAircraft=++$scope.airTrafficManager.details.totalActiveAircraft;
                $scope.airTrafficManager.details.overallTotalAircraft=++$scope.airTrafficManager.details.overallTotalAircraft;
                $rootScope.displayRegisterAircraft = false;
                console.log($scope.airTrafficManager);
            },
            deQueueAircraft: function(index) {
                //add function here
                console.log(index);
                $scope.airTrafficManager.queue.splice(index, 1);
                $scope.airTrafficManager.details.totalActiveAircraft=--$scope.airTrafficManager.details.totalActiveAircraft;
            }
        };
    })();

    /*$scope.getCurrentQueue = function(){
        airTrafficDataFactory.getAircraftQueue()
            .then(function(data){
                $rootScope.currentQueue = data;
            })
    };
    $scope.getCurrentQueue();*/

    $scope.registerAircraft = function(){
        var newAircraft = $scope.aircraftStructure;
        console.log(newAircraft);
        newAircraft.arrivalTime = Date.now();
        $rootScope.incomingAircraft = newAircraft;
        console.log($rootScope.incomingAircraft);
        $rootScope.displayRegisterAircraft = true;
        console.log($rootScope.displayRegisterAircraft);


        //disable register button
    };

}]);
