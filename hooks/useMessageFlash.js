import { useEffect, useState, useRef } from 'react'

export default function useMessageFlash(timeoutLength = 1000) {

    const [currentMessage, setCurrentMessage] = useState(null)
    
    const setTimeoutRef = useRef()

    useEffect(() => {

        if (currentMessage) {
            const timeoutId = setTimeout(() => {
                setCurrentMessage(null)
            }, timeoutLength)
            setTimeoutRef.current = timeoutId
        }

        return () => clearTimeout(setTimeoutRef.current)

    }, [currentMessage])

    function setMessage(message) {
        setCurrentMessage(message)
    }

    return {
        currentMessage,
        setMessage
    }
}