import createStore from 'unistore';
import devtools from 'unistore/devtools';

function importAll(webpackContext) {
  const customImport = path => webpackContext(path);
  const paths = webpackContext.keys();
  return paths.reduce((acc, path) => {
    const reducersInModule = customImport(path);
    Object.assign(acc, reducersInModule);
    return acc;
  }, {});
}

/* Auto import all reducers in entities/.../reducer.js files */
const imports = importAll(
  require.context('./../entities/', true, /index\.js$/)
);

const importedActions = Object.entries(imports).reduce((result, [key, val]) => {
  // eslint-disable-next-line no-console
  if (result[key]) console.warn('Look like you have two action with same name:', key);
  if (typeof val === 'function') result[key] = val;
  return result;
}, {});

const initialState = {};
const store = process.env.NODE_ENV === 'production'
  ? createStore(initialState)
  : devtools(createStore(initialState));

export default store;

// eslint-disable-next-line no-unused-vars
const actions = store => ({ ...importedActions });
export { actions };


