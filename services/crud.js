'use strict';

const { v4 } = require('uuid');
const { BoardsModel } = require('../schema/Board');
const { UsersModel } = require('../schema/User');
// import { SortOrder } from 'dynamoose/dist/General';

const addPost = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const { title, content, userid, upperid} = request;
        
        const result = await BoardsModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            categories:"Post",
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
const getPosts = async (event) => {
    try {
        
        const result = await BoardsModel.query("categories").using("categoryIndex")
        .eq("Post").sort("descending").exec(); 
  
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

// get all posts by board id
const getPostsbyBoard = async (event) => {
    try {
        const { id } = event.pathParameters;
        console.log(id);
        const result = await BoardsModel.query("upperid").eq(id).sort("descending").exec();
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
//get post by one id
const getPostByID = async (event) => {
    try {
        const { id } = event.pathParameters;
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

        const result = await BoardsModel.update({categories:"Post", id }, { ...data });
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
        
        const cpp =  Number(countPerPage[0]);
        const pn = Number(pageNo[0]);
        console.log(cpp, pn);
        let arr =[]

        let afterQ = await BoardsModel.query("categories").eq("post").sort("descending").limit(cpp).exec();
        arr.push(afterQ);
        for(let i = 0; i < pn-1; i++ )
        {            
            if (afterQ.lastKey == undefined) { break; }
            afterQ = await BoardsModel.query("categories").eq("post").sort("descending").limit(cpp).exec();
            arr.push(afterQ);
        }

        const result = arr.slice(arr.length-cpp);
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
        // console.log(event);
        const result = await BoardsModel.query("categories").eq("post").where("title").contains("post").sort("descending").limit(100).exec();
        // const remais = await BoardsModel.query("upperid").eq("b5f36431-fe32-4bdd-a1e7-11e81db0ea9a").sort("descending").startAt(result.lastKey).exec();
        // const temp = await BoardsModel.query("upperid").eq("a871cc91-241d-4c41-8aec-b001780710c6").using("upperIdIndex").exec();
        // console.log(remais);
        // console.log(temp);
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
    addPost,
    deletePosts,
    getPostByID,
    getPostByIDs,
    getPosts,
    updatePost,
    getPagePosts,
    getPostsbyBoard,
    test
};