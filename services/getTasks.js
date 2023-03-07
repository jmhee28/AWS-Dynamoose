'use strict';
const { TasksModel } = require('../schema/Task');

const getTasks = async (event) => {
    try {
        const result = await TasksModel.scan().exec();
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: error
        };
    }
};

module.exports = {
    getTasks
};