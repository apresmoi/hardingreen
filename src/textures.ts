import React, { useMemo } from 'react'
import { RepeatWrapping, TextureLoader, LoadingManager, FontLoader, Font } from "three";
//@ts-ignore
import JSONfont from "./Roboto.json";


const manager = new LoadingManager()

export const useTexturesManager = () => {
    return useMemo(() => {
        const onLoadSubscribers: (() => void)[] = []
        const onProgressSubscribers: ((progress: number) => void)[] = []
        let progress: { [x: string]: number } = {}

        manager.onLoad = () => {
            onLoadSubscribers.forEach(cb => cb())
        }

        manager.onProgress = (url, loaded, total) => {
            progress[url] = Math.trunc(loaded * 100 / total)

            const max = Math.max(...Object.values(progress))
            onProgressSubscribers.forEach(cb => cb(max))
        }

        return {
            onLoad: (callback: () => void) => {
                onLoadSubscribers.push(callback)
            },
            onProgress: (callback: (progress: number) => void) => {
                onProgressSubscribers.push(callback)
            }
        }
    }, [manager])
}

export const PlayerTexture = new TextureLoader(manager).load("perso.png");
PlayerTexture.wrapS = RepeatWrapping;
export const PlayerDuckTexture = new TextureLoader(manager).load("perso_duck.png");
PlayerDuckTexture.wrapS = RepeatWrapping;

export const Player2Texture = new TextureLoader(manager).load("perso2.png");
Player2Texture.wrapS = RepeatWrapping;
export const Player3Texture = new TextureLoader(manager).load("perso3.png");
Player3Texture.wrapS = RepeatWrapping;
export const Player4Texture = new TextureLoader(manager).load("perso4.png");
Player4Texture.wrapS = RepeatWrapping;

export const TerrainTexture = new TextureLoader(manager).load("map.png");
export const Terrain2Texture = new TextureLoader(manager).load("map_sub.png");

export const ObjectTrapTexture = new TextureLoader(manager).load("pincho.png");
export const ObjectBlockTexture = new TextureLoader(manager).load("bloque.png");

export const ObjectBerryTexture = new TextureLoader(manager).load("berry.png");
export const ObjectKeyTexture = new TextureLoader(manager).load("key.png");


export const Roboto = new FontLoader(manager).parse(JSONfont)