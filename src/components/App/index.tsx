import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import { Dialogue } from './DialogueQueue'
// eslint-disable-next-line no-unused-vars
import { ArrayEmittable } from '../../util/ArrayEmittable'
import styles from './styles.module.scss'
import { Layout } from '../Layout'
import { Window } from '../Window'
import { Button } from '../Button'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  background?: 'station'
  dialogueQueue?: ArrayEmittable<Dialogue>
}

interface ToolbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

class ToolBar extends React.Component<ToolbarProps> {
  render() {
    const { children, ...other } = this.props

    return (
      <div className={styles.toolbar} {...other}>
        {children}
      </div>
    )
  }
}

class SoundManager extends React.Component {
  render() {
    return (
      <div className={styles.soundManager}>
        <audio
          src='https://cdn.realsgii2.dev/pathOS/sound/back.wav'
          id='OsBackSound'
        />

        <audio
          src='https://cdn.realsgii2.dev/pathOS/sound/forward.wav'
          id='OsForwardSound'
        />

        <audio
          src='https://cdn.realsgii2.dev/pathOS/sound/negative.wav'
          id='OsNegativeSound'
        />

        <audio
          src='https://cdn.realsgii2.dev/pathOS/sound/confirm.wav'
          id='OsConfirmSound'
        />

        <audio
          src='https://cdn.realsgii2.dev/pathOS/sound/error.wav'
          id='OsErrorSound'
        />
      </div>
    )
  }
}

interface AppState {
  dialogues: Dialogue[]
}

export class App extends React.Component<Props, AppState> {
  public static ToolBar = ToolBar
  public static SoundManager = SoundManager

  public state: AppState = {
    dialogues: []
  }

  public updateDialogues(dialogues: Dialogue[]) {
    this.setState({ dialogues })
  }

  public componentDidMount() {
    if (this.props.dialogueQueue) {
      this.props.dialogueQueue.addListener(
        'change',
        this.updateDialogues.bind(this)
      )
    }
  }

  public componentWillUnmount() {
    if (this.props.dialogueQueue) {
      this.props.dialogueQueue.removeListener(
        'change',
        this.updateDialogues.bind(this)
      )
    }
  }

  render() {
    const { children, dialogueQueue, ...other } = this.props

    const currentDialogue = this.state.dialogues[0]
    const showingDialogue = currentDialogue !== undefined

    if (showingDialogue && typeof document !== "undefined" && currentDialogue.sound !== undefined) {
      (document.getElementById(`Os${currentDialogue.sound}Sound`) as HTMLAudioElement).play()
    }

    return (
      <div className={styles.app} {...other}>
        {!showingDialogue && children}
        {showingDialogue && (
          <React.Fragment>
            <Layout layout='prompt'>
              <Window label={currentDialogue.title} style={{ textAlign: 'center' }}>
                <p>{currentDialogue.body}</p>

                <Button
                  onClick={() => this.props.dialogueQueue?.removeAtIndex(0)}
                  style={{ padding: "0 16px" }}
                >
                  Okay
                </Button>
              </Window>
            </Layout>
          </React.Fragment>
        )}
      </div>
    )
  }
}
