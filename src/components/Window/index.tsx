import * as React from 'react'
import styles from './styles.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label?: string
  disableSound?: boolean
}

export class Window extends React.Component<Props> {
  render() {
    const { children, label, ...other } = this.props

    return (
      <div className={styles.window} {...other}>
        <div className={styles.content}>
          <div className={styles.label}>{label}</div>
          <div style={{ marginTop: 20 }}>{children}</div>
        </div>
      </div>
    )
  }
}
