import React, { useEffect, useMemo, useRef } from "react";
import { usePhysics } from "./Physics";
import { Bodies, World, Body } from "matter-js";
import { useEvents } from "./Events";
import { Group } from "three";
import { useFrame } from "react-three-fiber";
import { getSound } from "src/sounds";

interface ProjectileProps {
    from: { x: number, y: number }
    to: { x: number, y: number }
    speed: number
}

export function Projectile(props: ProjectileProps) {
    const { world, subscribeCollision } = usePhysics()
    const { raiseEvent } = useEvents()
    const group = useRef<Group>()
    const timer = useRef<number>(0)

    const { from, to, speed } = props

    const direction = useMemo(() => {
        return Math.sign(to.x - from.x)
    }, [from, to])

    const sensor = useMemo(() => {
        const body = Bodies.circle(from.x, from.y, 1, {
            isSensor: true,
            isStatic: true
        })
        return body
    }, [world])

    useEffect(() => {
        Body.setVelocity(sensor, { x: direction * 2, y: 0 })
    }, [from, sensor])

    useFrame((e) => {
        if (group.current) {

            const delta = performance.now() - timer.current
            timer.current = performance.now()
            group.current.position.x += (to.x - from.x) * delta / speed

            if (direction === 1 && group.current.position.x >= to.x) {
                group.current.position.x = from.x
                const sound = (() => {
                    const rnd = Math.random()
                    if (rnd > 0.5) return getSound('Shoot')
                    return getSound('Shoot2')
                })()
                if (sound) {
                    sound.play()
                }
            }
            else if (direction === -1 && group.current.position.x <= to.x) {
                group.current.position.x = from.x
                const sound = (() => {
                    const rnd = Math.random()
                    if (rnd > 0.5) return getSound('Shoot')
                    return getSound('Shoot2')
                })()
                if (sound) {
                    sound.play()
                }
            }

            Body.setPosition(sensor, { x: group.current.position.x, y: group.current.position.z })

        }
    })

    useEffect(() => {
        if (world && sensor) {
            World.add(world, sensor)

            subscribeCollision((bodyA, bodyB) => {
                if (bodyA === sensor && bodyB.plugin === 'player') {
                    raiseEvent('death')
                }
            })

            return () => {
                World.remove(world, sensor)
            }
        }
    }, [sensor, world])


    return (
        <group
            ref={group}
            position={[from.x, -5, from.y]}
        >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <circleBufferGeometry args={[1, 100]} />
                <meshBasicMaterial color="red" />
            </mesh>
        </group>
    );
}
