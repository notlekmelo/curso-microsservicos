FROM node:18.17
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3002
CMD ["node", "src/app.ts"]