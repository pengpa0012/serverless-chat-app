import { useEffect, useRef, useState } from 'react'
import './App.css'
import { MessageBox } from './components/MessageBox'
import { useQuery } from 'react-query'
import { API, Amplify, Auth } from 'aws-amplify'
import { getAllUsers } from './graphql/users'
import { useAtom } from 'jotai'
import { user } from './store'
import { getAuthorizationToken } from './utilities/authConfig'
import { useNavigate } from 'react-router-dom'

Amplify.configure({ 
  Auth: {
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USERPOOL_ID,
    userPoolWebClientId: import.meta.env.VITE_WEB_CLIENT,
  },
  API: {
    graphql_headers: async () => ({
      Authorization: await getAuthorizationToken(),
    }),
    graphql_endpoint: import.meta.env.VITE_ENDPOINT
  },
});

function App() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<any[]>([])
  const input = useRef<any>()
  const [userInfo, setUserInfo] = useAtom(user) 


  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then((result) => {
      setUserInfo(result)
    })
    .catch(console.error)
  }, []);

  const { data } = useQuery("user", async () => {
    const result = await API.graphql({query: getAllUsers}) as any
    return result.data.getAllUsers.filter((user: any) => user.username == userInfo.username)
  })

  const handleType = (e: any) => {
    const text = e.target.value
    if(e.key != "Enter" || !text || /^\s*$/.test(text)) return
    setMessages([...messages, text])
    input.current.value = ""
  }

  const handleLogout = async () => {
    await Auth.signOut();
    navigate("/register")
  }

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-2xl">Hello {data?.[0].username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
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
