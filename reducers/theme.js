import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CHANGE_THEME,GET_USER } from '../actions/types';

const initialState = {
	appTheme: { colorprimary:'#2A3963',
    colorsecondary:'#0b2441',
    textlight:'#141c33',
    textdark:'#000000',
    background:'#F8F9FC',
    chatbackground:'#F2F9FF',
    },
    user:null,
	creditInquirySentimentTypes: null,
	otherFactorsSentimentTypes: null,
	recoTemplates: null,
};

const themereducer = (state = initialState, action) => {

	switch (action.type) {

		
        case CHANGE_THEME:
        //console.log('inside store',action.payload)
        //console.log('changing theme in store',action.payload)
		return {...state, appTheme:action.payload};

		case GET_USER:
        console.log('inside store',action.payload)
        //console.log('changing theme in store',action.payload)
		return {...state, user:action.payload};

		default:
			return state;
	}
};

export default themereducer;