import React, { useMemo } from 'react';
import { DialogNPC } from '../layout/DialogNPC';
import { useEvents } from './Events';
import { useEffect, useState } from 'react';
import { getSound } from 'src/sounds';


export function NPCDialogHandler() {
    const [text, setText] = useState('')
    const [color, setColor] = useState('white')
    const { subscribeEvent } = useEvents()

    useEffect(() => {
        if (text) {
            const sound = (() => {
                const random = Math.random()
                if (text.length < 30) return getSound('TalkShort')
                if (text.length > 100) return getSound('TalkUltraLong')
                if (text.length > 60) {
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
    }, [text])

    useEffect(() => {
        subscribeEvent('npc-dialog', ({ text, name, npc, color, timeout, onTimeout }) => {
            // console.log(args)
            if (text) {
                setText(`${name}: ${text}`)
                setColor(color)
            } else {
                setText('')
            }

            if (timeout) {
                setTimeout(() => {
                    setText('')
                    if (onTimeout) onTimeout()
                }, timeout * 1000);
            }
        })
    }, [])


    if (!text) return null
    return <DialogNPC
        content={text}
        color={color}
    />
}