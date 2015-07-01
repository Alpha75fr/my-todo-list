'use strict';

angular.module('myTodoList')
    .factory('todoListResourcesService', function ($log, $localstorage, $q) {

        var myTodoList = null;
        var nextIndex = null;
        var init = false;

        // fonctions locales
        var getElements = function () {
            return myTodoList;
        };

        var getElement = function (id) {
            var index = searchIndexOfElementById(id);
            return myTodoList[index];
        };

        var addElement = function (quantity, produit) {
            var item = newItem(quantity, produit);
            myTodoList.push(item);
            setElements(myTodoList);
            $log.debug("addElement new todoList", getElements());
        };

        var removeElementById = function (id) {
            var index = searchIndexOfElementById(id);
            myTodoList.splice(index, 1);
            setElements(myTodoList);
            $log.debug("removeElement new todoList", getElements());
        };

        // fonctions utilitaires de la classe
        var initElements = function (defaultValue) {
            myTodoList = [];
            nextIndex = 0;
            $log.debug("initElements");

            if (!$localstorage.isEmpty('todolist')) {
                myTodoList = $localstorage.getObject('todolist');
                nextIndex = $localstorage.get("nextTodoId");
                $log.debug("$localstorage is not empty");
            } else if ($localstorage.isEmpty('todolist') && defaultValue) {

                getJsonResources().then(function () {
                getJsonResources().get(function (data) {
                    $log.debug("data", data);
                    $log.debug("data", data.defaultTodoList);
                    myTodoList = data.defaultTodoList;
                });
                });
/*
                    $log.debug("lecture getJsonResources");
//                    $log.debug("data", data.defaultTodoList);
                 //   myTodoList = data.defaultTodoList;
                });*/
                $log.debug("myTodoList", myTodoList);
                nextIndex = myTodoList.length;
                setElements(myTodoList);
                $log.debug("$localstorage is empty and load defaultValue");
            } else {
                setElements(myTodoList);
                $log.debug("$localstorage is empty");
            }
        };

        var setElements = function (list) {
            $localstorage.setObject('todolist', list);
            $localstorage.set("nextTodoId", nextIndex);
        };

        var newItem = function (quantity, value) {
            return {id: nextIndex++, quantity: quantity, value: value};
        };

        // Recherche l'index dans le tableau de l'element ayant l'id saisie
        var searchIndexOfElementById = function (id) {
            var index = -1;
            for (var i = 0; i < getElements().length; i++) {
                if (getElements()[i].id === parseInt(id)) {
                    index = i;
                    break;
                }
            }

            return index;
        };

        // fonctions visibles de l'exterieur
        return {
            // defaultValue = true pour charger les valeurs par défaut
            initDefaultValue: function (defaultValue) {

                if (!init) {
                    initElements(defaultValue);
                    init = true;
                    $log.debug("----> initElements", init, defaultValue);
                }
            }
            ,
            getTodos: function () {
                // Creates a Deferred object
                var deferred = $q.defer();

                // Resolve or reject the promise depending the argument
                if (myTodoList == null)
                    deferred.reject({});
                else
                    deferred.resolve(getElements());

                return deferred.promise;
            }
            ,
            getTodo: function (id) {
                return getElement(id);
            }
            ,
            addTodo: function (quantity, produit) {
                addElement(quantity, produit);
                return getElements();
            },
            removeTodo: function (id) {
                removeElementById(id);

                $log.debug("----> removeElementById");
            }
        };
    })