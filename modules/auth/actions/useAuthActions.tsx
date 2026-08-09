import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthCydoStore } from "../store/authStore"

import Cookies from "js-cookie";
import { useLogin } from "../store/loginStore";
import { ForgetPassword } from "@/api/auth/forgetpass";
import { ChangePassword } from "@/api/auth/changepass";
import { useForgetPass } from "../store/forgetPassStore";
import { RegisterUser } from "@/api/auth/register";
import { Login } from "@/api/auth/signin";
import { useInvite } from "@/modules/invite/store";
import { VerifyAccount } from "@/api/auth/verify";

export function useAuthActions() {
  const router = useRouter()
  const authStore = useAuthCydoStore()
  const loginStore = useLogin()
  const forgetPasswordStore = useForgetPass()
  const inviteStore = useInvite()

  const clearSession = () => {
    localStorage.removeItem('token')
    Cookies.set("token", '');
  }

  const signinAction = async (data: { email: string, password: string }) => {
    const req = await Login(data.email, data.password)
    if (req?.status) {

      if (!req.data) {
        toast.error('Error desconocido (1)')
        clearSession()
        return;
      }

      if (!req.data.token) {
        toast.error(req.message || 'Error desconocido (2)')
        clearSession()
        return;
      }

      toast.success('Login exitoso! ingresando a la app')

      localStorage.setItem('token', req.data.token)
      Cookies.set("token", req.data.token);

      router.replace("home");

    } else {
      toast.error(req?.message || 'Error desconocido (3)')

      clearSession()
    }
  }

  const registerAction = async (data: { email: string, password: string, fullname: string }) => {
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

  const forgetPasswordAction = async (data: { email: string }) => {
    loginStore.setState({ processing: true })

    try {
      const req = await ForgetPassword({ email: data.email })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      toast.success('Enviando información al correo ingresado')
    } catch (ex) {
    } finally {
      loginStore.setState({ processing: false, open: false })
    }
  }

  const changePasswordAction = async (data: { password: string }) => {
    try {
      forgetPasswordStore.setState({ changing: true })
      const reqChange = await ChangePassword({ password: data.password, validationCode: forgetPasswordStore.code })

      if (!reqChange) {
        toast.error('Error inesperado')
        return;
      }

      if (!reqChange.status) {
        toast.error(reqChange.message || '')
        return;
      }

      toast.success('Ingresar con su nueva contraseña')
      router.replace("login");
    } catch (error) {

    } finally {
      forgetPasswordStore.setState({ changing: false })
    }
  }

  const verifyAccountAction = async (data: { opt: string }) => {
    try {
      console.log('VerifyAccountAction')

      const reqVerify = await VerifyAccount({ opt: data.opt })

      if (!reqVerify) {
        toast.error('[Error 1]')
        return;
      }

      if (!reqVerify.status) {
        toast.error('[Error 2]')
        return;
      }

      if (reqVerify.data.token) {
        toast.success('[Cuenta exitosamente verificada]')
        localStorage.setItem('token', reqVerify.data.token)
        Cookies.set("token", reqVerify.data.token);

        if (inviteStore.invitationInformation) {
          // si hay invitacion redirigir en invite
          router.replace(`/invite?invitationId=${inviteStore.invitationInformation.invitation?.id}`);
        } else {
          // si no hay invitación redirigir home
          router.replace("home");
        }
      }

    } catch (ex) {

    } finally {

    }
  }

  return {
    signinAction,
    registerAction,
    forgetPasswordAction,
    changePasswordAction,
    verifyAccountAction
  }
}