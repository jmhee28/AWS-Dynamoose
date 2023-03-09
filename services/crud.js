'use strict';

const { v4 } = require('uuid');
const { TasksModel } = require('../schema/Task');

const addTask = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const { title, description, user, comments } = request;
        
        const result = await TasksModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            id: v4(),
            title,
            description,
            user,
            comments
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


const deleteTasks = async (event) => {
    try {
        const request = JSON.parse(event.body);
        const { id } = request;
        console.log(id);
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
// const getTaskByID = async (event) => {
//     try {
//         const { id } = event.pathParameters;
//         const result = await TasksModel.get({ id });
//         return {
//             statusCode: 200,
//             body: JSON.stringify(result),
//         };
//     } catch (error) {
//         return {
//             statusCode: 404,
//             body: error
//         };
//     }
// };

const getTaskByIDs = async (event) => {
    try {
      const ids = event.multiValueQueryStringParameters;
      const result = await TasksModel.batchGet(Object.values(ids.id));

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
const getTasks = async (event) => {
    try {
        const result = await TasksModel.scan().exec(); // will scan all items with no filters or options
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
    addTask,
    deleteTasks,
    getTaskByIDs,
    getTasks,
    updateTask,
};