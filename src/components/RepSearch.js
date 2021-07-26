import { useState } from 'react'

function RepSearch() {
  const [address, setAddress] = useState('') //first use of "stateHook"
  const searchRep = () => {
    console.log('searching...')
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
    </div>
  )
}

export default RepSearch
