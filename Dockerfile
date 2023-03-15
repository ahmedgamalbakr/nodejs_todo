FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# ENV port=2000
# EXPOSE $port
CMD [ "npm","start" ]