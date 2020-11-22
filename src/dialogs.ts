export const Dialogs = {
    start: 'Otro dia comienza en nuestra bella aldea de Hardingreen. Otro día más para explorar. Me pregunto que encontraré',
    yellow: [
        { text: 'Hola Gibi!', npc: true, color: '#d2af46', name: 'Fuli' },
        { text: 'Buen día Fuli!', npc: false, color: '#458670', name: 'Gibi', },

        { text: 'Espero que podamos recolectar las bayas Ubu, ya estámos en temporada', npc: true, color: '#d2af46', name: 'Fuli' },
        { text: 'Tienes razón! Que deliciosas son las bayas!', npc: false, color: '#458670', name: 'Gibi' },
        { text: 'Sabes por donde encontrarlas ?', npc: false, color: '#458670', name: 'Gibi' },

        { text: 'Se encuentran cerca de las ruinas Ubu.', npc: true, color: '#d2af46', name: 'Fuli' },
        { text: 'Las ruinas Ubu ?', npc: false, color: '#458670', name: 'Gibi' },

        { text: 'Si, son los restos de una aldea más antigua que la nuestra, la de nuestros antepasados.', npc: true, color: '#d2af46', name: 'Fuli' },
        { text: 'Ten cuidado, las ruinas guardan sus secretos. Tres bayas serán las suficientes.', npc: true, color: '#d2af46', name: 'Fuli' },
        { text: 'Sólo tres bayas ? Manos a la obra!', npc: false, color: '#458670', name: 'Gibi' },
    ],
    orange: [
        { text: 'Buen día Gibi!', npc: true, color: '#b10b13', name: 'Juki' },
        { text: 'Juki! Buen día!', npc: false, color: '#458670', name: 'Gibi' },
        {
            text: 'Hoy visité al gran Nuji, el más antiguo de la aldea.Me contó que antes de nosotros, otros seres habitaban hardingreen.Y que en algún momento sin saberlo los antiguos pobladores simplemente desaparecieron.',
            npc: true, color: '#b10b13'
            , name: 'Juki'
        },
        { text: 'Increíble! No lo sabia.', npc: false, color: '#458670', name: 'Gibi' },
        { text: 'Me contó que entre sus ruinas, todavía existen tesoros y secretos sin descubrir.', npc: true, color: '#b10b13', name: 'Juki' },
        { text: 'Wow! Que emocionante! Espero algún día poder verlos!', npc: false, color: '#458670', name: 'Gibi' }
    ],
    sphinx: [
        { text: 'Alto! Detente ahi!', npc: true, color: '#b10b13', name: 'Guardiana' },
        { text: 'Aaaah! Quien eres ?', npc: false, color: '#458670', name: 'Gibi' },
        { text: 'Soy Eagipur, la guardiana de la maquina.', npc: true, color: '#b10b13', name: 'Guardiana' },
        { text: 'Mi nombre es gibi.Solo salí a recojer bayas y me adentre en las rui...', npc: false, color: '#458670', name: 'Gibi' },
        { text: 'Deten tu voz! Sólo responde a mis preguntas.Y podrás entrar a la cámara de la máquina.', npc: true, color: '#b10b13', name: 'Guardiana' },
        { text: 'Que máquina ?', npc: false, color: '#458670', name: 'Gibi' },
        {
            text: 'La maquina es un mecanismo complejo, que mantiene el orden del mundo.Y yo su guardiana me encargo que continue segura.Responde a mis preguntas o no serás bienvenido.',
            npc: true, color: '#b10b13',
            name: 'Guardiana'
        },
        { text: 'Si señora guardiana! Continue...', npc: false, color: '#458670', name: 'Gibi' },
        {
            text: 'Acertijo 1\n Qué ser, provisto de una sola voz, camina en cuatro patas por el dia, en dos patas por la tarde y en tres patas por la noche ?',
            npc: true, color: '#b10b13',
            response: ['hombre'],
            name: 'Guardiana'
        },
        {
            text: 'Intruso del hombre! Te sentencio a la muerte!',
            action: 'death',
            npc: true, color: '#b10b13',
            name: 'Guardiana'
        },
        {
            npc: true, color: '#b10b13',
            text: 'Magnifico! Tu si eres del circulo, sigamos con la proxima pregunta...',
            name: 'Guardiana'
        },
        {
            text: 'Acertijo 2\n Existen dos hermanas, una engendra a la otra y a su vez engendra a la primera.',
            npc: true, color: '#b10b13',
            response: ['dia', 'noche'],
            name: 'Guardiana'
        },
        {
            text: 'Aaah Farsante! Tus dias se han terminado!',
            action: 'death',
            npc: true, color: '#b10b13',
            name: 'Guardiana'
        },
        {
            npc: true, color: '#b10b13',
            text: 'Maravilloso! Eres un erudito, pasemos a la ultima pregunta...',
            name: 'Guardiana'
        },
        {
            text: 'Acertijo 3\nQue es lo que siempre se mueve, pero nunca cambia de lugar ?',
            npc: true, color: '#b10b13',
            response: ['tiempo'],
            name: 'Guardiana'
        },
        {
            text: 'Abzurdo! Tu tiempo es caput!',
            action: 'death',
            npc: true, color: '#b10b13',
            name: 'Guardiana'
        },
        {
            npc: true, color: '#b10b13',
            text: 'Excelso! Tu si mereces entrar! Adelante pequeño ser.',
            name: 'Guardiana'
        },
        {
            text: 'Gracias guardiana!', npc: false, color: '#458670', name: 'Gibi',
            action: 'end-game'
        },
    ]
}