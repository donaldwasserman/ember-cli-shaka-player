/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fbTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-shaka-player',
  included() {
    this._super.included.apply(this, arguments);
    this.import({
      development: path.join('vendor', 'shaka-player.compiled.debug.js'),
      production: path.join('vendor', 'shaka-player.compiled.js'),
    });
  },
  treeForVendor(vendorTree) {
    this._super.treeForVendor.apply(this, arguments);
    var trees = [];
    var modulePath = path.join(path.dirname(require.resolve('shaka-player')));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      fbTransform(new Funnel(modulePath))
    );
    return mergeTrees(trees);
  }
};