'use strict';
const { TasksModel } = require('../schema/Task');

const updateTask = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { ...data } = JSON.parse(event.body);

    const result = await TasksModel.update({ id }, { ...data });
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
  updateTask
};
