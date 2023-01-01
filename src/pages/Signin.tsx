import { SyntheticEvent, useState } from "react";
import { useSignInMutation } from "../api";

const Signin = () => {
  const [email, setEmail] = useState("zaph@fapi.com");
  const [password, setPassword] = useState("menosfapi33")

  const [signInMutation, result] = useSignInMutation()

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault()

    await signInMutation({email, password})

    console.log(result);
  }
  
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div>
        <input value={email} onChange={e => setEmail(e.target.value)} className="bg-neutral-900 p-3 m-3" type="email" />
      </div>
      <div>
        <input value={password} onChange={e => setPassword(e.target.value)}className="bg-neutral-900 p-3 m-3" type="password" />
      </div>
      <button className="p-3 bg-red-300">submit</button>
    </form>
  )
};

export default Signin;
