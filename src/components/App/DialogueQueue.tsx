import { ArrayEmittable } from '../../util/ArrayEmittable'
import { SoundType } from '../../enum/SoundType'
// eslint-disable-next-line no-unused-vars
import { ReactNode } from 'react'

export interface Dialogue {
  title?: string
  body: string | ReactNode | Element
  sound?: SoundType
  dialogType?: 'full' | 'prompt'
  removeDefaultButton?: boolean
  textAlign?: 'left' | 'right' | 'center'
}

export interface DialogueQueue {
  dialogues: ArrayEmittable<Dialogue>
  alert: (d: Dialogue) => void
  error: (d: Dialogue) => void
  success: (d: Dialogue) => void
}

export const createDialogueQueue = (): DialogueQueue => {
  const dialogues = new ArrayEmittable<Dialogue>()

  return {
    dialogues,
    alert(d: Dialogue) {
      dialogues.unshift(d)
    },
    error(d: Dialogue) {
      dialogues.unshift({
        title: d.title,
        body: d.body,
        sound: SoundType.negative
      })
    },
    success(d: Dialogue) {
      dialogues.unshift({
        title: d.title,
        body: d.body,
        sound: SoundType.confirm
      })
    }
  }
}
