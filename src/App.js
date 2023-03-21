import './App.css';
import Header from './Layout/Header/header';
import GeneralNavigation from './Layout/GeneralNavigation/general-navigation';
import Workspace from './Layout/Workspace/workspace';
import DeliveryPoints from './Workspaces/DeliveryPoints/delivery-points';

import Home from './Workspaces/Home/home';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <GeneralNavigation/>
        <Workspace>
          <Outlet/>
        </Workspace>
      </main>
    </div>
  );
}

export default App;
