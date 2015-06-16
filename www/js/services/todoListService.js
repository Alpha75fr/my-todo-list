'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log) {

        $log.debug("factory('todoListService')");
        var id = 5;

        // Some fake testing data
        var todoList = [
            //newElement('1 kg', 'Pomme'),
            {
            id: 0,
            quantity: '1 kg',
            value: 'Pomme'
        }, {
            id: 1,
            quantity: '2 kg',
            value: 'Orange'
        }, {
            id: 2,
            quantity: '5 kg',
            value: 'Pomme de terre'
        }, {
            id: 3,
            quantity: '1 kg',
            value: 'Sucre'
        }, {
            id: 4,
            quantity: '1 kg',
            value: 'Farine'
        }];

        var newElement = function(quantity, value) {
            return {id: id++, quantity: quantity, value: value};
        }

        return {
            getTodos: function () {
                $log.debug("getTodos");
                return todoList;
            },
            addElement: function(quantity, produit) {
				$log.debug("quantity : ", quantity, ", produit : ", produit);
				
                var element = newElement(quantity, produit);
                todoList.push(element);
            }
        };
    });