import server from './infra/server/server';

const porta = process.env.PORT || 3002

server.listen(porta, () => {
  console.log(`[SERVER] Running at http://localhost:${porta}`);
});