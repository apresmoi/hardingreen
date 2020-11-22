import React, { useEffect, useState } from 'react'
import './style.css'

interface DialogProps {
    content: string
    color?: string
    timeout?: number
    noFade?: boolean
    onDisappear?: () => void
}

export function DialogNPC(props: DialogProps) {
    const { onDisappear, timeout, noFade } = props

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

    return <div className={["dialog-npc", !disappearing ? "show" : ""].join(' ')}>
        <div style={{ color: props.color }}>
            {props.content}
        </div>
        <div>
            Presione espacio para continuar.
        </div>
    </div>
}