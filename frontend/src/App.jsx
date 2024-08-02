import { useRoutes } from 'react-router-dom';
import { Login }from './login/Login'
import Signup from './signup/Signup';
import  Dashboard  from './dashboard/Dashboard';
import { RequireAuth } from './auth';

function App() {

  const routes = useRoutes([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/dashboard',
    element:<RequireAuth><Dashboard/></RequireAuth>
  }

]);

  return routes;
}

export default App;
