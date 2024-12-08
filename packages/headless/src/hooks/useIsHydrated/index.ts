import { useSyncExternalStore } from 'react'

const noopSubscribe = () => {
  return () => {}
}

export function useIsHydrated() {
    // ensures we are client side rendering before using createPortal
    // which is not supported on the server
    const isHydrated = useSyncExternalStore(
      noopSubscribe,
      () => true, // snapshot always returns true because at this point we're on the client
      () => false, // server snapshot alwasy returns false because at this point we're on the server
  )

  return isHydrated
}
