import { CHANGE_THEME,GET_USER } from './types';

 const changeTheme = (data) => {
    //console.log('changing theme with:',data  )
  return (dispatch) => { 
	  dispatch({ type: CHANGE_THEME, payload: data })
	 };

};

const saveUser = (data) => {
  console.log('changing user with:',data  )
return (dispatch) => { 
  dispatch({ type: GET_USER, payload: data })
 };

};

export { changeTheme,saveUser };