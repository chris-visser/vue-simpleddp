import SimpleDDP from 'simpleddp';
import ws from 'isomorphic-ws';

export default {
  install(Vue, options) {
    const api = new SimpleDDP({
      endpoint: 'ws://localhost:3030/websocket',
      SocketConstructor: ws,
      reconnectInterval: 5000,
      ...options,
    });

    Vue.prototype.api = api;

    (async () => {
      await api.connect();
      console.log('Connected to server');
    })();

    Vue.prototype.$subscribe = async (publicationName, ...args) => {
      return api.sub(publicationName, args).ready();
    };

    Vue.prototype.find = function(collectionName) {

      // temp solution but a reactive one, however we can't mutate this
      // should be changed as soon as simpleddp 1.2.0 come out
      if (!Array.isArray(api.collections[collectionName])) api.collections[collectionName] = [];

      return api.collections[collectionName];
    };
  },
};
