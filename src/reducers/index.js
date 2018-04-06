import {combineReducers} from 'redux'
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    GET_CATEGORIES,
    GET_POSTS,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENT,
    ADD_COMMENT,
    ADD_COMMENT_TO_POST,
    DELETE_COMMENT_FROM_POST,
    EDIT_COMMENT
} from '../actions'

function categories(state = {}, action)
{
    switch(action.type)
    {
        case GET_CATEGORIES:
            const { categories } = action
            return categories
        default:
            return state;
    }
}

function comments(state = {}, action)
{
    const {id,timestamp,body,author,voteScore,deleted,parentId} = action
    switch(action.type)
    {
        case GET_COMMENTS:
            let {entities, result} = action.comments
            return {   
                        byId: entities.comments,
                        allIds: result
                    }
        case ADD_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] : {
                        id,
                        timestamp,
                        body,
                        author,
                        voteScore,
                        deleted,
                        parentId, 
                    }
                },
                allIds: [...state.allIds, id],
            }
        case UP_VOTE_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] :{
                        ...state.byId[id],
                        voteScore: state.byId[id].voteScore + 1
                    }
                }
            }
        case DOWN_VOTE_COMMENT:
        return {
            ...state,
            byId: {
                ...state.byId,
                [id] :{
                    ...state.byId[id],
                    voteScore: state.byId[id].voteScore - 1
                }
            }
        }
        case EDIT_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] :{
                        ...state.byId[id],
                        body: body
                    }
                }
            }
        case DELETE_COMMENT:
        return {
            ...state,
            byId: {
                ...state.byId,
                [id] :{
                    ...state.byId[id],
                    deleted: true
                }
            },
            allIds: state.allIds.filter(thisId => thisId !== id)
        }
        default:
            return state;
    }
}

function posts(state = {}, action)
{
    const {title,body,author,category,id,voteScore,deleted,timestamp,commentCount} = action
    switch(action.type)
    {
        case ADD_COMMENT_TO_POST:
        return {
            ...state,
            byId: {
                ...state.byId,
                [id] :{
                    ...state.byId[id],
                    commentCount: state.byId[id].commentCount + 1
                }
            }
        }
        case DELETE_COMMENT_FROM_POST:
        return {
            ...state,
            byId: {
                ...state.byId,
                [id] :{
                    ...state.byId[id],
                    commentCount: state.byId[id].commentCount - 1
                }
            }
        }
        case GET_POSTS:
            let {entities, result} = action.posts
            return {   
                        byId: entities.posts,
                        allIds: result
                    }
        case ADD_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] : {
                        id,
                        timestamp,
                        title,
                        body,
                        author,
                        category,
                        voteScore,
                        deleted,
                        commentCount, 
                    }
                },
                allIds: [...state.allIds, id]   
            }
        case EDIT_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] :{
                        ...state.byId[id],
                        title: title,
                        body: body
                    }
                }
            }
        case DELETE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] :{
                        ...state.byId[id],
                        deleted: true
                    }
                },
                allIds: state.allIds.filter(thisId => thisId !== id)
            }
        case UP_VOTE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id] :{
                        ...state.byId[id],
                        voteScore: state.byId[id].voteScore + 1
                    }
                }
            }
        case DOWN_VOTE_POST:
        return {
            ...state,
            byId: {
                ...state.byId,
                [id] :{
                    ...state.byId[id],
                    voteScore: state.byId[id].voteScore - 1
                }
            }
        }
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments,
})