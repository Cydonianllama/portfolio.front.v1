'use client'

import { useAppData } from "@/hooks/app/useAppData";
import { Step1 } from "./formStep1";
import { Step2 } from "./formStep2";
import { useOnboarding } from "./store";
import { useEffect } from "react";
import { Finalizing } from "./finalizing";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FinishOnboarding } from "./finish-onboarding.service";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type OnboardingScreenProps = {

}

const fade = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.25,
  },
};

export const OnboardingScreen = ({ }: OnboardingScreenProps) => {
  const appData = useAppData()
  const onboarding = useOnboarding()
  const router = useRouter()

  const FinishOnboardginAction = async () => {
    console.log('FinishOnboardginAction')
    try {
      onboarding.setStep({ finalizing: true })
      await FinishOnboarding({
        industry: onboarding.industry,
        nameWorkspace: onboarding.nameWorkspace,
        qtyTeam: onboarding.qtyTeam,
        rol: onboarding.rol,
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

  useEffect(() => {
    if (onboarding.step == 3) FinishOnboardginAction()
  }, [onboarding.step])

  return (
    <>
      {onboarding.step == 1 && (<>
        <div className="flex justify-center items-center h-200 px-150">
          <motion.div className="w-full" {...fade}>
            <Step1
              onFinishStep1={(data) => {
                onboarding.setStep1(data)
                onboarding.setStep({ step: 2 })
              }}
            />
          </motion.div>
        </div>
      </>)}
      {onboarding.step == 2 && (<>
        <div className="flex justify-center items-center h-200 px-150">
          <motion.div className="w-full" {...fade}>
            <Step2
              finishStep2={(data) => {
                onboarding.setStep2(data)
                onboarding.setStep({ step: 3 })
              }}
              handleBack={() => {
                onboarding.setStep({ step: 1 })
              }}
            />
          </motion.div>
        </div>
      </>)}
      {onboarding.step == 3 && (<>
        <div className="flex justify-center items-center h-screen w-screen px-150">
          <Finalizing />
        </div>
      </>)}


    </>
  )
}