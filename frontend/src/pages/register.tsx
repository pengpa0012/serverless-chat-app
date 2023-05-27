import { useEffect, useRef, useState } from "react"
import { Amplify, Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



export const Register = () => {
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  

  const onChangeTab = (tab: number) => {
    setTab(tab)
    reset()
  }

  const onSubmit = async (values: any) => {
    const { username, password, repeat_password } = values
    if(!username || !password) return

    if(tab == 0) {
      if(password !== repeat_password) return alert("Password does not match!!")
      const params = {
        username,
        password
      }

      fetch(import.meta.env.VITE_REGISTER_URL, {
        method: "POST",
        body: JSON.stringify(params),
      })
      .then(res => res.json())
      .then(data => {
        reset()
        setTab(1)
      })
      .catch(console.error)

    } else {
      try {
        Auth.signIn(username, password)
        .then(user => {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            Auth.completeNewPassword(user, password)
          }
          navigate("/")
        })
      } catch (error) {
          console.error("ERROR ACCOUNT")
      }
    } 
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-[#36393f] rounded-[30px] p-6 w-[350px] md:w-[500px] shadow-lg">
        <ul className="flex justify-around mb-4">
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 0 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => onChangeTab(0)}>Signup</li>
          <li className={`hover:bg-white/10 w-full p-3 cursor-pointer ${tab == 1 && "font-bold border border-white border-r-0 border-l-0 border-t-0"}`} onClick={() => onChangeTab(1)}>Login</li>
        </ul>
        <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">USERNAME</label>
            <input type="text" {...register("username")}  className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">PASSWORD</label>
            <input type="password" {...register("password")} className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>
          {tab == 0 && <div className="flex flex-col items-start">
            <label className="mb-2 text-[#919296] text-xs font-semibold">REPEAT PASSWORD</label>
            <input type="password" {...register("repeat_password")} className="p-2 outline-none rounded-md bg-[#323338] w-full focus:outline-[#7289d9]" />
          </div>}
          {tab == 0 && <button type="submit" className="bg-[#7289d9] py-2 rounded-md">Sign up</button>}
          {tab == 1 && <button type="submit" className="bg-[#7289d9] py-2 rounded-md">Log in</button>}
        </form>
      </div>
    </div>
  )
}
