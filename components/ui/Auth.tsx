import { signup, signin, signout } from "@/app/actions/auth";
import { UserType } from "@/app/types/user";

export function SignupForm() {
  return (
    <form action={signup}>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" name="email" placeholder="email" />  
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}

export function SigninForm() {
  return (
    <form action={signin}>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" name="email" placeholder="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign in</button>
    </form>
  )
}

export function Profile({user}: {user: UserType}) {
  return (
    <form action={signout}>
      <div>
        <p>{user.email}</p>
      </div>
      <button type="submit">Sign out</button>
    </form>
  )
}