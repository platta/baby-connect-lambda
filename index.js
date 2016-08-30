//------------------------------------------------------------------------------
// TODO - Change these values.

// Your AWS SQS Message Queue URL.
const QUEUE_URL = 'Your queue url';

/**
 * Modify the below to reflect the actions you want to be recorded for each type
 * of button press.
 * 
 * - SINGLE_ACTION - Action for a single button press.
 * - DOUBLE_ACTION - Action for a double button press.
 * - LONG_ACTION - Action for a long button press.
 * 
 * Each variable should be an object with the following properties:
 * 
 * - type - The type of data entry action.
 * - parameters - The parameters to pass to the data entry action.
 * 
 * Currently supported actions and their corresponding parameters are:
 * 
 * - diaper
 *      - child - Display name of the child to enter a diaper for.
 *      - time - Date and time of the diaper.
 *      - type - Type of diaper (wet, bm, bmWet, or dry).
 * - bottle
 *      - child - Display name of the child to enter a bottle for.
 *      - time - Date and time of the bottle.
 *      - amount - amount of liquid in the bottle (oz or ml depending on how you
 *        have Baby Connect set up).
 *      - type - Type of liquid in the bottle (milk, formula, water, or juice).
 */
const SINGLE_ACTION = {
    type: 'diaper',
    parameters: {
        child: 'Child Name',
        time: new Date(),
        type: 'wet'
    }
};

const DOUBLE_ACTION = {
    type: 'bottle',
    parameters: {
        child: 'Child Name',
        time: new Date(),
        amount: 1,
        type: 'formula'
    }
};

const LONG_ACTION = {
    type: 'diaper',
    parameters: {
        child: 'Child Name',
        time: new Date(),
        type: 'bmWet'
    }
};

// Do not modify below here.
//------------------------------------------------------------------------------

const AWS = require('aws-sdk');
const SQS = new AWS.SQS();

/**
 * Main Lambda entry point.
 * 
 * @param {Object} event
 *  Event details from whatever invoked this Lambda function.
 * 
 * @param {Object} context
 *  An object that exposes some Lambda specific functionality.
 * 
 * @param {(}function(Object, Object): void}
 *  A callback function to invoke when finished.
 */
function handler(event, context, callback) {
    // Determine which type of press and what type of diaper to log because of
    // it.
    var action = null;
    switch (event.clickType) {
        case 'SINGLE':
            action = SINGLE_ACTION
            break;
        
        case 'DOUBLE':
            action = DOUBLE_ACTION;
            break;

        case 'LONG':
            action = LONG_ACTION;
            break;
    }

    // Build the parameters object.
    var parameters = {
        MessageBody: JSON.stringify(action),
        QueueUrl: QUEUE_URL
    };

    // Send it off.
    SQS.sendMessage(parameters, callback);
}

module.exports.handler = handler;