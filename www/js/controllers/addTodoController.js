'use strict';

angular.module('myTodoList').controller('addTodoController',
    function ($log, $scope, todoListService, $state, $ionicActionSheet) {

        // Some fake testing data
        $scope.unities = [
            {
                id: 0,
                value: 'kg',
                label: 'Kilogramme'
            }, {
                id: 1,
                value: 'l',
                label: 'Litre'
            }, {
                id: 2,
                value: 'u',
                label: 'Unité'
            }];

        $scope.element = {
            quantity: null,
            produit: null,
            unity:  $scope.unities[0]
        };

        // Affiche une alerte si on ajoute un todo non renseigné
        $scope.alert = null;

        // Ajoute un todo
        $scope.addElement = function () {

            if ($scope.element.quantity == null || $scope.element.produit == null || $scope.element.unity == null) {
                $scope.alert = 'Veuillez renseigner les différents champs';

                return false;
            }
            else
            {
                todoListService.addTodo($scope.element);

                // Emet un evenement vers le haut pour avertir du changement de la table
                // $scope.$emit('todo:listChanged');

                // Le reload ne semble pas fonctionner
                $state.go('menu.todolist', {}, {reload: true});

                return true;
            }
        }

        // Triggered on a button click, or some other target
        $scope.onTouch = function () {

            // Show the action sheet
            $ionicActionSheet.show({
                titleText: 'ActionSheet Example',
                buttons: [
                    {text: '<i class="icon ion-plus-round"></i> Ajout'},
                    {text: '<i class="icon ion-arrow-left-c"></i> Back'}
                ],

                // L'affichage material design supprime le bouton Cancel et les styles
                // il faut commenter du code dans les css
                // destructiveText: 'Delete',
                // cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        $scope.addElement();
                    } else if (index == 1) {
                        $state.go('menu.todolist', {}, {reload: true});
                    }

                    console.log('BUTTON CLICKED', index);
                    return true;
                },
                destructiveButtonClicked: function () {
                    console.log('DESTRUCT');
                    return true;
                }
            });
        };
    })
