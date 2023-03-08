'use strict';

const { v4 } = require('uuid');
const { addTask, deleteTasks, 
        getTaskByIDs, getTasks, updateTask } = require('../services/crud');

module.exports.Tasks = async event => {
    try {
        const { httpMethod, resource} = event;
        if (resource === '/tasks' && httpMethod === 'GET') {
            return getTasks();
        } else if (resource === '/tasksbyids' && httpMethod === 'GET') {
            return getTaskByIDs(event);
        } else if (resource == '/tasks' && httpMethod == 'POST'){
            return addTask(event);
        } else if (resource == '/tasks/{id}' && httpMethod == 'PUT'){
            return updateTask(event);
        } else if (resource == '/tasks' && httpMethod == 'DELETE'){
            return deleteTasks(event);
        }else if (resource == '/user' && httpMethod == 'POST'){
            return addUser(event);
        }
    } catch (err) {
        console.log(err);
    }
}