import { LoginForm } from "./login-form"

export const LoginScreen = () => {
  return (<>
    <div className="w-full flex items-center h-full justify-center">
      <LoginForm className="max-w-sm w-full" />
    </div>
  </>)
}