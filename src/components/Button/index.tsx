import * as React from 'react'
import styles from './styles.module.scss'

interface Props {
  label?: string
  disableSound?: boolean
  disabled?: boolean
}

class BackButton extends React.Component<
  Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> {
  constructor(props: Props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this)
  }

  onMouseDown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (typeof document !== 'undefined' && !this.props.disableSound) {
      const elem = document.getElementById('OsBackSound')
      if (elem) (elem as HTMLAudioElement).play()
    }

    if (this.props.onMouseDown) this.props.onMouseDown(e)
  }

  render() {
    const { children, label, ...other } = this.props

    return (
      <button
        className={`${styles.button} ${styles.back}`}
        {...other}
        onMouseDown={(e) => this.onMouseDown(e)}
      >
        {children || label}
      </button>
    )
  }
}

export class Button extends React.Component<
  Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> {
  public static BackButton = BackButton

  constructor(props: Props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this)
  }

  onMouseDown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (typeof document !== 'undefined' && !this.props.disableSound) {
      const elem = document.getElementById('OsForwardSound')
      if (elem) (elem as HTMLAudioElement).play()
    }

    if (this.props.onMouseDown) this.props.onMouseDown(e)
  }

  render() {
    const { children, label, ...other } = this.props

    return (
      <button
        className={styles.button}
        {...other}
        onMouseDown={(e) => this.onMouseDown(e)}
      >
        {children || label}
      </button>
    )
  }
}
