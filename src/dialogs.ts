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
            action: 'terrain-3-access'
        },
    ],
    machine: [
        { text: 'BIP...BIP...ERRORGf43EXXE...BIP...FGG21', name: 'Maquina', npc: true },

        { text: 'Hola me llamo Gibi, vos sos la maquina ? Qué es todo esto ?', name: 'Gibi', npc: false },

        { text: 'YO CONTROLO TODO, CONTROLAR ES MI FUNCION.BIP.BIP.FAIL.ENERGY\n ERES PARTE DE ESTO, TODOS SOMOS PARTE.BIP.ESTA INSTALACION PRODUCE JUGO DE FRUTA.BIP.CADA GENERACION MAS JUGO PARA EL MASTRO.BIP.ERROR F44.ERROR.', name: 'Maquina', npc: true },

        { text: 'Más jugo de bayas Ubu ? Que deliciosas son ? Quién es el maestro ?', name: 'Gibi', npc: false },

        { text: 'NO ERROR, JUGO DE LOS HABITANTES DE HARDINGREEN, JUGO RENOVABLE PARA EL MAESTRO.BIP BIP..ERROR...', name: 'Maquina', npc: true },

        { text: 'QUEEE ? No puede ser cierto, somos seres pacíficos, no dañamos a nadie.Mis amigos y familia...debo advertirles.', name: 'Gibi', npc: false },

        { text: 'MUY TARDE, YA ESTAS AQUI.ES EL TIEMPO INDICADO...BIP YA ES TIEMPO DE COSECHAR Y EXPRIMIR...BIP...ERROR..BIP...GHG34G', name: 'Maquina', npc: true },

        { text: 'Cómo es posible ? Nadie sabe nada de esto.Quizás le pasó lo mismo a los antiguos pobladores.Es un ciclo repetido, parte del mismo mecanismo! No puede ser....NOOOO...', name: 'Gibi', npc: false },

        { text: 'PREPARANDO SISTEMA DE RECOLECCION...', name: 'Maquina', npc: true },
        { text: 'BIP...ERROR..BIP...BIP...', name: 'Maquina', npc: true },

        {
            name: 'Gibi',
            text: 'Rapido debo decidir, o permito que el ciclo continue o apago la maquina.Qué podré hacer?',
            options: [
                'No hacer nada',
                'Desenchufar la maquina.'
            ]
        },
        {
            name: 'Narrador',
            text: 'Los habitantes de Hardingreen fueron licuados y transformados en el mejor jugo multifruta inteligente del mercado Funpoku, el ciclo se reinicia, vuelven a crecer los frutos con inteligencia adquirida para mejorar sus propiedades.',
            npc: true,
            big: true,
        },
        {
            name: 'Narrador',
            text: '',
            action: 'end-game'
        },
        {
            text: 'Pasaron los años y junto a los nuevos frutos consiguió abandonar la máquina y poblar una pequeña isla al norte de Madagascar, que rebautizó Nuevo Hardingreen.',
            name: 'Narrador',
            npc: true,
            big: true,
        },
        {
            text: 'Esta historia la contaron sus hijos y sus nietos para que las nuevas generaciones entiendan la importancia de saber los inicios de su legado y que mirar hacia un futuro mejor',
            name: 'Narrador',
            npc: true,
            big: true,
        },
        {
            name: 'Narrador',
            text: '',
            action: 'end-game'
        },
    ]
}