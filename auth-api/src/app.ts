import server from './infra/server/server';
import { createInitialData } from './infra/server/conection/baseRepository';

createInitialData();

const porta = process.env.PORT || 3000

server.listen(porta, () => {
  console.log(`[SERVER] Running at http://localhost:${porta}`);
});