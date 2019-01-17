import { UPDATE_ANSWER, ADD_ANSWER, DURATION, DELETE_SURVEY_DATA, UPDATE_ALLOWED_USER, SURVEYMATTER } from '../types.js';



export const changeSurveyMatter = (matter) => {
    return {
        type: SURVEYMATTER,
        matter
    }
}

export const updateAnswer = (id, content) => {
    return { type: UPDATE_ANSWER,
        id, 
        content
    }
}


export const addAnswer = (id) => {
    return { type: ADD_ANSWER,
        id
    }
}

export const changeDuration = (duration) => {
    return { type: DURATION,
        duration
        
    }
}

export const deleteSurveyData = () => {
    return {
        type: DELETE_SURVEY_DATA
    }
}

export const updateAllowedUser = (users) => {
    return {
        type: UPDATE_ALLOWED_USER,
        users
    }
}