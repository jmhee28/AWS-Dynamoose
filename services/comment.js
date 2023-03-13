'use strict';

const { v4 } = require('uuid');
const { BoardsModel } = require('../schema/Board');


const addComment = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const { title, content, userid, upperid} = request;
        
        const result = await BoardsModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            categories:"Comment",
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
