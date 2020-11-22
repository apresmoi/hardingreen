import React from 'react'
import { ObjectKeyTexture } from '../textures'

interface Keyrops {
    position: { x: number, y: number, z: number }
}

export function Key(props: Keyrops) {
    return (
        <group
            position={[props.position.x, props.position.y, props.position.z]}
        >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <circleBufferGeometry args={[2, 100]} />
                <meshBasicMaterial map={ObjectKeyTexture} transparent />
            </mesh>
        </group>
    )
}