import { FinishOnboarding } from "@/api/onboarding/finish-onboarding"
import { useOnboarding } from "./store"
import { useRouter } from "next/navigation";

export function useOnboardingActions() {
  const router = useRouter()
  const onboarding = useOnboarding()

  const finishOnboardingAction = async (data: { industry: string, nameWorkspace: string, qtyTeam: string, rol: string }) => {
    try {
      onboarding.setStep({ finalizing: true })
      await FinishOnboarding({
        industry: data.industry,
        nameWorkspace: data.nameWorkspace,
        qtyTeam: data.qtyTeam,
        rol: data.rol,
      })

      const timer = setTimeout(() => {
        onboarding.setStep({ finalizing: false })
        router.push('/home')
      }, 3200)

      clearTimeout(timer)

      router.push('/home')
    } catch (ex) {

    }
  }

  return {
    finishOnboardingAction
  }

}