import { ArrayEmittable } from '../../util/ArrayEmittable'
import { SoundType } from '../../enum/SoundType'

export interface Dialogue {
  title?: string
  body: string
  sound?: SoundType
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
      dialogues.push(d)
    },
    error(d: Dialogue) {
      dialogues.push({
        title: d.title,
        body: d.body,
        sound: SoundType.negative
      })
    },
    success(d: Dialogue) {
      dialogues.push({
        title: d.title,
        body: d.body,
        sound: SoundType.confirm
      })
    }
  }
}
