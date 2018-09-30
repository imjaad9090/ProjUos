import { combineReducers } from 'redux';

import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import themereducer from './theme';

// const config = {
//     key: 'PeakPersistConfig',
//     whitelist: ['user'],
//     storage: AsyncStorage
// };

const reducer = combineReducers({
  theme: themereducer,
});

export default reducer;
