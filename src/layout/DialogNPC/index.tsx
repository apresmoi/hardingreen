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
    options: string[]
    big?: boolean
}

export function DialogNPC(props: DialogProps) {
    const { onDisappear, timeout, noFade, onSubmit, textInput, options, big } = props

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


    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onSubmit) onSubmit(e.currentTarget.value)
    }, [textInput, onSubmit])


    return <div className={["dialog-npc", !disappearing ? "show" : "", big ? "big" : ""].join(' ')}>
        <div style={{ color: props.color }}>
            {props.content}
        </div>
        {textInput && !options.length ? <input
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        /> : null}
        {options.length ? <select onChange={handleSelectChange} value="">
            <option>Seleccione una opción</option>
            {options.map(o => <option value={o}>{o}</option>)}
        </select> : null}
        <div>
            Presione espacio para continuar.
        </div>
    </div>
}