import * as React from 'react'
import styles from './styles.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  layout: 'full' | 'prompt' | 'list' | 'vertical'
  fill?: boolean
}

class Spacer extends React.Component {
  render() {
    return <div className={styles.spacer} />
  }
}

export class Layout extends React.Component<Props> {
  static Spacer = Spacer

  render() {
    const { children, layout, ...other } = this.props

    return (
      <div
        className={`${styles.layout} ${styles[layout]} ${
          this.props.fill ? styles.fill : ''
        }`}
        {...other}
      >
        {children}
      </div>
    )
  }
}
