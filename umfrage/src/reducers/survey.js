import { SURVEY } from "../types";

export default function user(state = {}, action = {} ){
	switch(action.type){
		case SURVEY:
			  return action.state;
		default: return state;
	}
}
