declare module react {
  namespace JSX {
    interface IntrinsicElements {
      'pfe-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
      'pfe-band': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
    }
  }
}