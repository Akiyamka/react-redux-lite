import createStore from 'unistore';
import devtools from 'unistore/devtools';

const REDUCER_NAME_KEY = 'REDUCER';

function importAll(webpackContext) {
  const customImport = path => webpackContext(path);
  const paths = webpackContext.keys();
  return paths.reduce((acc, path) => {
    const { [REDUCER_NAME_KEY]: reducer, ...reducersInModule } = customImport(path);
    acc[REDUCER_NAME_KEY] = Object.assign(acc[REDUCER_NAME_KEY], reducer);
    Object.assign(acc, reducersInModule);
    return acc;
  }, {
    [REDUCER_NAME_KEY]: {}
  });
}

/* Auto import all reducers in entities/.../reducer.js files */
const imports = importAll(
  require.context('./../entities/', true, /index\.js$/)
);

const importedEntities = Object.entries(imports).reduce((result, [key, val]) => {
  // eslint-disable-next-line no-console
  if (result[key]) console.warn('Look like you have two action with same name:', key);
  if (typeof val === 'function') result[key] = val;
  return result;
}, {});

const initialState = imports[REDUCER_NAME_KEY];
const store = process.env.NODE_ENV === 'production'
  ? createStore(initialState)
  : devtools(createStore(initialState));

export default store;

// eslint-disable-next-line no-unused-vars
const actions = store => ({ ...importedEntities });
export { actions };

export function dispatch(action) {
  const boundedAction = store.action(action);
  return args => boundedAction(args);
}