/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'

export const useTextareaManager = () => {
  const [message, setMessage] = useState('')

  const reset = useCallback(() => {
    setMessage('')
  }, [])

  return {
    message,
    setMessage,
    reset
  }
}