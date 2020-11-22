import React, { useEffect, useMemo, useState, useRef } from "react";
import { Group } from "three";
import { usePhysics } from "./Physics";
import { Bodies, World } from "matter-js";
import { Terrain3Texture, Terrain4Texture } from "../textures";
import { getSound } from "../sounds";
import { DEBUG } from "src/constants";
import { useEvents } from "./Events";

export function Terrain4() {
    const { world } = usePhysics()
    const [retry, setRetry] = useState(0)
    const group = useRef<Group>()

    const { raiseEvent } = useEvents()

    useEffect(() => {
        raiseEvent('pause-engine')
        raiseEvent('machine-talk')
    }, [])

    useEffect(() => {
        if (!DEBUG) {
            const sound = getSound('Terrain2', true)
            sound?.play().catch(err => {
                if (err.toString().includes('play() failed')) {
                    setRetry(retry + 1)
                }
            })
            return () => {
                sound?.stop()
            }
        }
    }, [retry])

    const terrain = useMemo(() => {
        const body = Bodies.rectangle(0, -30, 2260 / 6 - 15, 20, { isStatic: true, angle: 0.05 })
        return body
    }, [world])

    useEffect(() => {
        if (world && terrain) {
            World.add(world, terrain)
            return () => {
                World.remove(world, terrain)
            }
        }
    }, [terrain, world])

    return (
        <>
            <group
                ref={group}
                position={[0, 10, -24]}
            >
                <mesh>
                    <boxBufferGeometry args={[2260 / 16, 0, 1200 / 16]} />
                    <meshBasicMaterial map={Terrain4Texture} transparent />
                </mesh>
            </group>
        </>
    );
}
