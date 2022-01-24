import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/UserProvider';
import Navbar from './components/viewing/Navbar';
import Auth from './components/viewing/Auth';
import Profile from './components/commentPath/Profile';
import ThreadView from './components/issuePath/ThreadView'
import ProtectedRoute from './components/viewing/ProtectedRoute';

import './styles.css';

function App() {
  const {token, logout} = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout = {logout} />
      <Switch>
        <Route
          exact path = "/"
          render={()=> token ? <Redirect to="/profile" /> : <Auth /> }
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          redirectTo='/'
          token={token}
        />
        <Route
          path="/ThreadView"
          component={ThreadView}
        />
      </Switch>
    </div>
  )
}

export default App;
