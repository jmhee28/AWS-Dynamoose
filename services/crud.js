'use strict';

const { v4 } = require('uuid');
const { BoardsModel } = require('../schema/Board');
const { UsersModel } = require('../schema/User');

const addUser = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const { email} = request;
        
        const result = await UsersModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            id: v4(),
            email
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
const addPost = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const { categories, title, content, userid, upperid} = request;
        
        const result = await BoardsModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            categories,
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


const deletePosts = async (event) => {
    try {
        const request = JSON.parse(event.body);
        const { id } = request;
        console.log(id);
        const result = await BoardsModel.batchDelete(Object.values(id));//returns a promise that will resolve when the operation is complete, this promise will reject upon failure
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

const getPostByIDs = async (event) => {
    try {
      const ids = event.multiValueQueryStringParameters;
      const result = await BoardsModel.batchGet(Object.values(ids.id));

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

const updatePost = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { ...data } = JSON.parse(event.body);

        const result = await BoardsModel.update({ id }, { ...data });
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
const getPosts = async (event) => {
    try {
        const result = await BoardsModel.scan().exec(); // will scan all items with no filters or options
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

const getPagePosts = async (event) => {
    try {
        const { countPerPage, pageNo } = event.multiValueQueryStringParameters;
        console.log(countPerPage[0], pageNo);
        const cpp =  Number(countPerPage[0]);
        const pn = Number(pageNo);
        const result = await BoardsModel.scan().parallel(countPerPage).limit();
        console.log(result);
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
const test = async (event) => {
    try {
        console.log(event);
        const result = await BoardsModel.query("categories").eq("post").where("upperid").eq("2a2150fc-be64-46ce-bd7c-d428a52c5c1b").exec();
        console.log(result);
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
    addUser,
    addPost,
    deletePosts,
    getPostByIDs,
    getPosts,
    updatePost,
    getPagePosts,
    test
};