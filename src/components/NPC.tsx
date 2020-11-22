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
    // const { idColor } = props
    // const [text, setText] = useState("")

    // const { subscribeEvent } = useEvents()

    // useEffect(() => {
    //     subscribeEvent(`talk-${idColor}`, ({ text }) => {
    //         console.log(text)
    //         setText(text)
    //     })
    // }, [idColor])

    // const config = useMemo(
    //     // () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    //     () => ({
    //         font: Roboto,
    //         size: 1,
    //         height: 0.5,

    //     }),
    //     []
    // );

    return (
        <group
            position={[props.position.x, props.position.y, props.position.z]}
        >
            <mesh>
                <boxBufferGeometry args={[6, 0, 12]} />
                <meshBasicMaterial map={props.texture} transparent />
            </mesh>
            {/* {text && <group
                rotation={[0, 0, 0]}
                position={[0, 0, 10]}
            >
                <mesh
                >
                    <boxGeometry attach="geometry" args={[14, 0, 9]} />
                    <meshBasicMaterial attach="material" color="white" />
                </mesh>
                <Text
                    rotation={[Math.PI / 2, 0, 0]}
                    color={"black"}
                    fontSize={1.5}
                    maxWidth={10}
                    lineHeight={1}
                    textAlign={'justify'}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Si, son los restos de una aldea más antigua que la nuestra
                </Text>
            </group>} */}
        </group>
    )
}