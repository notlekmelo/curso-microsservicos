const buscarVendasPath = {
    "/vendas": {
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
            ],
            responses: {
                201: {
                    description: "Usuário criado",
                    schema: {
                        "$ref": "#/definitions/buscarVendasResponse"
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

const buscarVendasDefinitions = [
    {
        buscarVendasResponse: {
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
                        },
                        ModificadoEm: {
                            type: "string"
                        },
                        ModificadoPor: {
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
                    }
                }
            }
        }
    }
]

export {
    buscarVendasDefinitions, buscarVendasPath
}