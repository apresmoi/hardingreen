import { useEffect, useMemo, } from "react";
import { usePhysics } from "../Physics";
import { Bodies, World } from "matter-js";
import { useEvents } from "../Events";


interface DeathSensorProps {
    position: { x: number, y: number }
    size: { width: number, height: number }
}

export function DeathSensor(props: DeathSensorProps) {
    const { world, subscribeCollision } = usePhysics()
    const { raiseEvent } = useEvents()

    const { position, size } = props

    const sensor = useMemo(() => {
        const body = Bodies.rectangle(position.x, position.y, size.width, size.height, {
            isSensor: true,
            isStatic: true
        })
        return body
    }, [world])

    useEffect(() => {
        sensor.position.x = position.x
        sensor.position.y = position.y
    }, [position, size])

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
        null
    );
}
