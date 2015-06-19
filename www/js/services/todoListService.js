'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log, $localstorage) {

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

        var init = function() {
            if ($localstorage.isEmpty('todolist')) {
                setTodo(todoList);
            } else {
                $log.debug("pas vide");
            }
        };

        var setTodo = function(list) {
            $localstorage.setObject('todolist', list);
        };

        var getTodos = function() {
            return $localstorage.getObject('todolist');
        };

        var newElement = function (quantity, value) {
            return {id: nextId(), quantity: quantity, value: value};
        };

        var nextId = function () {
            return getTodos().length;
        };

        return {
            init: function() {
                init();
            }
            ,
            getTodos: function() {
                return getTodos();
            }
            ,
            getTodo: function (id) {
                return this.getTodos()[id];
            }
            ,
            addElement: function (quantity, produit) {
                var element = newElement(quantity, produit);
                var oldList = getTodos();
                oldList.push(element);
                setTodo(oldList);
                $log.debug("new todoList", getTodos());
            }
        };
    })
;