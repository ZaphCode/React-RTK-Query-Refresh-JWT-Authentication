import React, { SyntheticEvent, useState } from "react";
import { useSignUpMutation } from "../api";

const Signup = () => {
  const [signUpMutation, { isError, error, data }] = useSignUpMutation();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [password, setPassword] = useState("")

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault()
  }
  return (
    <form>
      <h1>Sign up</h1>
      <div>
        <input value={username} className="bg-neutral-900 p-3 m-3" type="text" />
      </div>
      <div>
        <input className="bg-neutral-900 p-3 m-3" type="email" />
      </div>
      <div>
        <input className="bg-neutral-900 p-3 m-3" type="password" />
      </div>
      <div>
        <input className="bg-neutral-900 p-3 m-3" type="number" />
      </div>
    </form>
  );
};

export default Signup;
