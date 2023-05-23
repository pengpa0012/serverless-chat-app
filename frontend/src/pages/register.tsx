
export const Register = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-gray-700 rounded-md p-6">
        <ul className="flex">
          <li>Signup</li>
          <li>Login</li>
        </ul>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="username" className="p-2 outline-none rounded-md" />
          <input type="password" placeholder="password" className="p-2 outline-none rounded-md" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  )
}
