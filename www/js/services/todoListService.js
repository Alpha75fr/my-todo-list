'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log, $localstorage) {

        var myTodoList = null;
        var nextIndex = null;

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

        // fonctions locales
        var getElements = function() {
            return myTodoList;
        };

        var getElement = function (id) {
            var index = searchIndexOfElementById(id);
            return getElements()[index];
        };

        var addElement = function (quantity, produit) {
            var item = newItem(quantity, produit);
            myTodoList.push(item);
            setElements(myTodoList);
            $log.debug("new todoList", getElements());
        };

        var removeElementById = function (id) {
            var index = searchIndexOfElementById(id);
            myTodoList.splice(index, 1);
            setElements(myTodoList);
        };

        // fonctions utilitaires de la classe
        var init = function(defaultValue) {
            myTodoList = [];
            nextIndex = 0;

            if (!$localstorage.isEmpty('todolist')) {
                myTodoList = $localstorage.getObject('todolist');
                nextIndex = $localstorage.get("nextTodoId");
                $log.debug("$localstorage is not empty");
            } else if ($localstorage.isEmpty('todolist') && defaultValue) {
                myTodoList = defaultTodoList;
                nextIndex = myTodoList.length;
                setElements(myTodoList);
                $log.debug("$localstorage is empty and load defaultValue");
            } else {
                setElements(myTodoList);
                $log.debug("$localstorage is empty and load defaultValue");
            }
        };

        var setElements = function(list) {
            $localstorage.setObject('todolist', list);
            $localstorage.set("nextTodoId", nextIndex);
        };

        var newItem = function (quantity, value) {
            return {id: nextIndex++, quantity: quantity, value: value};
        };

        var searchIndexOfElementById = function (id) {
            var index = -1;
            for (var i = 0; i < getElements().length; i++) {
                if ( getElements()[i].id === parseInt(id)) {
                    index = i;
                    break;
                }
            }

            return index;
        };

        // fonctions visibles de l'exterieur
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