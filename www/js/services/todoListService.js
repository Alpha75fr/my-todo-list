'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log, $localstorage) {

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


        var newElement = function (quantity, value) {
            return {id: id++, quantity: quantity, value: value};
        };

        var nextId = function () {
            return this.getTodos().length;
        };

        return {
            init: function () {
                $localstorage.setObject('todolist', todoList);
            }
            ,
            getTodos: function () {
                return $localstorage.getObject('todolist', 'valeur par défaut');
            }
            ,
            getTodo: function (id) {
                return this.getTodos()[id];
            }
            ,
            addElement: function (quantity, produit) {
                $log.debug("quantity : ", quantity, ", produit : ", produit);
                $log.debug("next id ", nextId());
                var element = newElement(quantity, produit);
                todoList.push(element);
            }
        };
    })
;