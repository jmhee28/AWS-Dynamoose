'use strict';


const { addPost, deletePosts,  getPostByID,
        getPostByIDs, getPosts, updatePost, getPagePosts,
        getPostsbyBoard, test } = require('./crud');

const { addBoard, updateBoard, getBoards } = require('./board');

module.exports.Posts = async event => {
    try {
        const { httpMethod, resource} = event;
        if (resource === '/posts' && httpMethod === 'GET') {
            return getPosts();
        } else if (resource === '/postsbyids' && httpMethod === 'GET') {
            return getPostByIDs(event);
        }  else if (resource == '/posts' && httpMethod == 'POST'){
            return addPost(event);
        } else if (resource == '/posts/{id}' && httpMethod == 'PUT'){
            return updatePost(event);
        } 
        else if (resource == '/posts/{id}' && httpMethod == 'GET'){
            return getPostByID(event);
        } 
        else if (resource == '/posts' && httpMethod == 'DELETE'){
            return deletePosts(event);
        }else if (resource == '/user' && httpMethod == 'POST'){
            return addUser(event);
        }else if (resource === '/page' && httpMethod === 'GET') {
            return getPagePosts(event);
        }else if (resource === '/addUser' && httpMethod === 'POST') {
            return addUser(event);
        }else if (resource === '/test' && httpMethod === 'GET') {
            return test(event);
        }else if(resource == '/boards' && httpMethod == 'POST'){
            return addBoard(event);
        }else if(resource == '/boards/{id}' && httpMethod == 'PUT'){
            return updateBoard(event);
        }else if(resource == '/boards' && httpMethod == 'GET'){
            return getBoards();
        }else if (resource == '/postsbyboard/{id}' && httpMethod === 'GET') {
            return getPostsbyBoard(event);
        }

    } catch (err) {
        console.log(err);
    }
}

