export const DEBUG = true;

export type Stage =
    'slide1' | 'slide2'
    | 'stage-1-intro'
    | 'terrain1'
    | 'stage-2-intro'
    | 'terrain2'
    | 'end'

export const doorPosition = (() => {
    const min = { x: 127, y: -7 }
    const max = { x: 137, y: -6 }
    return (v: { x: number, y: number }) => {
        return v.x > min.x && v.x < max.x && v.y > min.y && v.y < max.y
    }
})()

export const orangeNPCPosition = (() => {
    const min = { x: -44, y: -17.5 }
    const max = { x: -35, y: -15.5 }
    return (v: { x: number, y: number }) => {
        return v.x > min.x && v.x < max.x && v.y > min.y && v.y < max.y
    }
})()

export const yellowNPCPosition = (() => {
    const min = { x: -105, y: -22 }
    const max = { x: -80, y: -19 }
    return (v: { x: number, y: number }) => {
        return v.x > min.x && v.x < max.x && v.y > min.y && v.y < max.y
    }
})()

export const blueNPCPosition = (() => {
    const min = { x: -75, y: -125 }
    const max = { x: -65, y: -110 }
    return (v: { x: number, y: number }) => {
        return v.x > min.x && v.x < max.x && v.y > min.y && v.y < max.y
    }
})()