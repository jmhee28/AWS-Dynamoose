'use strict';
const { TasksModel } = require('../schema/Task');

const  deleteTask = async (event) => {
  try {
    const request = JSON.parse(event.body);
    const { id } = request;
    const result = await TasksModel.delete({ id });//returns a promise that will resolve when the operation is complete, this promise will reject upon failure
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
    deleteTask
  };