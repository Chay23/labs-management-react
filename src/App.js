import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Registration from './containers/Registration/Registration';
import Profile from './containers/Profile/Profile';
import Subjects from './containers/Subjects/Subjects';
import Lectures from './containers/Lectures/Lectures';
import Lecture from './containers/Lectures/Lecture/Lecture';
import Assignments from './containers/Assignments/Assignments';
import Assignment from './containers/Assignments/Assignment/Assignment';
import CreateSubject from './containers/Subjects/CreateSubject/CreateSubject';
import EditSubject from './containers/Subjects/EditSubject/EditSubject';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/subjects' exact component={Subjects} />
        <Route path='/subjects/create' exact component={CreateSubject} />
        <Route
          path='/subjects/:subject_id/edit'
          exact
          component={EditSubject}
        />
        <Route
          path='/subjects/:subject_id/lectures'
          exact
          component={Lectures}
        />
        <Route
          path='/subjects/:subject_id/lectures/:lecture_id'
          exact
          component={Lecture}
        />
        <Route
          path='/subjects/:subject_id/assignments'
          exact
          component={Assignments}
        />
        <Route
          path='/subjects/:subject_id/assignments/:assignment_id'
          exact
          component={Assignment}
        />
        <Redirect from='/' to='/login' />
      </Switch>
    </Layout>
  );
}

export default App;
