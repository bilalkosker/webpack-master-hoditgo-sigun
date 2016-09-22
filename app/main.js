import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );
import App from './App.js';
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import { render } from 'react-dom'
import IconButton from 'material-ui/lib/icon-button';
import AppBar from 'material-ui/lib/app-bar';
import AppCanvas from 'material-ui/lib/app-canvas';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';


import ToolBar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import About from './Pages/About'
import Dashboard from './Pages/Dashboard'  
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import auth from './auth'
import HomeScreen from './Pages/HomeScreen' 
import MyProfile from './components/MyProfile';
import AddInterview from './components/AddInterview';
import Interviews  from './components/Interviews';
  
function requireAuth(nextState, replace) {
   if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  } 
}
 
ReactDOM.render((
   <Router history={browserHistory}>
    <Route path="/" component={App} >
	<IndexRoute component={HomeScreen} /> 
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="about" component={About} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/> 
            <Route path="User" onEnter={requireAuth}>
              <IndexRoute component={MyProfile} type={"user"}  />
            </Route>
            <Route path="Interviewer" onEnter={requireAuth}>
            <IndexRoute component={MyProfile} type={"interviewer"} />
                <Route path="addInterview" component={AddInterview} />
                <Route path="interviews" component={Interviews} />
            </Route> 
    </Route> 
  </Router>
), document.getElementById('root')) 
