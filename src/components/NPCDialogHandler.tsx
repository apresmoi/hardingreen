import React, { useMemo } from 'react';
import { DialogNPC } from '../layout/DialogNPC';
import { useEvents } from './Events';
import { useEffect, useState } from 'react';
import { getSound } from 'src/sounds';


export function NPCDialogHandler() {
    const [state, setState] = useState({ text: '', eval: null })
    // const [evaluator, setResponseEvaluator] = useState<null | ((resp: string) => boolean)>(null)
    const [color, setColor] = useState('white')
    const { subscribeEvent } = useEvents()

    const handleResponse = (response: string) => {
        //@ts-ignore
        if (state.eval) state.eval(response)
    }

    useEffect(() => {
        if (state.text) {
            const sound = (() => {
                const random = Math.random()
                if (state.text.length < 30) return getSound('TalkShort')
                if (state.text.length > 100) return getSound('TalkUltraLong')
                if (state.text.length > 60) {
                    if (random < 0.33) return getSound('TalkLong')
                    if (random < 0.66) return getSound('TalkLong2')
                    return getSound('TalkLong3')
                }
                if (random < 0.25) return getSound('Talk2')
                if (random < 0.5) return getSound('Talk3')
                if (random < 0.75) return getSound('Talk4')
                return getSound('Talk1')
            })()
            sound?.play()
            return () => {
                sound?.stop()
            }
        }
    }, [state])

    useEffect(() => {
        subscribeEvent('npc-dialog', ({ text, name, npc, color, timeout, onTimeout, evaluate }) => {
            if (text) {
                setState({ text: `${name}: ${text}`, eval: evaluate })
                setColor(color)
            } else {
                setState({ text: '', eval: null })
            }

            if (timeout) {
                setTimeout(() => {
                    setState({ text: '', eval: null })
                    if (onTimeout) onTimeout()
                }, timeout * 1000);
            }
        })
    }, [])


    if (!state.text) return null
    return <DialogNPC
        content={state.text}
        color={color}
        onSubmit={handleResponse}
        textInput={!!state.eval}
    />
}