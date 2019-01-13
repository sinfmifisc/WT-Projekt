import { SURVEYMATTER, ALLOWED_USER, UPDATE_ANSWER, ADD_ANSWER, DURATION} from "../types";

export default function surveycreation(state = {surveymatter: '', allowedUser: [], answers: [], duration: 0}, action){
	switch(action.type){
		case SURVEYMATTER:
				
			return Object.assign({}, state, {
				surveymatter: action.text
			  })
	
		case ALLOWED_USER: 

			return Object.assign({}, state, {
				allowedUser: action.user
			  })

		case ADD_ANSWER:

			  return Object.assign({}, state, {
				answers: [...state.answers, {id: action.id, content: ''}]
			  })
		
		case UPDATE_ANSWER:

			return Object.assign({}, state, {
				answers: state.answers.map((answers, id) => {
				  if (id === action.id) {
					return Object.assign({}, answers, {
					  content: action.content
					})
				  }
				  return answers
				})
			  })
				  
		case DURATION: 
			  
			  return Object.assign({}, state, {
				duration: action.duration
			  })

		default: return state;
	}
}
