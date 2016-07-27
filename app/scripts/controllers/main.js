'use strict';

/**
 * @ngdoc function
 * @name cosechaPatronesClimaticosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cosechaPatronesClimaticosApp
 */
angular.module('cosechaPatronesClimaticosApp')
  .controller('MainCtrl', function () {
    var colors = {
            'environment':          '#edbd00',
            'campana':              '#367d85',
            'cluster':              '#97ba4c',
            'empresa':              '#f5662b',
            'estacion':             '#3f3e47'
          };
      d3.json("/data/product.json", function(error, json) {
        var chart = d3.select("#chart").append("svg").chart("Sankey.Path");
        chart
          .name(label)
          .colorNodes(function(name, node) {
            return color(node, 1) || colors.fallback;
          })
          .colorLinks(function(link) {
            return color(link.source, 4) || color(link.target, 1) || colors.fallback;
          })
          .nodeWidth(15)
          .nodePadding(10)
          .spread(true)
          .iterations(0)
          .draw(json);
        function label(node) {
          return node.name.replace(/\s*\(.*?\)$/, '');
        }
        function color(node, depth) {
          var id = node.id.replace(/(_score)?(_\d+)?$/, '');
          console.log(id);
          if(id.startsWith('campana'))
            id='campana';
          else if(id.startsWith('cluster'))
            id='cluster';
          else if(id.startsWith('empresa'))
            id='empresa';
          else if(id.startsWith('estacion'))
            id='estacion';

          if (colors[id]) {
            return colors[id];
          } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
            return color(node.targetLinks[0].source, depth-1);
          } else {
            return null;
          }
        }
      });
  });
