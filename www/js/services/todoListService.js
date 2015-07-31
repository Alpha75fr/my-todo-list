'use strict';

angular.module('myTodoList')

    .factory('todoListService', function ($log, $localstorage, $q, jsonResourcesService) {

        var myTodoList = null;
        var nextIndex = null;
        var init = false;

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
        var getElements = function () {
            return myTodoList;
        };

        var getElement = function (id) {
            var index = searchIndexOfElementById(id);
            return myTodoList[index];
        };

        var addElement = function (quantity, produit, unity) {

            $log.debug("bip ", quantity);
            $log.debug("bip ", produit);
            $log.debug("bip ", unity);

            var item = newItem(quantity, produit, unity);
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


            // on initialise qu'une fois
            if (!init) {
                myTodoList = [];
                nextIndex = 0;

    /*            var datas = [];
                var object = jsonResourcesService.getJsonResources().get();
                $log.debug("getJsonResources ", object);

                jsonResourcesService.getJsonResources().get().$promise.then(
                    function (result) {
                        $log.debug("getJsonResources true", result.defaultTodoList);
                        datas = result;
                    }, function () {
                        $log.debug("getJsonResources false");
                    }
                );*/

                $log.debug("blabla");

                if (!$localstorage.isEmpty('todolist')) {
                    myTodoList = $localstorage.getObject('todolist');
                    nextIndex = $localstorage.get("nextTodoId");
                    $log.debug("$localstorage is not empty");
                } else if ($localstorage.isEmpty('todolist') && defaultValue) {
                    $log.debug("$localstorage is empty and load defaultValue");
                    $log.debug("myTodoList ", myTodoList);
                    myTodoList = defaultTodoList;
                    nextIndex = myTodoList.length;
                    setElements(myTodoList);
                    $log.debug("$localstorage is empty and load defaultValue");
                } else {
                    setElements(myTodoList);
                    $log.debug("$localstorage is empty");
                }

                // set init à true
                init = true;
            }
        };

        var setElements = function (list) {
            $localstorage.setObject('todolist', list);
            $localstorage.set("nextTodoId", nextIndex);
        };

        var newItem = function (quantity, value, unity) {
            quantity += " ";
            quantity += unity.value;

            return {id: nextIndex++, quantity: quantity, value: value};
        };

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
                // Creates a Deferred object
                var deferred = $q.defer();

                initElements(defaultValue);
                deferred.resolve(true);

                return deferred.promise;
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
            addTodo: function (element) {
                addElement(element.quantity, element.produit, element.unity);
                return getElements();
            },
            removeTodo: function (id) {
                removeElementById(id);

                $log.debug("----> removeElementById");
            }
        };
    })