import React from 'react';
import styles from './Page.module.css'
import Heading from "./Heading";
import {Divider, Layout, Typography} from "antd";
import HostedByGoogle from "./HostedByGoogle";

type PageProps = {}

/**
 * Renders children components in a page
 * @param props
 * @constructor
 */
const Page: React.FC<PageProps> = (props) => (
  <main className={styles.page}>
    <Layout>
      <Layout.Header style={{background: 'transparent', margin: '0', height: 'auto'}}>
        <Heading/>
      </Layout.Header>
      <Layout.Content>
        {props.children}
      </Layout.Content>
      <Layout.Footer>
        <HostedByGoogle/>
        <Divider><Typography.Link strong href='https://cryptoimpact.tech'>cryptoimpact.tech</Typography.Link> domain
          registered with <Typography.Link href="https://domain.com"
                                           target="_blank">domain.com</Typography.Link></Divider>
      </Layout.Footer>
    </Layout>
  </main>
);

export default Page;