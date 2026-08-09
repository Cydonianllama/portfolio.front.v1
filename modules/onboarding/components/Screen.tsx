'use client'

import { Step1 } from "./firstWorkspacConfiguration";
import { Step2 } from "./formInformationRegister";
import { useOnboarding } from "../store";
import { useEffect } from "react";
import { Finalizing } from "./finalizing";
import { motion } from "motion/react";
import { useOnboardingActions } from "../useOnboardingActions";

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

type OnboardingScreenProps = {}

export const OnboardingScreen = ({ }: OnboardingScreenProps) => {
  const onboarding = useOnboarding()
  const { finishOnboardingAction } = useOnboardingActions()

  useEffect(() => {
    if (onboarding.step == 3) finishOnboardingAction({
        industry: onboarding.industry,
        nameWorkspace: onboarding.nameWorkspace,
        qtyTeam: onboarding.qtyTeam,
        rol: onboarding.rol,
      })
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