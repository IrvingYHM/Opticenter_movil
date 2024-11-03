import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './index.css'
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/** importaciones de componenetes */
import Menu from './components/Menu';
import IniciaSesion from './pages/IniciaSesión';
import Productos from './pages/Productos';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId='main-content'>
        <Menu />
        <IonRouterOutlet id='main-content'>
          <Redirect exact from='/' to="/Home" />
          <Route path="/Home" component={Home} exact />
          <Route path="/IniciaSesion" component={IniciaSesion} exact /> 
          <Route path="/Productos" component={Productos} exact />
          
{/*           <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
