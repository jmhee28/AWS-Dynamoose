'use strict';

const { v4 } = require('uuid');
const { TasksModel } = require('../schema/Task');

const addTask = async (event) => {
  try {
    const request = JSON.parse(event.body);
    const { title, description } = request;

    const result = await TasksModel.create({//it returns a Item initializer that you can use to create instances of the given model.
      id: v4(),
      title, 
      description
    });

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
    addTask
};
  