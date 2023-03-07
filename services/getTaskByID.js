'use strict';
const { TasksModel } = require('../schema/Task');

const getTaskByID = async (event) => {
    try {
      const { id } = event.pathParameters;
      const result = await TasksModel.get({ id });
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
  getTaskByID
};