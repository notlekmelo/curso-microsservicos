FROM node:18.17
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
CMD ["node", "dist/app.js"]