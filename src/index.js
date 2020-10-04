import './index.pcss';
import  App from './components/my-app';
import { defineComponent } from './components/my-app/customElement';

if (PRODUCTION) {
  require('offline-plugin/runtime').install();
}

[{Selector:"my-app",Component:App}].forEach((c=>defineComponent(c)));

// customElements.define('my-app', MyApp);
