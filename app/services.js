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

myServices.factory('airTrafficDataFactory', ['$q', function($q){
    var service = {};

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

