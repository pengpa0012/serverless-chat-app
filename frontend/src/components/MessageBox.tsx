
export const MessageBox = ({text, isUser}: any) => {
  return (
    <div className={`text-start p-2 ${isUser ? "bg-green-500 ml-auto" : "bg-gray-500 mr-auto"} rounded-md max-w-[fit-content] mb-2 break-all`}>
      <p>{text}</p>
    </div>
  )
}
