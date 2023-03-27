import React from 'react'
import Navbar from './components/Navbar'
import Books from './components/Books'
import BooksYear from './components/Books-year'
import Search from './components/Search'

function App() {
  return (
    <div>
      <Navbar/>
      <Search/>
      <Books/>
      <BooksYear/>
    </div>
  )
}

export default App