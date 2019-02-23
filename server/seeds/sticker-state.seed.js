var models = require('../models');
var { GOT_STATE, REPEATED_STATE, MISSING_STATE , GOT_STATE_ID,REPEATED_STATE_ID, MISSING_STATE_ID} = require('../util/states.util');

const stickerStates = [
    {
        idStickerState: GOT_STATE_ID,
        stickerState: GOT_STATE

    },
    {
        idStickerState: REPEATED_STATE_ID,
        stickerState: REPEATED_STATE

    },
    {
        idStickerState: MISSING_STATE_ID,
        stickerState: MISSING_STATE

    },
]

module.exports = {
    stickerStates
}