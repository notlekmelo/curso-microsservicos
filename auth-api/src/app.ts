import server from './infra/server/server';
import { createInitialData } from './infra/server/conection/baseRepository';

createInitialData();

server.listen(3000, () => {
  console.log(`[SERVER] Running at http://localhost:3000`);
});