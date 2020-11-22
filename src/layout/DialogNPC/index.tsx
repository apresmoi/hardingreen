import React, { useEffect, useState, useCallback } from 'react'
import './style.css'

interface DialogProps {
    content: string
    color?: string
    timeout?: number
    noFade?: boolean
    textInput?: boolean
    onSubmit?: (response: string) => void
    onDisappear?: () => void
}

export function DialogNPC(props: DialogProps) {
    const { onDisappear, timeout, noFade, onSubmit, textInput } = props

    const [response, setResponse] = useState('')
    const [disappearing, set] = useState(false)

    useEffect(() => {
        if (onDisappear && timeout) {
            if (!noFade) {
                setTimeout(() => {
                    set(true)
                }, (timeout - 0.25) * 1000);
            }
            setTimeout(onDisappear, timeout * 1000);
        }
    }, [timeout, onDisappear, noFade]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        // e.preventDefault()
        e.stopPropagation()

        if (e.key === 'Enter') {
            if (onSubmit) onSubmit(response)
        }
    }, [onSubmit, response, textInput])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setResponse(e.currentTarget.value)
    }, [textInput])

    return <div className={["dialog-npc", !disappearing ? "show" : ""].join(' ')}>
        <div style={{ color: props.color }}>
            {props.content}
        </div>
        {textInput && <input
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />}
        <div>
            Presione espacio para continuar.
        </div>
    </div>
}