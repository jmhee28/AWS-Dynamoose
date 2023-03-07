'use strict';
const { TasksModel } = require('../schema/Task');

const  deleteTasks = async (event) => {
  try {
    const request = JSON.parse(event.body);
    const { id } = request;
    const result = await TasksModel.batchDelete(Object.values(id));//returns a promise that will resolve when the operation is complete, this promise will reject upon failure
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(error);
    return {
        statusCode: 404,
        body: error
    };
  }
};

module.exports = {
    deleteTasks
  };