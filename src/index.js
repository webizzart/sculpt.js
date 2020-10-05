import './index.pcss';
import  App from './pages/home';
import { defineComponent } from './sculpt/sculpt';
import Image from './components/Image/Image';
if (PRODUCTION) {
  require('offline-plugin/runtime').install();
}
//pages
[
  {Selector:`my-app`,Component:App}
]
.forEach((c=>defineComponent(c)));
//components
[
  {Selector:`image-app`,Component:Image}
]
.forEach((c=>defineComponent(c)));
