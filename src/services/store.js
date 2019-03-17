import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

function importAll(webpackContext) {
  const customImport = path => webpackContext(path);
  const paths = webpackContext.keys();
  return paths.reduce((acc, path) => {
    const reducersInModule = customImport(path);
    Object.assign(acc, reducersInModule)
    return acc;
  }, {});
}

/* Auto import all reducers in entities/.../reducer.js files */
const entities = importAll(
  require.context('./../entities/', true, /reducer\.js$/)
);

/* Auto import all api in entities/.../api.js files */
const api = importAll(
  require.context('./../entities/', true, /api\.js$/)
);

const combinedReducers = combineReducers(entities);

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

export default store;
