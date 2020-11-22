import React, { useState, useEffect } from 'react';
import { Dialog } from 'src/layout/Dialog';
import { useEvents } from './Events';


export function DeathDialog() {
    const { subscribeEvent } = useEvents()
    const [show, showDialog] = useState(false)
    useEffect(() => {
        subscribeEvent('death', () => {
            showDialog(true)
        })
    }, [])

    if (!show) return null
    return <Dialog content="Moriste" timeout={2} onDisappear={() => showDialog(false)} />
}