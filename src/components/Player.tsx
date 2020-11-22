import React, { useEffect, useMemo, useState, useRef } from "react";
import { Group, Material, MeshBasicMaterial } from "three";
import { usePhysics } from "./Physics";
import { useFrame } from "react-three-fiber";
import { Bodies, World, Body } from "matter-js";
import { useKeyPress } from "../hooks/useKeyPress";
import { Dialogs } from '../dialogs'

import { PlayerTexture, PlayerDuckTexture, PlayerWalk1Texture, PlayerWalk2Texture, PlayerWalk3Texture } from "../textures";
import { useEvents } from "./Events";
import { doorPosition, yellowNPCPosition, orangeNPCPosition, blueNPCPosition, berriesPosition, sphinxDoorPosition } from "src/constants";
import { getSound } from "src/sounds";

export function Player() {
    const [facing, setFacing] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: -15 })
    const { world } = usePhysics()
    const { subscribeEvent, raiseEvent } = useEvents()
    const group = useRef<Group>()
    const material = useRef<MeshBasicMaterial>()
    const breathing = React.useRef<number>(1);
    const jumpCooldown = React.useRef<number>(0);
    const walkStep = React.useRef<number>(0);
    const [dialogIndex, setDialogIndex] = useState<number>(0)
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [foundKey, setFoundKey] = useState<boolean>(false)
    const [sphinxTalking, setSphinxTalking] = useState<boolean>(false)
    const [machineTalking, setMachineTalking] = useState<boolean>(false)

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
        subscribeEvent('sphinx-talk', () => {
            setSphinxTalking(true)
            setDialogOpen(true)
            raiseEvent('npc-dialog', Dialogs.sphinx[0])
            setDialogIndex(1)
        })
        subscribeEvent('machine-talk', () => {
            setMachineTalking(true)
            setDialogOpen(true)
            raiseEvent('npc-dialog', Dialogs.machine[0])
            setDialogIndex(1)
        })
        subscribeEvent('terrain-3-access', () => {
            setSphinxTalking(false)
            raiseEvent('npc-dialog', '')
            setDialogIndex(0)
        })
    }, [player, subscribeEvent])

    useEffect(() => {
        if (group.current) {
            if (arrowDown) Body.scale(player, 0.8, 0.8, player.position)
            else if (player.circleRadius && player.circleRadius < 6) Body.scale(player, 1 / 0.8, 1 / 0.8, player.position)
        }
    }, [arrowDown])

    useEffect(() => {
        if (arrowUp && jumpCooldown.current === 0) {
            const sound = (() => {
                const rnd = Math.random()
                if (rnd > 0.5) return getSound('Jump')
                return getSound('Jump2')
            })()
            if (sound) {
                sound.play()
            }
        }
    }, [arrowUp])

    useEffect(() => {
        if (spaceDown && berriesPosition(position)) {
            raiseEvent('berry-pickup')
        }
        if (spaceDown && sphinxTalking) {
            if (Dialogs.sphinx.length === dialogIndex) {
                setDialogIndex(0)
                setDialogOpen(false)
                raiseEvent('start-engine')
                raiseEvent('npc-dialog', '')
                raiseEvent('end')
            } else {
                setDialogOpen(true)
                const dialog = Dialogs.sphinx[dialogIndex]
                const evaluate = (response: string) => {
                    let reply: any = null
                    if (dialog.response?.every(r => response && response.includes(r))) {
                        setDialogIndex(dialogIndex + 3)
                        reply = Dialogs.sphinx[dialogIndex + 2]
                    } else {
                        setDialogIndex(dialogIndex + 2)
                        reply = Dialogs.sphinx[dialogIndex + 1]
                    }
                    if (reply.action) {
                        setTimeout(() => {
                            //@ts-ignore
                            raiseEvent(reply.action)
                            if (reply.action === 'death') {
                                setDialogOpen(false)
                                setDialogIndex(0)
                                raiseEvent('npc-dialog', '')
                                raiseEvent('restart')
                                raiseEvent('start-engine')
                            }
                        }, 1000);
                    } else {
                        raiseEvent('npc-dialog', {
                            ...reply,
                        })
                    }
                }
                raiseEvent('npc-dialog', {
                    ...dialog,
                    evaluate: dialog.response ? evaluate : null
                })
                if (dialog.action) {
                    setTimeout(() => {
                        //@ts-ignore
                        raiseEvent(dialog.action)
                        if (dialog.action === 'death') {
                            setDialogOpen(false)
                            setDialogIndex(0)
                            raiseEvent('npc-dialog', '')
                            raiseEvent('restart')
                            raiseEvent('start-engine')
                        } else {
                            raiseEvent(dialog.action)
                        }
                    }, 1000);
                }
                setDialogIndex(dialogIndex + 1)
            }
        }
        if (spaceDown && machineTalking) {
            if (Dialogs.machine.length === dialogIndex) {
                setDialogIndex(0)
                setDialogOpen(false)
                raiseEvent('start-engine')
                raiseEvent('npc-dialog', '')
                raiseEvent('end')
            } else {
                setDialogOpen(true)
                const dialog = Dialogs.machine[dialogIndex]
                const evaluate = (response: string) => {
                    let reply: any = null
                    if (dialog.options && response === dialog.options[1]) {
                        setDialogIndex(dialogIndex + 4)
                        reply = Dialogs.machine[dialogIndex + 3]
                    } else {
                        setDialogIndex(dialogIndex + 2)
                        reply = Dialogs.machine[dialogIndex + 1]
                    }
                    raiseEvent('npc-dialog', {
                        ...reply,
                    })
                }
                raiseEvent('npc-dialog', {
                    ...dialog,
                    evaluate: dialog.options ? evaluate : null,
                    options: dialog.options
                })
                if (dialog.action) {
                    raiseEvent(dialog.action)
                }
                setDialogIndex(dialogIndex + 1)
            }
        }
        if (spaceDown && doorPosition(position)) {
            if (foundKey) {
                const sound = getSound('Door')
                if (sound) {
                    sound.play()
                }
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
    }, [spaceDown, position, foundKey, sphinxTalking, machineTalking])

    useEffect(() => {
        if (arrowRight) setFacing(1)
        if (arrowLeft) setFacing(-1)
    }, [arrowLeft, arrowRight])

    useEffect(() => {
        PlayerTexture.repeat.x = facing
        PlayerDuckTexture.repeat.x = facing
        PlayerWalk1Texture.repeat.x = facing
        PlayerWalk2Texture.repeat.x = facing
        PlayerWalk3Texture.repeat.x = facing
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
        }

        if (sphinxDoorPosition(player.position)) {
            const sound = getSound('Door')
            if (sound) {
                sound.play()
            }
            raiseEvent('terrain2-stair')
        }

        if (arrowLeft || arrowRight || arrowUp || arrowDown) {
            const vector = {
                x: (-(arrowLeft ? 1 : 0) + (arrowRight ? 1 : 0)) * 0.4,
                // y: ((arrowUp ? 3 : 0) + (arrowDown ? -1 : 0)) * 0.3,
                y: 0,
            }
            Body.applyForce(player, player.position, vector);

            walkStep.current += 0.15

            if (material?.current) {
                material.current.map = (() => {
                    if (arrowDown) return PlayerDuckTexture
                    const step = Math.trunc(walkStep.current % 4)
                    if (step === 0) return PlayerTexture
                    if (step === 1) return PlayerWalk1Texture
                    if (step === 2) return PlayerWalk2Texture
                    else return PlayerWalk3Texture
                })()
            }
        } else {
            walkStep.current = 0
            if (material?.current) {
                material.current.map = PlayerTexture
            }
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
                <meshBasicMaterial ref={material} map={arrowDown ? PlayerDuckTexture : PlayerTexture} transparent />
            </mesh>
        </group>
    );
}
