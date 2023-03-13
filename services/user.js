'use strict';
const { UsersModel } = require('../schema/User');
const { v4 } = require('uuid');
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