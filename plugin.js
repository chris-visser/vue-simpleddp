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
      return api.sub(publicationName, ...args).ready();
    };

    Vue.prototype.find = function(collectionName) {
      const collection = api.collection(collectionName);

      return collection.fetch();
    };
  },
};
