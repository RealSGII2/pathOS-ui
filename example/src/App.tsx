import React from 'react'

import { App as OsApp, Button, Window, Layout } from 'path-os-ui'
import 'path-os-ui/dist/index.css'

import queue from './dialogueQueue'

const App = () => {

  return (
    <>
      <OsApp dialogueQueue={queue.dialogues}>

        <Layout layout='prompt'>
          <Window label='Welcome'>
            <Layout layout='list'>
              <Button>
                System Status
              </Button>

              <Button>
                3progresS6ScAN-SJ
              </Button>

              <Button>
                Omnitool
              </Button>

              <Button>
                Inventory
              </Button>
            </Layout>
          </Window>

          <Window label='Testing'>
            <Layout layout='list'>
              <Button>
                Alert
              </Button>
            </Layout>
          </Window>
        </Layout>

      </OsApp>

      <OsApp.ToolBar>
        <Button.BackButton>
          Back
        </Button.BackButton>
      </OsApp.ToolBar>

      <OsApp.SoundManager />
    </>
  )
}

export default App
