import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Example: only persist 'user' and 'settings' slices
  // blacklist: ['someTemporaryData'] // Example: don't persist 'someTemporaryData'
};

export default persistConfig;