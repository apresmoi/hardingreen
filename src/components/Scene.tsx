import React, { useEffect, useState } from 'react';
import { useEvents } from './Events';
import { Terrain1 } from './Terrain1'
import { Terrain2 } from './Terrain2'
import { Stage, DEBUG } from '../constants';
import { getSound } from 'src/sounds';
import { Terrain3 } from './Terrain3';

interface Props {
    stage: Stage,
    onChangeStage: (stage: Stage) => void
}

export function Scene(props: Props) {
    const { subscribeEvent } = useEvents()
    const { stage } = props

    useEffect(() => {
        subscribeEvent('terrain1-door-open', () => {
            props.onChangeStage('stage-2-intro')
        })
        subscribeEvent('terrain2-stair', () => {
            props.onChangeStage('stage-3-intro')
        })
        subscribeEvent('end-game', () => {
            props.onChangeStage('end')
        })
        subscribeEvent('restart', () => {
            props.onChangeStage('stage-1-intro')
        })
        // subscribeEvent('talk-yellow', () => {
        //     props.onChangeStage('terrain1-dialog-1')
        // })
        subscribeEvent('talk-orange', () => {
            // props.onChangeStage('terrain1-dialog-2')
        })
        subscribeEvent('talk-blue', () => {
            // props.onChangeStage('terrain2-dialog-1')
        })
    }, [])

    if (stage.includes('terrain1')) return <Terrain1 />
    if (stage.includes('terrain2')) return <Terrain2 />
    if (stage.includes('terrain3')) return <Terrain3 />
    return null
}