'use strict';
const { TasksModel } = require('../schema/Task');

const getTaskByIDs = async (event) => {
    try {
      const ids = event.multiValueQueryStringParameters;
      const id = Object.values(ids.id);
      let arr = [];
      for(let i in id){
        console.log(id[i]);
        arr.push(id[i]);
      }
     console.log(arr);
      
      const result = await TasksModel.batchGet(arr);
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
  getTaskByIDs
};