'use strict';

const { v4 } = require('uuid');
const { addUser, addPost, deletePosts, 
        getPostByIDs, getPosts, updatePost, getPagePosts,test } = require('./crud');

module.exports.Posts = async event => {
    try {
        const { httpMethod, resource} = event;
        if (resource === '/posts' && httpMethod === 'GET') {
            return getPosts();
        } else if (resource === '/postsbyids' && httpMethod === 'GET') {
            return getPostByIDs(event);
        } else if (resource == '/posts' && httpMethod == 'POST'){
            return addPost(event);
        } else if (resource == '/posts/{id}' && httpMethod == 'PUT'){
            return updatePost(event);
        } else if (resource == '/posts' && httpMethod == 'DELETE'){
            return deletePosts(event);
        }else if (resource == '/user' && httpMethod == 'POST'){
            return addUser(event);
        }else if (resource === '/page' && httpMethod === 'GET') {
            return getPagePosts(event);
        }else if (resource === '/addUser' && httpMethod === 'POST') {
            return addUser(event);
        }else if (resource === '/test' && httpMethod === 'GET') {
            return test(event);
        }
    } catch (err) {
        console.log(err);
    }
}