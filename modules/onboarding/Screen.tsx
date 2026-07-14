'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { Step1 } from "./formStep1";
import { Step2 } from "./formStep2";
import { useOnboarding } from "./store";
import { useEffect } from "react";
import { Finalizing } from "./finalizing";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type OnboardingScreenProps = {

}

export const OnboardingScreen = ({ }: OnboardingScreenProps) => {
  const useAppData = UseAppData()
  const onboarding = useOnboarding()

  return (
    <>
      {onboarding.step == 1 && (<>
        <div className="flex justify-center items-center h-200 px-150">
          <Step1
            onFinishStep1={(data) => {
              onboarding.setStep1(data)
              onboarding.setStep({ step: 2 })
            }}
          />
        </div>

      </>)}
      {onboarding.step == 2 && (<>
        <div className="flex justify-center items-center h-200 px-150">
          <Step2
            finishStep2={(data) => {
              onboarding.setStep2(data)
              onboarding.setStep({ step: 3 })
            }}
            handleBack={() => {
              onboarding.setStep({ step: 1 })
            }}
          />
        </div>
      </>)}
      {onboarding.step == 3 && (<>
        <div className="flex justify-center items-center h-200 px-150">
          <Finalizing />
        </div>
      </>)}


    </>
  )
}