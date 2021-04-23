import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Registration from './containers/Registration/Registration';
import Profile from './containers/Profile/Profile';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/profile' exact component={Profile} />
        <Redirect from='/' to='/login' />
      </Switch>
    </Layout>
  );
}

export default App;
