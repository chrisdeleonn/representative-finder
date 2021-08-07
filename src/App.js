import firebase from 'firebase'
import { firebaseConfig } from './Config'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RepSearch from './components/RepSearch'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import './App.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const UserContext = createContext(undefined)

const App = () => {
  const [user, setUser] = useState(undefined)
  const [userProfile, setUserProfile] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(undefined)
    })
  })

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem('user')))
  }, [])

  useEffect(() => {
    if (user !== undefined) {
      fetch(`https://representative-finder-cdl-api.web.app/users/${user?.email}`)
        .then((response) => response.json())
        .then((json) => {
          setUserProfile(json.data)
          localStorage.setItem('user', JSON.stringify(json.data))
        })
        .catch((error) => alert(error))
    }
  }, [user])

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ userProfile }}>
          <Header user={user} userProfile={userProfile} setUser={setUser} setUserProfile={setUserProfile} />
          <div>
            <Switch>
              <Route path='/signin'>
                <SignIn setUser={setUser} />
              </Route>

              <Route path='/signup'>
                <SignUp setUser={setUser} />
              </Route>

              <Route path='/search'>{user ? <RepSearch user={user} /> : <SignIn setUser={setUser} />}</Route>

              <Route path='/user-profile'>
                <UserProfile user={user} userProfile={userProfile} setUserProfile={setUserProfile} />
              </Route>

              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>
  )
}

export default App
