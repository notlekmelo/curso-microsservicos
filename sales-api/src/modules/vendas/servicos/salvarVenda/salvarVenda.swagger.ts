const salvarVendaPath = {
    "/vendas": {
        post: {
            summary: "Cria uma venda",
            tags: ["Vendas"],
            description: "Cria uma venda que abaterá os valores no estoque em outra aplicação.",
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
                    in: "body",
                    name: "body",
                    description: "Objeto Resposta",
                    required: true,
                    schema: {
                        $ref: "#/definitions/salvarVendaRequest"
                    }
                }
            ],
            responses: {
                201: {
                    description: "Usuário criado",
                    schema: {
                        "$ref": "#/definitions/salvarVendaResponse"
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

const salvarVendaDefinitions = [
    {
        salvarVendaRequest: {
            type: "object",
            properties: {
                Produtos: {
                    type: "array",
                    items: {
                        type: 'object',
                        properties: {
                            CodigoProduto: {
                                type: "integer",
                            },
                            quantidade: {
                                type: "integer",
                            },
                        }
                    }
                },
                ValorTotal: {
                    type: "number"
                }
            }
        }
    },
    {
        salvarVendaResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        Produtos: {
                            type: "array",
                            items: {
                                type: 'object',
                                properties: {
                                    codigoProduto: {
                                        type: "integer",
                                    },
                                    quantidade: {
                                        type: "integer",
                                    },
                                }
                            }
                        },
                        ValorTotal: {
                            type: "number"
                        },
                        InseridoEm: {
                            type: "string"
                        },
                        InseridoPor: {
                            type: 'object',
                            properties: {
                                CodigoUsuario: {
                                    type: "integer"
                                },
                                Nome: {
                                    type: "string"
                                }
                            }
                        },
                        Status: {
                            type: "string"
                        } 
                    }
                }
            }
        }
    }
]

export {
    salvarVendaDefinitions, salvarVendaPath
}