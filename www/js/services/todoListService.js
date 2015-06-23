'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log, $localstorage) {

        var myTodoList = null;

        // Some fake testing data
        var defaultTodoList = [
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

        var getElements = function() {
            return myTodoList;
        };

        var getElement = function (id) {
            var pos = searchIndexOfElementById(id);
            return getElements()[pos];
        };

        var addElement = function (quantity, produit) {
            var item = newItem(quantity, produit);
            myTodoList.push(item);
            setElements(myTodoList);
            $log.debug("new todoList", getElement());
        };

        var removeElementById = function (id) {
            var pos = searchIndexOfElementById(id);

            myTodoList.splice(pos, 1);
            setElements(myTodoList);
        };

        // functions utilitaires de la classe
        var init = function(defaultValue) {
            myTodoList = []
            if ($localstorage.isEmpty('todolist') && defaultValue) {
                myTodoList = defaultTodoList;
                $log.debug("defaultValue");
            } else if (!$localstorage.isEmpty('todolist')) {
                myTodoList = $localstorage.getObject('todolist');
                $log.debug("defaultValue else");
            }

            setElements(myTodoList);
        };

        var setElements = function(list) {
            $localstorage.setObject('todolist', list);
        };

        var newItem = function (quantity, value) {
            return {id: nextId(), quantity: quantity, value: value};
        };

        var searchIndexOfElementById = function (id) {
            var pos = -1;
            for (var i = 0; i < getElements().length; i++) {
                if ( getElements()[i].id === parseInt(id)) {
                    pos = i;
                    break;
                }
            }

            return pos;
        };

        var nextId = function () {
            return getElements().length;
        };

        return {
            init: function(defaultValue) {
                init(defaultValue);
            }
            ,
            getTodos: function() {
                return getElements();
            }
            ,
            getTodo: function (id) {
                return getElement(id);
            }
            ,
            addTodo: function (quantity, produit) {
                addElement(quantity, produit);
            },
            removeTodo: function(id) {
                removeElementById(id);
            }
        };
    })
;