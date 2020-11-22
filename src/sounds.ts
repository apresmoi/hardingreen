const Terrain1 = new Audio('terrain1.mp3');
const Terrain2 = new Audio('terrain2.mp3');
const Intro = new Audio('Intro.mp3');

interface AudioHelper {
    play: () => Promise<void>
    stop: () => void
}

export const getSound = (name: string): AudioHelper | undefined => {

    switch (name) {
        case 'Terrain1':
            return {
                play: () => {
                    Terrain1.loop = true;
                    return Terrain1.play()
                },
                stop: () => {
                    Terrain1.pause()
                }
            }
        case 'Terrain2':
            return {
                play: () => {
                    Terrain2.loop = true;
                    return Terrain2.play()
                },
                stop: () => {
                    Terrain2.pause()
                }
            }
        case 'Intro':
            return {
                play: () => {
                    Intro.loop = true;
                    return Intro.play()
                },
                stop: () => {
                    Intro.pause()
                }
            }
    }
}