import { UPDATE_ANSWER, ADD_ANSWER, DURATION } from "../types";

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