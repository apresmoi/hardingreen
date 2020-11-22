import React from 'react';
import { DialogNPC } from '../layout/DialogNPC';
import { useEvents } from './Events';
import { useEffect, useState } from 'react';


export function NPCDialogHandler() {
    const [text, setText] = useState('')
    const [color, setColor] = useState('white')
    const { subscribeEvent } = useEvents()
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
                    if(onTimeout) onTimeout()
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