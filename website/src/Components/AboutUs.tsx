import React from 'react';
import {Collapse, Typography} from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";



type AboutUsBandProps = {}

const AboutUsBand: React.FC<AboutUsBandProps> = (props) => (

  <Collapse defaultActiveKey={1} bordered={false} style={{background: '#0002'}}>
    <CollapsePanel key={1} header={"About us"}>
      <p>
        We're on a mission to help crypto investors understand the true cost of their transactions.
        Not just the financial cost, but also the <Typography.Text>environmental</Typography.Text> cost.
      </p>
      <p>By using realtime blockchain data, we model the estimated energy consumption to process the transactions linked
        to your Bitcoin wallet.</p>
      <p>Our product can be used by everyday investors to better understand the <Typography.Text
        strong>sustainability</Typography.Text> of their <Typography.Text strong>alternative
        asset</Typography.Text> investments.</p>
      <Typography.Link href="https://github.com/mrbrianevans/crypto-impact" target="_blank">❯❯ We are open
        source! </Typography.Link>
    </CollapsePanel>
  </Collapse>

);

export default AboutUsBand;