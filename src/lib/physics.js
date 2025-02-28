'use strict'

var createPhysics = require('voxel-physics-engine')
// var createPhysics = require('../../../../npm-modules/voxel-physics-engine')


export default function (noa, opts) {
    return makePhysics(noa, opts)
}


/**
 * @class Physics
 * @typicalname noa.physics
 * @classdesc Wrapper module for the physics engine. For docs see 
 * [andyhall/voxel-physics-engine](https://github.com/andyhall/voxel-physics-engine)
 */


var defaults = {
    gravity: [0, -10, 0],
    airDrag: 0.1,
}


function makePhysics(noa, opts) {
    opts = Object.assign({}, defaults, opts)
    var world = noa.world
    var blockGetter = function (x, y, z) { return world.getBlockSolidity(x, y, z) }
    var isFluidGetter = function (x, y, z) { return world.getBlockFluidity(x, y, z) }

    var physics = createPhysics(opts, blockGetter, isFluidGetter)

    return physics
}
