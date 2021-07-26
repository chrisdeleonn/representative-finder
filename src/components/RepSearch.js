import { useState } from 'react'
import { APIKEY } from '../Config'
import RepSearchResults from './RepSearchResults'

function RepSearch() {
  const [address, setAddress] = useState('') //first use of "stateHook"
  const [offices, setOffices] = useState([])
  const [officials, setOfficials] = useState([])

  const searchRep = () => {
    console.log('searching...')
    fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&key=${APIKEY}`)
      // fetch for civic info endpoint
      .then((response) => response.json())
      .then((json) => {
        setOffices(json.offices)
        setOfficials(json.officials)
        return
      })
      .catch((error) => console.log(error))

    // then store results in my state
  }

  return (
    <div className='search-container'>
      <input
        name='addressSearch'
        type='text'
        className='search-bar'
        value={address}
        onChange={(e) => setAddress(e.target.value)} //e is for event
      />
      <div>
        <button className='search-btn' onClick={() => searchRep()}>
          Submit
        </button>
      </div>
      <RepSearchResults offices={offices} officials={officials} />
    </div>
  )
}

export default RepSearch
