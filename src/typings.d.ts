/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  // eslint-disable-next-line prettier/prettier
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> { }

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}
