import { SURVEYMATTER, UPDATE_ALLOWED_USER, UPDATE_ANSWER, ADD_ANSWER, DURATION, DELETE_SURVEY_DATA, REMOVE_ANSWER} from '../types';

const initialState = {surveymatter: '', allowedUser: [], answers: [], duration: 0};

export default function surveycreation(state = initialState, action){
	switch(action.type){
		case SURVEYMATTER:
				
			return Object.assign({}, state, {
				surveymatter: action.matter
			  })
	
		case UPDATE_ALLOWED_USER: 

			return Object.assign({}, state, {
				allowedUser: action.users
			  })

		case ADD_ANSWER:

			  return Object.assign({}, state, {
				answers: [...state.answers, {id: action.id, content: ''}]
				})
				
		case REMOVE_ANSWER:
					
				return Object.assign({}, state, {
					answers: state.answers.filter(answer => answer.id !== Number(action.id))
					})
				
		
		case UPDATE_ANSWER:

			return Object.assign({}, state, {
				answers: state.answers.map((answer, id) => {
				  if (answer.id === action.id) {
					return Object.assign({}, answer, {
					  content: action.content
					})
				  }
				  return answer
				})
			  })
				  
		case DURATION: 
			  
			  return Object.assign({}, state, {
				duration: action.duration
				})
				
		case DELETE_SURVEY_DATA:
				
				return initialState

		default: return state;
	}
}
