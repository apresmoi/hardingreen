import React, { useEffect, useState, Suspense } from 'react';
import { Game } from './components/Game'
import { Physics } from './components/Physics';
import { Player } from './components/Player';
import { useTexturesManager } from './textures';
import { Progress } from './layout/Progress'
import { Dialog } from './layout/Dialog';
import { DialogNPC } from './layout/DialogNPC';
import { Events } from './components/Events';
import { DeathDialog } from './components/DeathDialog';
import { DEBUG, Stage } from './constants';
import { Scene } from './components/Scene';
import { NPCDialogHandler } from './components/NPCDialogHandler';
import { Dialogs } from './dialogs';
import { getSound } from './sounds';

function App() {
  const [size, setSize] = useState({ width: 640, height: 400 })
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<Stage>(DEBUG ? 'terrain3' : 'slide1')
  const [retry, setRetry] = useState(0)

  const { onProgress, onLoad } = useTexturesManager()

  useEffect(() => {
    setSize({ width: 640, height: 600 })

    onProgress((progress) => {
      setTimeout(() => {
        setProgress(progress)
      }, 100);
    })

    onLoad(() => {
      // setLoaded(true)
      setSize({ width: 800, height: 600 })
    })
  }, [])

  useEffect(() => {
    if (!DEBUG && ['slide1', 'slide2', 'stage-1-intro', 'end'].includes(stage)) {
      const sound = getSound('Intro')
      sound?.play().catch(err => {
        if (err.toString().includes('play() failed')) {
          setRetry(retry + 1)
        }
      })
      return () => {
        sound?.stop()
      }
    }
  }, [retry, stage])

  return (
    <div className="webgl-game" style={{ width: size.width, height: size.height }}>
      <Events>
        <Game>
          <Physics>
            {loaded && stage.includes('terrain') && <Player />}
            {loaded && <Scene stage={stage} onChangeStage={(stage) => setStage(stage)} />}
          </Physics>
        </Game>
        <DeathDialog />
        <NPCDialogHandler />
        {!DEBUG && <>
          {loaded && stage === 'slide1' && <Dialog content="ClaxonDevs Presenta" timeout={3} onDisappear={() => setStage('slide2')} />}
          {loaded && stage === 'slide2' && <Dialog content="Hardingreen" timeout={3} onDisappear={() => setStage('stage-1-intro')} />}
        </>}
        {loaded && stage === 'stage-1-intro' && <Dialog content={Dialogs.start} timeout={5} onDisappear={() => setStage('terrain1')} />}
        {loaded && stage === 'stage-2-intro' && <Dialog content="Que sotano tan extraño" timeout={2} onDisappear={() => setStage('terrain2')} />}
        {loaded && stage === 'stage-3-intro' && <Dialog content="Nooooo ! que es esto?" timeout={2} onDisappear={() => setStage('terrain3')} />}
        {loaded && stage === 'end' && <Dialog content="Fin." />}
      </Events>
      {<Progress progress={progress} timeout={1} onDisappear={() => setLoaded(true)} />}
    </div>
  );
}

export default App;
