import React from 'react';
import styles from './Page.module.css'
import Heading from "./Heading";
type PageProps = {

}

/**
 * Renders children components in a page
 * @param props
 * @constructor
 */
const Page: React.FC<PageProps> = (props) => (
  <main className={styles.page}>
    <Heading/>
    {props.children}
  </main>
);

export default Page;