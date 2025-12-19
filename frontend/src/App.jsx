import {BrowserRouter,Switch, Route,  Redirect} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobCard from './components/JobCard'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobCard} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
