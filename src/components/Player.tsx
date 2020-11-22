import React, { useEffect, useMemo, useState, useRef } from "react";
import { Group } from "three";
import { usePhysics } from "./Physics";
import { useFrame } from "react-three-fiber";
import { Bodies, World, Body } from "matter-js";
import { useKeyPress } from "../hooks/useKeyPress";
import { Dialogs } from '../dialogs'

import { PlayerTexture, PlayerDuckTexture } from "../textures";
import { useEvents } from "./Events";
import { doorPosition, yellowNPCPosition, orangeNPCPosition, blueNPCPosition, berriesPosition } from "src/constants";

export function Player() {
    const [facing, setFacing] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: -15 })
    const { world } = usePhysics()
    const { subscribeEvent, raiseEvent } = useEvents()
    const group = useRef<Group>()
    const breathing = React.useRef<number>(1);
    const jumpCooldown = React.useRef<number>(0);
    const [dialogIndex, setDialogIndex] = useState<number>(0)
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [foundKey, setFoundKey] = useState<boolean>(false)

    const player = useMemo(() => {
        const body = Bodies.circle(0, -15, 6, { mass: 100, frictionAir: 0.2, friction: 0, restitution: 0, plugin: "player" })
        return body
    }, [world])

    const arrowLeft = useKeyPress(['ArrowLeft', 'a'])
    const arrowRight = useKeyPress(['ArrowRight', 'd'])
    const arrowUp = useKeyPress(['ArrowUp', 'w'])
    const arrowDown = useKeyPress(['ArrowDown', 's'])
    const spaceDown = useKeyPress([' '])


    useEffect(() => {
        subscribeEvent('death', () => {
            setTimeout(() => {
                Body.setPosition(player, { x: 0, y: -15 })
                Body.setVelocity(player, { x: 0, y: 0 })
            }, 1000);
        })
        subscribeEvent('found-key', () => {
            setFoundKey(true)
        })
    }, [player, subscribeEvent])

    useEffect(() => {
        if (group.current) {
            if (arrowDown) Body.scale(player, 0.8, 0.8, player.position)
            else if (player.circleRadius && player.circleRadius < 6) Body.scale(player, 1 / 0.8, 1 / 0.8, player.position)
        }
    }, [arrowDown])

    useEffect(() => {
        if (spaceDown && berriesPosition(position)) {
            raiseEvent('berry-pickup')
        }
        if (spaceDown && doorPosition(position)) {
            if (foundKey) {
                raiseEvent('terrain1-door-open')
            } else {
                if (!dialogOpen) {
                    raiseEvent('pause-engine')
                    setDialogOpen(true)
                    raiseEvent('npc-dialog', {
                        name: 'Gubi', text: 'Parece que esta cerrado. Necesito una llave.', npc: true, color: 'white',
                    })
                } else {
                    setDialogOpen(false)
                    raiseEvent('start-engine')
                    raiseEvent('npc-dialog', '')
                }
            }
        }
        else if (spaceDown && yellowNPCPosition(position)) {
            if (!dialogOpen) raiseEvent('pause-engine')
            if (Dialogs.yellow.length === dialogIndex) {
                setDialogIndex(0)
                setDialogOpen(false)
                raiseEvent('start-engine')
                raiseEvent('npc-dialog', '')
            } else {
                setDialogOpen(true)
                raiseEvent('npc-dialog', Dialogs.yellow[dialogIndex])
                setDialogIndex(dialogIndex + 1)
            }
        }
        else if (spaceDown && orangeNPCPosition(position)) {
            if (!dialogOpen) raiseEvent('pause-engine')
            if (Dialogs.orange.length === dialogIndex) {
                setDialogIndex(0)
                setDialogOpen(false)
                raiseEvent('start-engine')
                raiseEvent('npc-dialog', '')
            } else {
                setDialogOpen(true)
                raiseEvent('npc-dialog', Dialogs.orange[dialogIndex])
                setDialogIndex(dialogIndex + 1)
            }
        }
        else if (spaceDown && blueNPCPosition(position)) {
            raiseEvent('talk-blue')
        }
    }, [spaceDown, position, foundKey])

    useEffect(() => {
        if (arrowRight) setFacing(1)
        if (arrowLeft) setFacing(-1)
    }, [arrowLeft, arrowRight])

    useEffect(() => {
        PlayerTexture.repeat.x = facing
        PlayerDuckTexture.repeat.x = facing
    }, [facing])

    useEffect(() => {
        if (world && player) {
            World.add(world, player)
            return () => {
                World.remove(world, player)
            }
        }
    }, [player, world])

    useFrame(({ camera }) => {
        setPosition(player.position)
        if (group?.current?.position) {
            group.current.position.x = player.position.x
            group.current.position.z = player.position.y

            // console.log(player.position)
        }

        if (arrowLeft || arrowRight || arrowUp || arrowDown) {
            const vector = {
                x: (-(arrowLeft ? 1 : 0) + (arrowRight ? 1 : 0)) * 0.4,
                // y: ((arrowUp ? 3 : 0) + (arrowDown ? -1 : 0)) * 0.3,
                y: 0,
            }
            Body.applyForce(player, player.position, vector);
        }

        if (arrowUp && jumpCooldown?.current === 0) {
            jumpCooldown.current = 2
            Body.applyForce(player, player.position, { x: 0, y: 12 })
        } else if (jumpCooldown?.current > 0) {
            jumpCooldown.current -= 0.1
        } else {
            jumpCooldown.current = 0
        }

        if (group?.current) {
            if (group.current.scale.x < 1.1 && breathing.current === 1) {
                group.current.scale.x += breathing.current / 500;
                if (Math.abs(group.current.scale.x - 1.1) < 0.01) breathing.current = -1;
            } else {
                breathing.current = -1;
                group.current.scale.x += breathing.current / 500;
                if (Math.abs(group.current.scale.x - 1) < 0.01) breathing.current = 1;
            }
        }

        camera.position.x = player.position.x
        camera.position.z = player.position.y
    }, 0)

    return (
        <group
            ref={group}
            position={[position.x, 0, position.y]}
        >
            <mesh>
                <boxBufferGeometry args={[6, 0, 12]} />
                <meshBasicMaterial map={arrowDown ? PlayerDuckTexture : PlayerTexture} transparent />
            </mesh>
        </group>
    );
}
