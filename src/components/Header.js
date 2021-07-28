import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

function Header({ setUser }) {
  const logOut = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signout()
      .then(() => setUser(undefined))
      .catch((error) => alert('error in log out'))
  }
  return (
    <div className='header'>
      <ul>
        <li className='menu-item header-title'>
          <Link to='/'>Representative Finder</Link>
        </li>
        <li className='menu-item'>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li className='menu-item'>
          <Link to='/signin'>Sign In</Link>
        </li>
        <li className='menu-item'>
          <Link to='/search'>Search</Link>
        </li>
        <li className='menu-item'>
          <Link to='/user-profile'>User Profile</Link>
        </li>
        <li className='menu-item'>
          <a onClick={(e) => logOut(e)}>Log Out</a>
        </li>
      </ul>
    </div>
  )
}

export default Header
