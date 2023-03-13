'use strict';

const { v4 } = require('uuid');
const { BoardsModel } = require('../schema/Board');

const add = async (event) => {
    try {
        // console.log(event);
        const { categories } = event.pathParameters;
        const request = JSON.parse(event.body);
        
        const { title, content, userid, upperid} = request;
        
        const result = await BoardsModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            categories: categories,
            id: v4(),
            title,
            content,
            userid,
            upperid
        });
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

// get all posts
const getall = async (event) => {
    try {
        const { categories } = event.pathParameters;
        const result = await BoardsModel.query("categories").using("categoryIndex")
        .eq(categories).sort("descending").exec(); 
   
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

const getByID = async (event,categories) => {
    try {

      const { categories, id } = event.pathParameters;
      const result = await BoardsModel.get({ categories:"Post", id: id });

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

const update = async (event) => {
    try {
       const { categories, id } = event.pathParameters;
        const { ...data } = JSON.parse(event.body);

        const result = await BoardsModel.update({categories: categories, id }, { ...data });
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