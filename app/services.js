'use strict';

/* Services */
var myServices = angular.module('myServices', []);

myServices.factory('systemInfo', function(){
    return {
        data:{
            "status": 'inactive',
            "startupTime": '',
            "shutdownTime": ''
        },
        hasBeenExecuted: false
    }
});

myServices.factory('aircraftCriteria', function(){
    return {
        data:{
            "type": 'passenger',
            "size": 'large',
            "arrivalTime": '',
            "departureTime": '',
            "airline": '',
            "tailNum": '',
            "departurePriority": ''
        },
        historyDetails:{
            "controllerId": 0,
            "status": 'active'
        },
        hasBeenExecuted: false
    }
});

myServices.factory('acQueue', function(){
    return {
        queue:[]
        ,
        details:{
            totalActiveAircraft: 0,
            overallTotalAircraft: 0,
            status: 'active'
        },
        hasBeenExecuted: false
    }
});

myServices.factory('airTrafficDataFactory', ['$q', function($q){
    var service = {};

    service.addAirCraft = function(ac){
        var status = 'success';
        var airCraft = ac;

        console.log(this.getAircraftQueue());

        return airCraft;
    };

    service.getManager = function(){
        return {
            queue:[]
            ,
            details:{
                totalActiveAircraft: 0,
                overallTotalAircraft: 0,
                status: 'active'
            },
            hasBeenExecuted: false
        }
    };

    return service;
}]);

