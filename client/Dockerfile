FROM node
RUN mkdir -p /home/app
COPY package*.json /home/app
WORKDIR /home/app
RUN npm install

# Declara la variable de entorno
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ARG NODE_ENV
ENV NODE_ENV=NODE_ENV

COPY . /home/app
EXPOSE 3000
CMD ["npm", "start"]   