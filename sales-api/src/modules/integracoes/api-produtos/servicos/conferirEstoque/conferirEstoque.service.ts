import { ErrorHTTP } from "../../../../../infra/server/server";
import { IProduto } from "../../../../vendas/entidades/pedidos";
import axios from "axios";

export class ConferirEstoqueService {
    async executar(produtos: IProduto[], token: string) {
        
        let url = process.env.PRODUCT_API_URL || 'http://localhost:3001/api/produtos';

        await axios.post(url + '/conferir-estoque', 
            {produtos: produtos}, {
                headers: {
                    'x-access-token': token
                }
            }
        ).then((res) => {
            return true;
        }).catch((err) => {
            throw new ErrorHTTP(err.response.status, err.response.data.message)
        })
    }
}