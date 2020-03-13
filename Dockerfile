FROM keymetrics/pm2:12-alpine

RUN mkdir -p /opt/app/
WORKDIR /opt/app/
COPY . .
RUN npm install
EXPOSE 3000
CMD ["pm2-runtime", "start", "./process.yml"]

