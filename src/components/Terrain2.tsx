import React, { useEffect, useMemo, useState, useRef } from "react";
import { Group } from "three";
import { usePhysics } from "./Physics";
import { Bodies, World, Body } from "matter-js";
import { Terrain2Texture, Player4Texture } from "../textures";
import { getSound } from "../sounds";
import { DEBUG } from "src/constants";
import { Projectile } from "./Projectile";
import { NPC } from "./NPC";

export function Terrain2() {
    const { world } = usePhysics()
    const [retry, setRetry] = useState(0)
    const group = useRef<Group>()

    useEffect(() => {
        if (!DEBUG) {
            const sound = getSound('Terrain2')
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

    const offsetX = -70//65
    const offsetY = 35//20

    const terrain = useMemo(() => {
        const boxSize = 7.5
        const body4 = Bodies.rectangle(offsetX + 16, offsetY - 71, 1300 / 9, 3, { isStatic: true, angle: 0.01 })
        const body8 = Bodies.rectangle(offsetX + 553 / 9 + 3 * boxSize, offsetY - 71 + 3 * boxSize + boxSize / 2, boxSize, boxSize, { isStatic: true })
        const body3 = Bodies.rectangle(offsetX + 553 / 9 + 2 * boxSize, offsetY - 71 + 2 * boxSize + boxSize / 2, boxSize, boxSize, { isStatic: true })
        const body2 = Bodies.rectangle(offsetX + 553 / 9 + boxSize, offsetY - 71 + boxSize + boxSize / 2, boxSize, boxSize, { isStatic: true })
        const body1 = Bodies.rectangle(offsetX + 553 / 9 + 0, offsetY - 71 + boxSize / 2, boxSize, boxSize, { isStatic: true })

        const body5 = Bodies.rectangle(offsetX + -15, offsetY - 102, 930 / 9, 3, { isStatic: true, angle: 0.06 })
        const body9 = Bodies.rectangle(offsetX + -55, offsetY - 102 + 3, boxSize, 3, { isStatic: true })
        const body10 = Bodies.rectangle(offsetX + -55 - boxSize, offsetY - 102 + 3 + 6, boxSize, 3, { isStatic: true })
        const body11 = Bodies.rectangle(offsetX + -55 - 16, offsetY - 102 + 3 + 6 + 7, boxSize, 3, { isStatic: true })
        const body12 = Bodies.rectangle(offsetX + -55 - 23, offsetY - 102 + 3 + 6 + 7 + 7, boxSize, 3, { isStatic: true })

        const body6 = Bodies.rectangle(offsetX + 20, offsetY - 132.5, 924 / 9, 3, { isStatic: true, angle: 0.04 })
        const body13 = Bodies.rectangle(offsetX + 35, offsetY - 132.5 + 5, boxSize, 3, { isStatic: true })
        const body14 = Bodies.rectangle(offsetX + 42, offsetY - 132.5 + 5 + 6, boxSize, 3, { isStatic: true })

        const body7 = Bodies.rectangle(offsetX + 0, offsetY - 172, 924 / 9, 20, { isStatic: true, angle: 0.04 })

        const wallLeft = Bodies.rectangle(offsetX + -83, offsetY - 71, 1700 / 9, 3, { isStatic: true, angle: -1.25 })
        const wallRight = Bodies.rectangle(offsetX + 72, offsetY - 71, 1700 / 9, 3, { isStatic: true, angle: 1.1 })

        const body = Body.create({
            parts: [body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, wallLeft, wallRight,],
            isStatic: true
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
                position={[offsetX, 10, -100 + offsetY]}
            >
                <mesh>
                    <boxBufferGeometry args={[1900 / 9, 0, 1600 / 9]} />
                    <meshBasicMaterial map={Terrain2Texture} transparent />
                </mesh>

            </group>
            <Projectile
                from={{ x: offsetX - 73, y: -65 + offsetY }}
                to={{ x: offsetX + 53, y: -65 + offsetY }}
                speed={4000}
            />
            <Projectile
                from={{ x: offsetX + 53, y: -90.6 + offsetY }}
                to={{ x: offsetX - 55, y: -90.6 + offsetY }}
                speed={2000}
            />
            <Projectile
                from={{ x: offsetX - 50, y: -129 + offsetY }}
                to={{ x: offsetX + 27, y: -129 + offsetY }}
                speed={2000}
            />
            <NPC idColor="blue" position={{ x: offsetX, y: 1, z: offsetY - 156 }} texture={Player4Texture} />
        </>
    );
}
