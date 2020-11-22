import React, { useState, useEffect, useMemo } from 'react'
import { Texture, FontLoader, Font } from "three";
import { Roboto } from '../textures'
import { useEvents } from './Events';
import { Text } from "@react-three/drei/Text"

interface NPCProps {
    idColor: string
    position: { x: number, y: number, z: number }
    texture: Texture
}


export function NPC(props: NPCProps) {
    return (
        <group
            position={[props.position.x, props.position.y, props.position.z]}
        >
            <mesh>
                <boxBufferGeometry args={[6, 0, 12]} />
                <meshBasicMaterial map={props.texture} transparent />
            </mesh>
        </group>
    )
}