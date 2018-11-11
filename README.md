# Vue SimpleDDP

A simple plugin that uses [SimpleDDP](https://www.npmjs.com/package/simpleddp) to connect an external Vue app to Meteor's DDP system.

## Getting Started

Install the package:

```bash
npm install vue-simpleddp
 ```

Initialize the plugin in your Vue app like below:

```javascript
import Vue from 'vue';
import VueDDP from 'vue-simpleddp';

Vue.use(VueDDP);
```

Subscribe to data from one of your components like the example below:

```javascript
  export default {
    components: {
      Logo,
    },

    data() {
      return {
        articles: [],
      };
    },


    created() {
      (async () => {
        await this.$subscribe('articles').catch(console.error);

        this.articles = await this.find('articles');
      })();
    },
  };
```
## Options

You can pass additional options to the plugin to for example specify the endpoint. These options are 
passed down to the simpleddp package. 

```javascript
Vue.use(VueDDP, {
  endpoint: 'ws://localhost:3030/websocket',
});
```

Below are some example options. 

| Option | Default Value | Description |
| ---------- | --- | ----- |
| endpoint | ws://localhost:3030/websocket | The link to the DDP websocket endpoint (In Meteor its usually ws://{host}/websocket) |
| ws | ws | A constructor for the websocket library. vue-simpleddp uses isomorphic-ws by default to make it work on client and serverside |
| reconnectInterval | 5000 | The interval in which it tries to reconnect when disconnected from the server |

