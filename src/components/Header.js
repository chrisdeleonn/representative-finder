import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

const Header = ({ user, setUser, userProfile, setUserProfile }) => {
  const logOut = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('user')
        setUser(undefined)
        setUserProfile(undefined)
      })
      .catch((err) => alert(err))
  }
  return (
    <div className='header'>
      <ul>
        <li className='menu-item header-title'>
          <Link to='/'>Representative Finder</Link>
        </li>
        {!user && (
          <li className='menu-item'>
            <Link to='/signup'>Sign Up</Link>
          </li>
        )}
        {!user && (
          <li className='menu-item'>
            <Link to='/signin'>Sign In</Link>
          </li>
        )}
        <li className='menu-item'>
          <Link to='/search'>Search</Link>
        </li>
        {user && userProfile && (
          <li className='menu-item'>
            <Link to='/user-profile'>User Profile</Link>
          </li>
        )}
        {user && (
          <li className='menu-item'>
            <a onClick={(e) => logOut(e)}>Log Out</a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header
