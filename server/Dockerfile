FROM node
RUN mkdir -p /home/app
COPY package*.json /home/app
WORKDIR /home/app

RUN npm install
RUN npm install -g sequelize-cli
# Para esperar a que la base de datos esté disponible antes de ejecutar las migraciones y el servidor
#RUN npm install -g wait-port

COPY . /home/app
# Para esperar a que la base de datos esté disponible antes de ejecutar las migraciones y el servidor
EXPOSE 3001
# Esperar a que la base de datos esté disponible antes de ejecutar las migraciones y el servidor
#CMD ["sh", "-c", "wait-port shopping-db:3306 && npm run db:deploy && npm start"]
CMD ["sh", "-c", "npm run db:deploy && npm start"]
