'use strict'

var vec3 = require('gl-vec3')


/**
 * 
 * 	Component holding entity's position, width, and height.
 *  By convention, "position" is the bottom center of the entity's AABB
 * 
 */


export default function (noa) {

    var hasWarned = false

    return {

        name: 'position',

        order: 60,

        state: {
            position: null,
            renderPosition: null,
            width: +0,
            height: +0,
            _extents: null,
            _extentsChanged: true,
        },


        onAdd: function (eid, state) {
            if (state.position) {
                if (!(state.position instanceof Float32Array) && !hasWarned) {
                    console.warn('Better to set entity positions as instances of "gl-vec3"!')
                    hasWarned = true
                }
            } else state.position = vec3.create()

            state.renderPosition = vec3.create()
            vec3.copy(state.renderPosition, state.position)

            state._extents = new Float32Array(6)
        },

        onRemove: null,



        system: function (dt, states) {
            states.forEach(state => {
                if (!state._extentsChanged) return
                updateExtents(state._extents, state.position, state.height, state.width)
                state._extentsChanged = false
            })
        },


    }
}


function updateExtents(ext, pos, height, width) {
    var hw = width / 2
    ext[0] = pos[0] - hw
    ext[1] = pos[1]
    ext[2] = pos[2] - hw
    ext[3] = pos[0] + hw
    ext[4] = pos[1] + height
    ext[5] = pos[2] + hw
}
