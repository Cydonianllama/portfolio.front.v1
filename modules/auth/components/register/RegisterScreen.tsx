'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { SignupForm } from "./register-form";
import { RegisterSchema } from "../../schemas/register-form.schema";
import { RegisterUser } from "../../services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useInvite } from "@/modules/invite/store";
import { useAuthCydoStore } from "../../store/store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type RegisterScreenProps = {

}

export const RegisterScreen = ({ }: RegisterScreenProps) => {
  const inviteStore = useInvite()
  const useAppData = UseAppData()
  const router = useRouter()
  const authStore = useAuthCydoStore()

  const HandleRegister = async (data: RegisterSchema) => {
    console.log('HandleRegister')
    try {
      authStore.setState({ proccesingRegister: true })
      const req = await RegisterUser({
        email: data.email,
        password: data.password,
        fullname: data.fullname
      })

      if (!req) {
        toast.error('[Register error 1]')
        return;
      }

      if (!req?.status) {
        toast.error(req.message || '[Register error 2]')
        return;
      }

      if (req?.data.token) {
        toast.success('[Registro exitoso]')
        localStorage.setItem('token', req.data.token)
        Cookies.set("token", req.data.token);
        router.replace("/verify");
      }

    } catch (error) {

    } finally {
      authStore.setState({ proccesingRegister: false })
    }
  }

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm bg-gray-50">
          <SignupForm
            handleRegister={HandleRegister}
          />
        </div>
      </div>
    </>
  )
}