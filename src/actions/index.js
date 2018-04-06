import * as API from '../API.js';
import {normalize} from "normalizr";
import {postSchema, commentSchema} from '../schemas';
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';
export const DELETE_COMMENT_FROM_POST = 'DELETE_COMMENT_FROM_POST';

//  ----------------- CATEGORIES -------------
function fetchCategories(){
    return API.getCategories()
}


function getCategoriesAction(categories){
    return {      
            type: GET_CATEGORIES,
            categories       
    }
}

export function receiveCategories(categories){
    return function(dispatch){
        return fetchCategories().then(
            categories => dispatch(getCategoriesAction(categories))
        )
    }
}

// ------------- POST ------------------------
function fetchPosts(){
    return API.getPosts()
}

function getPostsAction(posts){
    return {      
            type: GET_POSTS,
            posts      
    }
}
   
export function receivePosts(){
    return function(dispatch){
        return fetchPosts().then(
            posts => dispatch(getPostsAction( normalize(posts, [postSchema]) ))
        )
    }
}

function addPostApi({title,body,author,category,id,voteScore,deleted,timestamp,commentCount}){
    return API.addPost({title,body,author,category,id,voteScore,deleted,timestamp,commentCount})
}

function addPostAction({title,body,author,category,id,voteScore,deleted,timestamp,commentCount}){
    return {
        type: ADD_POST,
        title,
        body,
        author,
        category,
        id,
        voteScore,
        deleted,
        timestamp,
        commentCount,
    }
}

export function addPostStore(post){
    return function(dispatch){
        return addPostApi(post).then(
            res_post => dispatch(addPostAction(res_post))
        )
    }
}

function addCommentToPostAction(id)
{
    return {
        type: ADD_COMMENT_TO_POST,
        id
    }
}

export function addCommentToPostStore(id)
{
    return function(dispatch)
    {
        dispatch(addCommentToPostAction(id))
    }
}

function deleteCommentFromPostAction(id)
{
    return {
        type: DELETE_COMMENT_FROM_POST,
        id
    }
}

export function deleteCommentFromPostStore(id)
{
    return function(dispatch)
    {
        dispatch(deleteCommentFromPostAction(id))
    }
}

function editPostApi({title,body}, id){
    return API.editPost({title,body}, id)
}

function editPostAction({title,body}, id){
    return {
        type: EDIT_POST,
        title,
        body,
        id
    }
}

export function editPostStore(posts, id){
    return function(dispatch){
        return editPostApi(posts, id).then(
            res_post => dispatch(editPostAction(res_post, id))
        )
    }
}

function deletePostApi(id){
    return API.deletePost(id)
}

function deletePostAction(id){
    return{
        type: DELETE_POST,
        id
    }
}

export function deletePostStore(id){
    return function(dispatch){
        return deletePostApi(id).then(
            () => dispatch(deletePostAction(id))
        )
    }
}


//--------------- VOTE POST --------------------------------

function votePostApi(vote, id){
    return API.votePost(vote, id)
}

function upVotePostAction(id){
    return {
        type: UP_VOTE_POST,
        id
    }
}

function downVotePostAction(id){
    return {
        type: DOWN_VOTE_POST,
        id
    }
}

export function upVotePostStore(id){
    const vote = "upVote";
    return function(dispatch){
        return votePostApi(vote, id).then(
            vote => dispatch(upVotePostAction(id))
        )
    }
}

export function downVotePostStore(id){
    const vote = "downVote";
    return function(dispatch){
        return votePostApi(vote, id).then(
            vote => dispatch(downVotePostAction(id))
        )
    }
}

//--------------------- COMMENTS -----------------------------
function fetchComments(id){
    return API.getComments(id)
}

function getCommentsAction(comments){
    return {      
            type: GET_COMMENTS,
            comments      
    }
}
   
export function receiveComments(id){
    return function(dispatch){
        return fetchComments(id).then(
            comments => dispatch(getCommentsAction( normalize(comments, [commentSchema]) ))
        )
    }
}

function addCommentApi({body,author,id,voteScore,deleted,timestamp, parentId}){
    return API.addComment({body,author,id,voteScore,deleted,timestamp, parentId})
}

function addCommentAction({body,author,category,id,voteScore,deleted,timestamp, parentId}){
    return {
        type: ADD_COMMENT,
        body,
        author,
        category,
        id,
        voteScore,
        deleted,
        timestamp,
        parentId
    }
}

export function addCommentStore(comment){
    return function(dispatch){
        return addCommentApi(comment).then(
            res_comment => dispatch(addCommentAction(res_comment))
        )
    }
}

function deleteCommentApi(id){
    return API.deleteComment(id)
}

function deleteCommentAction(id){
    return{
        type: DELETE_COMMENT,
        id
    }
}

export function deleteCommentStore(id){
    return function(dispatch){
        return deleteCommentApi(id).then(
            () => dispatch(deleteCommentAction(id))
        )
    }
}

function editCommentApi({body}, id){
    return API.editComment({body}, id)
}

function editCommentAction({body}, id){
    return {
        type: EDIT_COMMENT,
        body,
        id
    }
}

export function editCommentStore(comment, id){
    return function(dispatch){
        return editCommentApi(comment, id).then(
            res_comment => dispatch(editCommentAction(res_comment, id))
        )
    }
}

// ---------------------- VOTE COMMENT ------------------------------------

function voteCommentApi(vote, id){
    return API.voteComment(vote, id)
}

function upVoteCommentAction(id){
    return {
        type: UP_VOTE_COMMENT,
        id
    }
}

function downVoteCommentAction(id){
    return {
        type: DOWN_VOTE_COMMENT,
        id
    }
}

export function upVoteCommentStore(id){
    const vote = "upVote";
    return function(dispatch){
        return voteCommentApi(vote, id).then(
            vote => dispatch(upVoteCommentAction(id))
        )
    }
}

export function downVoteCommentStore(id){
    const vote = "downVote";
    return function(dispatch){
        return voteCommentApi(vote, id).then(
            vote => dispatch(downVoteCommentAction(id))
        )
    }
}

