import React from 'react';
import styles from './Heading.module.css'
import '@patternfly/pfe-icon'

type HeadingProps = {

}

const Heading: React.FC<HeadingProps> = (props) => (
  <div>
    <h1 className={styles.heading}>
      {/* @ts-ignore custom elements*/}
      <pfe-icon icon="rh-leaf" size="xl"/>
      Crypto Impact
    </h1>
  </div>
);

export default Heading;