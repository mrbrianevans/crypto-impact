import React from 'react';
import styles from './Heading.module.css'
type HeadingProps = {

}

const Heading: React.FC<HeadingProps> = (props) => (
  <div>
    <h1 className={styles.heading}>Crypto Impact</h1>
  </div>
);

export default Heading;