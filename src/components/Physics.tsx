import React, { useState, useMemo, useContext, useEffect } from "react";
import { Engine, World, Bodies, Events, Body } from "matter-js";
import { useFrame } from "react-three-fiber";
import { useEvents } from "./Events";

interface Props {
    children: React.ReactNode;
}

const PhysicsContext = React.createContext<{
    engine: Engine | undefined,
    world: World | undefined,
    subscribeCollision: (callback: (bodyA: Body, bodyB: Body) => void) => void;
}>({
    engine: undefined,
    world: undefined,
    subscribeCollision: () => { },
})

export const usePhysics = () => {
    return useContext(PhysicsContext)
}

export function Physics({ children }: Props) {
    const { subscribeEvent } = useEvents()
    const [collisionSubscribers] = useState<((bodyA: Body, bodyB: Body) => void)[]>([])
    const [enginePaused, pauseEngine] = useState(false);
    const [engine] = useState(Engine.create(
        {
            // enableSleeping: true
        }
    ));
    const world = useMemo(() => {
        const world = engine.world;
        world.gravity.y = -4;
        return world;
    }, [engine]);

    subscribeEvent('pause-engine', () => {
        pauseEngine(true)
    })
    subscribeEvent('start-engine', () => {
        pauseEngine(false)
    })

    useFrame(() => {
        if (!enginePaused)
            Engine.update(engine, 5)
    })

    useEffect(() => {
        Events.on(engine, "collisionStart", (e) => {
            e.pairs.forEach(({ bodyA, bodyB }) => {
                collisionSubscribers.forEach(cb => {
                    if (cb) {
                        cb(bodyA, bodyB)
                        cb(bodyB, bodyA)
                    }
                })
            })
        })
    }, [engine])

    const subscribeCollision = (cb: (bodyA: Body, bodyB: Body) => void) => {
        collisionSubscribers.push(cb)
    }

    const contextValue = {
        engine,
        world,
        subscribeCollision,
    }

    return (
        <PhysicsContext.Provider value={contextValue}>
            {children}
        </PhysicsContext.Provider>
    );
}
