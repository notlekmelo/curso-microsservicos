FROM node:18.17
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["node", "src/app.ts"]