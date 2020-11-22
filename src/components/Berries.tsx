import React, { useState, useEffect } from 'react'
import { Berry } from "./Berry";
import { Key } from "./Key";
import { useEvents } from './Events';

export function Berries() {
    const [berries, setBerries] = useState(3)

    const { subscribeEvent, raiseEvent } = useEvents()

    useEffect(() => {
        if (berries >= 0) {
            subscribeEvent('berry-pickup', () => {
                setBerries(berries - 1)
                if (berries === 0) {
                    raiseEvent('found-key')
                }
            })
        }
    }, [berries])

    return (<>
        {berries > 0 && <Berry position={{ x: 44, y: 0, z: -5 }} />}
        {berries > 1 && <Berry position={{ x: 39, y: 0, z: -14 }} />}
        {berries > 2 && <Berry position={{ x: 52, y: 0, z: -14 }} />}
        {berries === 0 && <Key position={{ x: 52, y: 0, z: -14 }} />}
    </>
    )
}