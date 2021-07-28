import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RepSearch from './components/RepSearch'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from './components/Home'
import './App.css'
import UserProfile from './components/UserProfile'

function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    if (user !== undefined) {
      fetch(`https://representative-finder-cdl-api.web.app/users${user?.email}`)
        .then((response) => response.json())
        .then((json) => console.log('user json -->', json))
        .catch((error) => alert(error))
    }
  }, [user])

  return (
    <Router>
      <div>
        <Header setUser={setUser} />
        <div>
          <Switch>
            <Route path='/signin'>
              <SignIn setUser={setUser} />
            </Route>
            <Route path='/signup'>
              <SignUp setUser={setUser} />
            </Route>
            <Route path='/search'>
              <RepSearch user={user} />
            </Route>
            <Route path='/user-profile'>
              <UserProfile user={user} />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
