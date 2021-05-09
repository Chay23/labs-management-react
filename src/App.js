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
import CreateLecture from './containers/Lectures/CreateLecture/CreateLecture';
import EditLecture from './containers/Lectures/EditLecture/EditLecture';
import EditAssignment from './containers/Assignments/EditAssignment/EditAssignment';
import CreateAssignment from './containers/Assignments/CreateAssignment/CreateAssignment';
import Submissions from './containers/Submissions/Submissions';
import ProtectedRoute from './guards/ProtectedRoute';
import NotFound404 from './components/NotFound404/NotFound404';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/registration' exact component={Registration} />
        <ProtectedRoute path='/profile' exact component={Profile} />
        <ProtectedRoute path='/subjects' exact component={Subjects} />
        <ProtectedRoute
          path='/subjects/create'
          exact
          component={CreateSubject}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/edit'
          exact
          component={EditSubject}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/lectures'
          exact
          component={Lectures}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/lectures/create'
          exact
          component={CreateLecture}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/lectures/:lecture_id'
          exact
          component={Lecture}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/lectures/:lecture_id/edit'
          exact
          component={EditLecture}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/assignments'
          exact
          component={Assignments}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/assignments/create'
          exact
          component={CreateAssignment}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/assignments/:assignment_id'
          exact
          component={Assignment}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/assignments/:assignment_id/edit'
          exact
          component={EditAssignment}
        />
        <ProtectedRoute
          path='/subjects/:subject_id/assignments/:assignment_id/submissions/'
          exact
          component={Submissions}
        />
        <Redirect from='/' exact to='/login' />
        <Route component={NotFound404} />
      </Switch>
    </Layout>
  );
}

export default App;
