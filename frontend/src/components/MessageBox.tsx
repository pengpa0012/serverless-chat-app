import dayjs from "dayjs"

export const MessageBox = ({message, isUser}: any) => {
  return (
    <div className={`flex items-center gap-2 mx-2 my-8 ${isUser && "flex-row-reverse"}`}>
      <div className="bg-gray-500 w-12 h-12 rounded-full grid place-items-center" title={message.username}>
        <h1 className="font-bold uppercase">{message.username.split("")[0]}</h1>
      </div>
      <div>
        <div className={`text-start p-2 mb-1 ${isUser ? "bg-green-500 ml-auto" : "bg-gray-500 mr-auto"} rounded-md min-w-[100px] max-w-[fit-content] break-all`}>
          <p className="text-[12px] text-white/80">{message.username}</p>
          <p>{message.message}</p>
        </div>
        <p className="text-start text-[12px] text-white/50">{dayjs(message.date).format("MMM DD - hh:mm a")}</p>
      </div>
    </div>
  )
}
