import React from 'react'
import { ObjectBerryTexture } from '../textures'

interface Berryrops {
    position: { x: number, y: number, z: number }
}

export function Berry(props: Berryrops) {
    return (
        <group
            position={[props.position.x, props.position.y, props.position.z]}
        >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <circleBufferGeometry args={[2, 100]} />
                <meshBasicMaterial map={ObjectBerryTexture} transparent />
            </mesh>
        </group>
    )
}