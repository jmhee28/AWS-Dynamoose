'use strict';
const { v4 } = require('uuid');
const { BoardsModel } = require('../schema/Board');


const addBoard = async (event) => {
    try {
        // console.log(event);
        const request = JSON.parse(event.body);
        
        const {title, userid } = request;
        
        const result = await BoardsModel.create({//it returns a Item initializer that you can use to create instances of the given model.
            categories: "Board",
            id: v4(),
            title,
            userid
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
const updateBoard = async (event) => {
    try {
        // console.log(event);
        const { id } = event.pathParameters;
        const { ...data } = JSON.parse(event.body);
        console.log(data.title);

        const result = await BoardsModel.update({ categories:"Board", id: id }, { ...data } );
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

const getBoards = async (event) => {
    try {
        const result = await BoardsModel.query("categories",{ indexName: 'categoryIndex' })
        .eq("Board").sort('descending').exec();
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
    addBoard,
    updateBoard,
    getBoards
};