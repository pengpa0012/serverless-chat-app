import { useRef, useState } from "react"

export const Register = () => {
  const [tab, setTab] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const onChangeTab = (tab: number) => {
    setTab(tab)
    formRef.current!.reset()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-[#36393f] rounded-[30px] p-6 w-[350px] md:w-[500px] shadow-lg">
        <ul className="flex justify-around mb-4">
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 0 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => onChangeTab(0)}>Signup</li>
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 1 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => onChangeTab(1)}>Login</li>
        </ul>
        <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit} ref={formRef}>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">USERNAME</label>
            <input type="text" name="signup_username" className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">PASSWORD</label>
            <input type="password" name="signup_password" className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>
          {tab == 0 && <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">REPEAT PASSWORD</label>
            <input type="password" name="signup_repeat_password" className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>}
          {tab == 0 && <button type="submit" className="bg-[#7289d9]">Sign up</button>}
          {tab == 1 && <button type="submit" className="bg-[#7289d9]">Log in</button>}
        </form>
      </div>
    </div>
  )
}
