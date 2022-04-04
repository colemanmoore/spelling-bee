import { useEffect, useRef } from 'react'
import { usePlayerContext } from 'context/PlayerState'
import { MESSAGE_DURATION } from 'constants/constants'

export default function useMessageFlash() {

    const { isShowingMessage, showMessage, hideMessage } = usePlayerContext()
    
    const setTimeoutRef = useRef()

    useEffect(() => {

        if (isShowingMessage) {
            const timeoutId = setTimeout(() => {
                hideMessage()
            }, MESSAGE_DURATION)
            setTimeoutRef.current = timeoutId
        }

        return () => clearTimeout(setTimeoutRef.current)

    }, [isShowingMessage])

    return {
        isShowingMessage,
        setMessage: message => showMessage(message)
    }
}