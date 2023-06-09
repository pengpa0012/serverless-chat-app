import { useEffect, useRef, useState } from 'react'
import './App.css'
import { MessageBox } from './components/MessageBox'
import { useMutation, useQuery } from 'react-query'
import { API, Amplify, Auth, graphqlOperation } from 'aws-amplify'
import { createMessage, getAllMessages, getAllUsers, onCreateMessage } from './graphql/users'
import { useAtom } from 'jotai'
import { getAuthorizationToken } from './utilities/authConfig'
import { useNavigate } from 'react-router-dom'
import ScrollableFeed from 'react-scrollable-feed'
import { user } from './store'

Amplify.configure({ 
  Auth: {
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USERPOOL_ID,
    userPoolWebClientId: import.meta.env.VITE_WEB_CLIENT,
  },
  API: {
    graphql_headers: async () => ({
      Authorization: await getAuthorizationToken(),
    })
  },
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_ENDPOINT,
  aws_appsync_region: import.meta.env.VITE_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
});

function App() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<any[]>([])
  const input = useRef<any>()
  const [userInfo, setUserInfo] = useAtom(user) 
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then((result) => {
      setUserInfo(result)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])

  if(Object.values(userInfo).length == 0) navigate("/register")

  const { data, isLoading } = useQuery("user", async () => {
    const result = await API.graphql({query: getAllUsers}) as any
    return result.data.getAllUsers.filter((user: any) => user.username == userInfo?.username)
  }, {enabled: userInfo?.username ? true : false})

  useQuery("messages", async () => {
      const result = await API.graphql({query: getAllMessages}) as any
      return result.data.getAllMessages
    }, 
    { 
    onSuccess: (data) => {
      setMessages(data)
    }
  })

  const onSendMessage = useMutation({ 
    mutationFn: async (values: any) => {
      const result = await API.graphql({query: createMessage, variables: {input: values}}) as any
      return result.data.createMessage
    }
  })

  useEffect(() => {
    const sub = API.graphql(graphqlOperation(onCreateMessage))
    .subscribe({
      next: ({provider,value}: any) => {
        setMessages((prevMessages) => [...prevMessages, value.data.onCreateMessage])
      },
      error: (error: any) => console.warn(error)
    });
   
    return () => {
      sub.unsubscribe();
    }
  }, []) 

  const handleType = (e: any) => {
    const text = e.target.value
    if(e.key != "Enter" || !text || /^\s*$/.test(text)) return
    if(counter >= 10) {
      input.current.disabled = true
      setTimeout(() => {
        input.current.disabled = false
        setCounter(0)
      }, 10000)
    }
    setCounter(prev => prev + 1)

    onSendMessage.mutate({
      username: userInfo?.username,
      message: text
    })
    input.current.value = ""
  }


  const handleLogout = async () => {
    await Auth.signOut();
    setUserInfo({})
    navigate("/register")
  }

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-2xl">Hello {isLoading ? "Loading..." : data?.[0].username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="bg-gray-700 border border-gray-500 rounded-md px-2 w-full h-[600px] overflow-hidden">
          <ScrollableFeed>
            {
              messages?.sort((a,b) => a.date - b.date).map((message: any, i) => (
                <MessageBox message={message} key={`message-${i}`} isUser={message.username == userInfo?.username} />
              ))
            }
          </ScrollableFeed>
        </div>  
        <input type="text" className="w-full p-2 rounded-md mt-4 bg-[#3b3b3b] outline-none disabled:cursor-not-allowed disabled:bg-[#7e7e7e]" placeholder="Type here..." ref={input} onKeyDown={handleType} />
      </div>
    </div>
  )
}

export default App
