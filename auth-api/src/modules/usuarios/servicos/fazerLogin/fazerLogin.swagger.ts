const fazerLoginPath = {
    "/usuario/login": {
        post: {
            summary: "Efetua login",
            tags: ["Usuário"],
            description: "Autentica o usuário com senha",
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
                        $ref: "#/definitions/loginRequest"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Usuário logado",
                    schema: {
                        $ref: "#/definitions/loginResponse"
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

const fazerLoginDefinitions = [
    {
        loginResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        token: {
                            type: "string"
                        } 
                    }
                }
            }
        }
    },
    {
        loginRequest: {
            type: "object",
            properties: {
                Usuario: {
                    type: "string"
                },
                Senha: {
                    type: "string"
                }
            }
        }
    }
]

export {
    fazerLoginPath,
    fazerLoginDefinitions
}