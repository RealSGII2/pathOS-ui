import * as React from 'react'
import styles from './styles.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  layout: 'full' | 'prompt' | 'list'
}

export class Layout extends React.Component<Props> {
  render() {
    const { children, layout, ...other } = this.props

    return (
      <div className={`${styles.layout} ${styles[layout]}`} {...other}>
        {children}
      </div>
    )
  }
}
