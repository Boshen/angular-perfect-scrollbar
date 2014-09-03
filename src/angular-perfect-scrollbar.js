/*!
 * angular-perfect-scrollbar
 * A small directive to allow the use of perfect-scrollbar (https://github.com/noraesae/perfect-scrollbar) in angular
 * This is a fork of https://github.com/itsdrewmiller/angular-perfect-scrollbar
 * By Boshen Chen
 * Copyright (c) 2012, 2014 Hyeonje Alex Jun, Drew, Miller, Boshen Chen and other contributors
 * Licensed under the MIT License
 */

angular.module('perfect_scrollbar', []).directive('perfectScrollbar', ['$parse', '$timeout', function($parse, $timeout) {
  var psOptions = [
    'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
    'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
    'scrollYMarginOffset', 'includePadding'
  ];

  return {
    restrict: 'E',
    transclude: true,
    template: '<div><div ng-transclude></div></div>',
    replace: true,
    link: function($scope, $elem, $attr) {
      var options = {};

      for (var i=0, l=psOptions.length; i<l; i++) {
        var opt = psOptions[i];
        if ($attr[opt] !== undefined) {
          options[opt] = $parse($attr[opt])();
        }
      }

      function update() {
        $scope.$evalAsync(function() {
          $elem.perfectScrollbar('update');
        });
      }

      $elem.perfectScrollbar(options);

      if ($attr.refreshOnChange) {
        $scope.$watchCollection($attr.refreshOnChange, function() {
          $timeout(function() {
            $elem.scrollTop(0);
            $elem.perfectScrollbar('update');
          });
        });
      }

      $elem.bind('mouseenter', function(){
        update();
      });

      $elem.bind('$destroy', function() {
        $elem.perfectScrollbar('destroy');
      });
    }
  };
}]);
