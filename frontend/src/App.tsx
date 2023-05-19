import { useState } from 'react'
import './App.css'
import { MessageBox } from './components/MessageBox'

function App() {

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <div className="bg-gray-700 border border-gray-500 rounded-md p-2 w-full h-[600px]">
          <MessageBox />
        </div>  
        <input type="text" className="w-full p-2 rounded-md mt-4" placeholder="Type here..." />
      </div>
    </div>
  )
}

export default App
