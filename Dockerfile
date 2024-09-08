FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g vite --unsafe-perm
RUN npm install -g bun --unsafe-perm

EXPOSE 10000

CMD ["sh", "-c", "bun run client & bun run server"]
