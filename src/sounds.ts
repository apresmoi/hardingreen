const Terrain1 = new Audio('terrain1.mp3');
const Terrain2 = new Audio('terrain2.mp3');
const Intro = new Audio('Intro.mp3');
const Door = new Audio('Door.mp3');
const Jump = new Audio('Jump.mp3');
const Jump2 = new Audio('Jump2.mp3');
const Talk1 = new Audio('Talk1.mp3');
const Talk2 = new Audio('Talk2.mp3');
const Talk3 = new Audio('Talk3.mp3');
const Talk4 = new Audio('Talk4.mp3');
const TalkShort = new Audio('TalkShort.mp3');
const TalkLong = new Audio('TalkLong.mp3');
const TalkLong2 = new Audio('TalkLong2.mp3');
const TalkLong3 = new Audio('TalkLong3.mp3');
const TalkUltraLong = new Audio('TalkUltraLong.mp3');
const Shoot = new Audio('Shoot.mp3');
const Shoot2 = new Audio('Shoot2.mp3');

const sounds = {
    'Terrain1': Terrain1,
    'Terrain2': Terrain2,
    'Intro': Intro,
    'Door': Door,
    'Jump': Jump,
    'Jump2': Jump2,
    'Shoot': Shoot,
    'Shoot2': Shoot2,
    'Talk1': Talk1,
    'Talk2': Talk2,
    'Talk3': Talk3,
    'Talk4': Talk4,
    'TalkShort': TalkShort,
    'TalkLong': TalkLong,
    'TalkLong2': TalkLong2,
    'TalkLong3': TalkLong3,
    'TalkUltraLong': TalkUltraLong,
}

interface AudioHelper {
    play: () => Promise<void>
    stop: () => void
}

export const getSound = (name: string, loop: boolean = false): AudioHelper | undefined => {
    //@ts-ignore
    const sound: HTMLAudioElement | undefined = sounds[name]
    if (sound)
        return {
            play: () => {
                sound.loop = loop;
                return sound.play()
            },
            stop: () => {
                sound.pause()
            }
        }

    // switch (name) {
    //     case 'Terrain1':
    //         return {
    //             play: () => {
    //                 Terrain1.loop = true;
    //                 return Terrain1.play()
    //             },
    //             stop: () => {
    //                 Terrain1.pause()
    //             }
    //         }
    //     case 'Terrain2':
    //         return {
    //             play: () => {
    //                 Terrain2.loop = true;
    //                 return Terrain2.play()
    //             },
    //             stop: () => {
    //                 Terrain2.pause()
    //             }
    //         }
    //     case 'Intro':
    //         return {
    //             play: () => {
    //                 Intro.loop = true;
    //                 return Intro.play()
    //             },
    //             stop: () => {
    //                 Intro.pause()
    //             }
    //         }
    //     case 'Door':
    //         return {
    //             play: () => {
    //                 Door.loop = true;
    //                 return Door.play()
    //             },
    //             stop: () => {
    //                 Door.pause()
    //             }
    //         }
    // }
}