import { useState } from "react"

export const Register = () => {
  const [tab, setTab] = useState(0)
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-[#3b393e] rounded-[30px] p-6 w-[350px] md:w-[500px]">
        <ul className="flex justify-around mb-4">
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 0 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => setTab(0)}>Signup</li>
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 1 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => setTab(1)}>Login</li>
        </ul>
        <form className="flex flex-col gap-4 py-4">
          <input type="text" placeholder="username" className="p-2 outline-none rounded-md bg-[#5a5a5a]" />
          <input type="password" placeholder="password" className="p-2 outline-none rounded-md bg-[#5a5a5a]" />
          <button type="submit" className="bg-[#3862c6]">Sign up</button>
        </form>
      </div>
    </div>
  )
}
