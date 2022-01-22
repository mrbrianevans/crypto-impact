FROM node:lts

WORKDIR /

COPY . .

RUN cd website && npm config set loglevel warn \
              # To mitigate issues with npm saturating the network interface we limit the number of concurrent connections
                  && npm config set maxsockets 5 \
                  && npm config set progress false \
     && npm ci && npm run build && cd ../server && npm ci &&  npm run build

ENTRYPOINT ["npm", "run", "start"]