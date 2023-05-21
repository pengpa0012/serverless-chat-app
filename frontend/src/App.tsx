import { useRef, useState } from 'react'
import './App.css'
import { MessageBox } from './components/MessageBox'

function App() {
  const [messages, setMessages] = useState<any[]>([])
  const input = useRef<any>()

  const handleType = (e: any) => {
    const text = e.target.value
    if(e.key != "Enter" || !text || /^\s*$/.test(text)) return
    setMessages([...messages, text])
    input.current.value = ""
  }

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <div className="bg-gray-700 border border-gray-500 rounded-md p-2 w-full h-[600px] overflow-y-scroll">
          {
            messages.map(message => (
              <MessageBox text={message} />
            ))
          }
        </div>  
        <input type="text" className="w-full p-2 rounded-md mt-4" placeholder="Type here..." ref={input} onKeyDown={handleType} />
      </div>
    </div>
  )
}

export default App
