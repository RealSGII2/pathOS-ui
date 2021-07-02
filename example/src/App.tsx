import React, { useState } from 'react'

import { App as OsApp, Button, Window, Layout } from 'path-os-ui'
import 'path-os-ui/dist/index.css'

import queue from './dialogueQueue'
import { useEffect } from 'react'

const PageSettings: {
  dialogType: "full" | "prompt",
  removeDefaultButton: boolean,
  textAlign: 'left' | 'center' | 'right'
} = {
  dialogType: 'full',
  removeDefaultButton: true,
  textAlign: 'left'
}

const App = () => {
  const [backDisabled, setBackDisabled] = useState(
    queue.dialogues.getLength() === 0
  )

  useEffect(() => {
    const onChange = () => {
      setBackDisabled(queue.dialogues.getLength() === 0)
    }

    queue.dialogues.addListener('change', onChange)

    return () => {
      queue.dialogues.removeListener('change', onChange)
    }
  }, [])

  const SystemStatus = (
    <>
      [ 2103 / 05 / 09 ] <br />
      UPSILON#7185783 <br />
      Run setup... <br />
      WARNING: Remove access denied <br />
      WARNING: Servers offline <br />
      WARNING: Main power suspended <br />
      -&gt; Initiate WAU setup A.41iu <br />
      ... program unreliable ... <br />
      ... denied ... <br />
      Emergency systems: 13 days remaining
    </>
  )

  const Progress = (
    <>
      [ 2104 / 05 / 09 ] <br />
      UPSILON#61633 <br />
      %(/) <br />
      thetaCache:graphs:legacy-DM_SJ <br />
      unfold... <br />
      Sub_Simon Jarret <br />
      28xY, terminalScan <br />
      Aut_DavidMunshi2015v1 <br />
      Toronto <br />
      =6(2@(573/3/6 <br />
      -&gt; ApPS <br />
      ... operation unavailable <br />
      -&gt;4416cWAUcf77 <br />
      ... complete ... <br />
    </>
  )

  const Inventory = (
    <>
      INVENTORY: Basic Ductile Suits 1-6 <br />
      <br />
      BDS #1 - OK <br />
      BDS #2 - OK <br />
      BDS #3 - Unknown contamination! <br />
      BDS #4 - OK <br />
      BDS #5 - In use <br />
      BDS #6 - In use <br />
      <br />
      Note: All Haimatsu Power Suits stored at Omicron
    </>
  )

  const ToolChip = (
    <Layout layout='list' fill>
      <p>
        Welcome back, Louise Meuron (UPSILON). <br />
        <br />
        Your omnitool is in perfect condition, but not fitted with a Tool Chip.
        <br />
        <br />
        Note that without a tool chip your FST-Kit will be unavailable,
        including your cross-site security access.
        <br />
        <br />
        To continue using your designated privileges, please insert a Tool Chip
        and run an Update.
      </p>

      <Layout.Spacer />

      <Layout layout='vertical'>
        <p>TOOL CHIP: Not Inserted</p>

        <Layout.Spacer />

        <Button style={{ padding: '0.6rem 1.8rem', fontSize: 28 }} disabled>
          Update
        </Button>
      </Layout>
    </Layout>
  )

  const CortexChip = (
    <Layout layout='list' fill>
      <p>
        Welcome back, Louise Meuron (UPSILON). <br />
        <br />
        Your omnitool is in perfect condition, but not fitted with a custom
        Cortex Chip.
        <br />
        <br />
        You are currently being serviced by the default on-board intelligence:
        "Helper Jane". <br />
        Note that installing a Cortex Chip will override the helper and may
        severely alter your user experience.
      </p>

      <Layout.Spacer />

      <Layout layout='vertical'>
        <p>CORTEX CHIP: Not Inserted</p>

        <Layout.Spacer />

        <Button style={{ padding: '0.6rem 1.8rem', fontSize: 28 }} disabled>
          Update
        </Button>
      </Layout>
    </Layout>
  )

  const OmnitoolMenu = (
    <Layout layout='list'>
      <Button
        onClick={() =>
          queue.alert({
            title: 'Manage Tool Chip',
            body: ToolChip,
            ...PageSettings
          })
        }
      >
        Manage Tool Chip
      </Button>

      <Button
        onClick={() =>
          queue.alert({
            title: 'Manage Cortex Chip',
            body: CortexChip,
            ...PageSettings
          })
        }
      >
        Manage Cortex Chip
      </Button>

      <Button
        onClick={() =>
          queue.error({
            title: 'Not Connected',
            body: 'There is no tool box connected to the current terminal.'
          })
        }
      >
        Unlock Tool Box
      </Button>

      <Button disabled>Orientation</Button>
    </Layout>
  )

  let isDisabled = {}
  if (backDisabled) isDisabled['disabled'] = true

  return (
    <>
      <OsApp dialogueQueue={queue.dialogues}>
        <Layout layout='prompt'>
          <Window label='Welcome'>
            <Layout layout='list'>
              <Button
                onClick={() =>
                  queue.alert({
                    title: 'System Status',
                    body: SystemStatus,
                    ...PageSettings
                  })
                }
              >
                System Status
              </Button>

              <Button
                onClick={() =>
                  queue.alert({
                    title: '3progresS6ScAN-SJ',
                    body: Progress,
                    ...PageSettings
                  })
                }
              >
                3progresS6ScAN-SJ
              </Button>

              <Button
                onClick={() =>
                  queue.alert({
                    title: 'Omnitool',
                    body: OmnitoolMenu,
                    removeDefaultButton: true
                  })
                }
              >
                Omnitool
              </Button>

              <Button
                onClick={() =>
                  queue.alert({
                    title: 'System Status',
                    body: Inventory,
                    ...PageSettings
                  })
                }
              >
                Inventory
              </Button>
            </Layout>
          </Window>
        </Layout>
      </OsApp>

      <OsApp.ToolBar>
        <Button.BackButton
          {...OsApp.ToolBar.getBackButtonProps(queue.dialogues)}
          {...isDisabled}
        >
          Back
        </Button.BackButton>
      </OsApp.ToolBar>

      <OsApp.SoundManager />
    </>
  )
}

export default App
