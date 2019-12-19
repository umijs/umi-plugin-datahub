(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global['umi-plugin-datahub'] = factory(global.React));
}(this, (function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var Test = function Test(props) {
    return React.createElement("div", null, "Plugin datahub");
  };

  var index = (function (api) {
    api.addPanel({
      title: 'DataHub',
      path: '/datahub',
      icon: React.createElement("img", {
        width: 16,
        height: 16,
        src: "https://macacajs.github.io/macaca-datahub/logo/logo-color.svg"
      }),
      component: Test
    });
  });

  return index;

})));
