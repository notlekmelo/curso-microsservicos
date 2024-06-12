const buscarVendasProdutosPath = {
    "/vendas/produto/{codigoProduto}": {
        get: {
            summary: "Retorna vendas",
            tags: ["Vendas"],
            description: "Retornas as vendas de um usuário logado.",
            produces: [
                "application/json"
            ],
            consumes: [
                "application/json"
            ],
            parameters: [
                {
                    name: "x-access-token",
                    in: "header",
                    type: "string",
                    required: true
                },
                {
                    name: "codigoProduto",
                    in: "path",
                    type: "integer",
                    required: true
                },
            ],
            responses: {
                201: {
                    description: "Usuário criado",
                    schema: {
                        "$ref": "#/definitions/buscarVendasProdutosResponse"
                    }
                },
                401: {
                    description: "Unauthorized",
                    schema: {
                        $ref: "#/definitions/InvalidResponse"
                    }
                },
                422: {
                    description: "Parâmetro inválido",
                    schema: {
                        $ref: "#/definitions/InvalidResponse"
                    }
                },
                500: {
                    description: "Erro no servidor de banco de dados",
                    schema: {
                        $ref: "#/definitions/InvalidResponse"
                    }
                }
            }
        }
    }
}

const buscarVendasProdutosDefinitions = [
    {
        buscarVendasProdutosResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        codigosVendas: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        }
    }
]

export {
    buscarVendasProdutosPath, buscarVendasProdutosDefinitions
}