import {combineReducers} from 'redux';

// reducers
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';
// import configReducer from './config/config.reducer';
// import searchReducer from './search/search.reducer';
// import serviceReducer from './service/service.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  // config: configReducer,
  // search: searchReducer,
  // service: serviceReducer,
});

export default rootReducer;
