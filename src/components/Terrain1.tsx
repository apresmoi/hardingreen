import React, { useEffect, useMemo, useState, useRef } from "react";
import { Group } from "three";
import { usePhysics } from "./Physics";
import { Bodies, World } from "matter-js";
import { TerrainTexture, Player2Texture, Player3Texture } from "../textures";
import { getSound } from "../sounds";
import { DEBUG } from "src/constants";
import { useEvents } from "./Events";
import { DeathSensor } from "./Sensors/Death";
import { NPC } from "./NPC";
import { DialogNPC } from "src/layout/DialogNPC";
import { Berries } from "./Berries";

export function Terrain1() {
    const { world } = usePhysics()
    const { subscribeEvent } = useEvents()
    const [retry, setRetry] = useState(0)
    const group = useRef<Group>()

    useEffect(() => {
        if (!DEBUG) {
            const sound = getSound('Terrain1')
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
        // const body = Bodies.rectangle(0, -30, 2260 / 6 - 15, 20, { isStatic: true, angle: 0.05 })

        const scale = (v: number) => v / 6

        const points = [
            { x: 80, y: -126.75 },
            { x: 116.75, y: -112.75 },
            { x: 225.75, y: -114.75 },
            { x: 361.75, y: -110.75 },
            { x: 492.75, y: -102.75 },
            { x: 608.75, y: -91.75 },
            { x: 716.75, y: -79.75 },
            { x: 804.75, y: -69.75 },
            { x: 901.75, y: -69.75 },
            { x: 1037.75, y: -70.75 },
            { x: 1159.75, y: -68.75 },
            { x: 1257.75, y: -67.75 },
            { x: 1342.75, y: -57.75 },
            { x: 1442.75, y: -47.75 },
            { x: 1500.75, y: -42.75 },
            { x: 1548.75, y: -37.75 },
            { x: 1673.75, y: -26.75 },
            { x: 1768.75, y: -21.75 },
            { x: 1859.75, y: -15.75 },
            { x: 1909.75, y: -11.75 },
            { x: 2022.75, y: -11.75 },
            { x: 2105.75, y: -7.75 },
            { x: 2177.75, y: -2.75 },
            { x: 2191.75, y: -6.75 },
            { x: 2206.75, y: -0.75 },
            { x: 2206, y: -200 },
            { x: 80, y: -200 },
        ].map(point => ({ x: scale(point.x), y: scale(point.y) }))
        const body = Bodies.fromVertices(20, -27, [
            points,
        ], {
            isStatic: true,
        })

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
                position={[0, 10, 10]}
            >
                <mesh>
                    <boxBufferGeometry args={[2260 / 6, 0, 990 / 6]} />
                    <meshBasicMaterial map={TerrainTexture} transparent />
                </mesh>
            </group>
            <NPC idColor="yellow" position={{ x: -100, y: 1, z: -20 }} texture={Player2Texture} />
            <NPC idColor="orange" position={{ x: -40, y: 1, z: -12 }} texture={Player3Texture} />
            <DeathSensor position={{ x: 2260 / 12, y: -50 }} size={{ width: 100, height: 50 }} />
            <DeathSensor position={{ x: -2260 / 12 - 50, y: -70 }} size={{ width: 100, height: 50 }} />
            <Berries />
        </>
    );
}
