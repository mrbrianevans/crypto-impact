import React from 'react';
import {Badge, Divider, Image,} from "antd";
import googleLogo from '../../assets/google-cloud.png'

type HostedByGoogleProps = {}

const HostedByGoogle: React.FC<HostedByGoogleProps> = (props) => (
  <Divider type={"horizontal"}>
    <Badge.Ribbon text={'Proudly hosted by'} placement={'start'} style={{marginTop: -5}}>
      <a href={'https://cloud.google.com/run'} target={'_blank'}>
        <Image src={googleLogo} preview={false} width={200}/></a>
    </Badge.Ribbon>
  </Divider>

)

export default HostedByGoogle
