'use strict';

/* Controllers */
var myControllers = angular.module('myControllers', []);

myControllers.controller('controllerMainConsole', ["$scope", "$rootScope", "systemInfo", "airTrafficDataFactory", function ($scope, $rootScope, systemInfo, airTrafficDataFactory){
    $rootScope.displayConsole = false;
    $rootScope.displayRegisterAircraft = false;
    $rootScope.mySystem = systemInfo.data;
    $scope.airTrafficManager = airTrafficDataFactory.getManager();
    $scope.aircraftStructure = {
        type: 'passenger',
        size: 'large',
        arrivalTime: ''
    };
    $scope.currentQueue = $scope.airTrafficManager.queue; //Change this to master Queue
    $scope.currentArrivalQueue = [];

    $scope.pageTitle = "Main Control Panel";
    $scope.pageMessage = "Welcome to my Air Traffic Control System";

    //aqm_request_process
    $rootScope.aqm_request_process = (function() {

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
                    arrivalTime: Date.now(),
                    departureTime: ''
                };
                $scope.currentArrivalQueue.push(aircraftObject);
                console.log($scope.currentArrivalQueue);
                $scope.airTrafficManager.queue.push(aircraftObject);
                //update totals
                $scope.airTrafficManager.details.totalActiveAircraft=++$scope.airTrafficManager.details.totalActiveAircraft;
                $scope.airTrafficManager.details.overallTotalAircraft=++$scope.airTrafficManager.details.overallTotalAircraft;
                //$scope.processQueue = $scope.airTrafficManager.queue;

                //var thisQueue = $scope.processQueue;
                $scope.airTrafficManager.queue.sort(function(a, b){
                    var typeA=a.type.toLowerCase(), typeB=b.type.toLowerCase()
                    var sizeA=a.size.toLowerCase(), sizeB=b.size.toLowerCase()
                    var arrivalTimeA=a.arrivalTime, arrivalTimeB=b.arrivalTime
                    if (typeA == 'passenger' && typeB == 'cargo') //sort string ascending
                        return -1
                    if (typeA == 'cargo' && typeB == 'passenger') //sort string ascending
                        return 1
                    if((typeA == 'passenger' && typeB == 'passenger') && (sizeA == 'large' && sizeB == 'small')) //sort string ascending
                        return -1
                    if((typeA == 'passenger' && typeB == 'passenger') && (sizeA == 'small' && sizeB == 'large')) //sort string ascending
                        return 1
                    if((typeA == 'cargo' && typeB == 'cargo') && (sizeA == 'large' && sizeB == 'small')) //sort string ascending
                        return -1
                    if((typeA == 'cargo' && typeB == 'cargo') && (sizeA == 'small' && sizeB == 'large')) //sort string ascending
                        return 1
                    if((typeA == 'passenger' && typeB == 'passenger') && (arrivalTimeA > arrivalTimeB)) //sort string ascending
                        return -1
                    if((typeA == 'passenger' && typeB == 'passenger') && (arrivalTimeB > arrivalTimeA)) //sort string ascending
                        return 1
                    if((typeA == 'cargo' && typeB == 'cargo') && (arrivalTimeA > arrivalTimeB)) //sort string ascending
                        return -1
                    if((typeA == 'cargo' && typeB == 'cargo') && (arrivalTimeB > arrivalTimeA)) //sort string ascending
                        return 1

                    return 0 //default return value (no sorting)
                })


            },
            deQueueAircraft: function(index) {
                $scope.airTrafficManager.queue.splice(index, 1);
                $scope.airTrafficManager.details.totalActiveAircraft=--$scope.airTrafficManager.details.totalActiveAircraft;
            }
        };
    })();

    $scope.registerAircraft = function(){
        var newAircraft = $scope.aircraftStructure;
        newAircraft.arrivalTime = Date.now();
        $rootScope.incomingAircraft = newAircraft;
        $rootScope.displayRegisterAircraft = true;
    };

}]);


