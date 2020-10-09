export class Store {
    static getState() {
      return 'static method has been called.';
    }
    static withStore(render){
    debugger
    }
    dispatch(){
        console.log(this.withStore)
    }
    createStore(){
        if(Store._proxy) {
            console.warn("store created already");
            return null;
        }
        const handler = {
            get: function (target, prop, receiver) {
              return target[prop];
            },
            set: (obj, prop, newval) => {
              // let oldval = obj[prop];
              obj[prop] = newval;
              console.log(`${this.nodeName} render from connectedcallback`)
                this.dispatch();
              // Indicate success
              return true;
            }
          };
        Store._proxy = new Proxy(Store._store, handler);
    }
    static _proxy = {}
    static _store = {}
  }