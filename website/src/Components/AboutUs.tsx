import React from 'react';
import {Collapse} from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

type AboutUsBandProps = {}

const AboutUsBand: React.FC<AboutUsBandProps> = (props) => (

  <Collapse defaultActiveKey={1} bordered={false} style={{background: '#0002'}}>
    <CollapsePanel key={1} header={"About us"}>
      <p>We are Crypto Impact</p>
      <p>Cambridge hackathon project for measuring the environmental impact of cryptocurrencies</p>
      <a href="https://github.com/mrbrianevans/crypto-impact">Learn more about Crypto Impact</a>
    </CollapsePanel>
  </Collapse>

);

export default AboutUsBand;