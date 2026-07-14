'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { useOnboarding } from "./store";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner"
import { motion } from "motion/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FinalizingProps = {
  
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

export const Finalizing = ({ }: FinalizingProps) => {
  const useAppData = UseAppData()
  const onboarding = useOnboarding()

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        {onboarding.finalizing && (
          <motion.div className="w-full h-full flex items-center justify-center" {...fade}>
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <h1 className="font-semibold">Finalizando configuración...</h1>
              </div>
              <Spinner className="size-8" />
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}