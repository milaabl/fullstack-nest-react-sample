import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { AppStateType, rootReducer } from '../reducers/rootReducer';

export default function configureStore(preloadedState: AppStateType): Store {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}

export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
