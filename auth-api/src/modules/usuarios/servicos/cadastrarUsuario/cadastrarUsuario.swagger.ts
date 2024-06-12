const cadastrarUsuarioPath = {
    "/usuario": {
        post: {
            summary: "Cria um  usuário",
            tags: ["Usuário"],
            description: "Cria um usuário para permitir utilizar o sistema",
            produces: [
                "application/json"
            ],
            consumes: [
                "application/json"
            ],
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Objeto Resposta",
                    required: true,
                    schema: {
                        $ref: "#/definitions/cadastrarUsuarioRequest"
                    }
                }
            ],
            responses: {
                201: {
                    description: "Usuário criado",
                    schema: {
                        "$ref": "#/definitions/cadastrarUsuarioResponse"
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

const cadastrarUsuarioDefinitions = [
    {
        cadastrarUsuarioRequest: {
            type: "object",
            properties: {
                Nome: {
                    type: "string"
                },
                Senha: {
                    type: "string"
                },
                Usuario: {
                    type: "string"
                },
                CPF: {
                    type: "string"
                }
            }
        }
    },
    {
        cadastrarUsuarioResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        CodigoUsuario: {
                            type: "integer"
                        } 
                    }
                }
            }
        }
    }
]

export {
    cadastrarUsuarioDefinitions, cadastrarUsuarioPath
}