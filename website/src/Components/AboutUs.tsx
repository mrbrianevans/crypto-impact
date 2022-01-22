import React from 'react';
import '@patternfly/pfe-band'
import '@patternfly/pfe-icon'
import '@patternfly/pfe-cta'
import '@patternfly/pfe-icon-panel'
type AboutUsBandProps = {

}

const AboutUsBand: React.FC<AboutUsBandProps> = (props) => (
  <div>
    {/* @ts-ignore custom elements*/}
    <pfe-band color={'darker'}>
      {/* @ts-ignore custom elements*/}
      <pfe-icon-panel icon="rh-money" color={'lightest'}>
        <h1 slot="pfe-icon-panel--header">About us</h1>
        <p>Cambridge hackathon project for measuring the environmental impact of cryptocurrencies</p>
        {/* @ts-ignore custom elements*/}
        <pfe-cta slot="pfe-icon-panel--footer">
          <a href="https://github.com/mrbrianevans/crypto-impact">Learn more about Crypto Impact</a>
          {/* @ts-ignore custom elements*/}
        </pfe-cta>
        {/* @ts-ignore custom elements*/}
      </pfe-icon-panel>

      {/* @ts-ignore custom elements*/}
      <pfe-card slot="pfe-band--aside" color="lightest">
        <h3 slot="pfe-card--header">Aside slot</h3>
        <p>Content for a card that is in the aside slot.</p>
        {/* @ts-ignore custom elements*/}
      </pfe-card>

      {/* @ts-ignore custom elements*/}
    </pfe-band>

  </div>
);

export default AboutUsBand;