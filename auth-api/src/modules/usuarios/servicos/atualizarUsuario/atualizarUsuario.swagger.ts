const atualizarUsuarioPath = {
    "/usuario": {
        put: {
            summary: "Atualiza um usuário",
            tags: ["Usuário"],
            description: "Atualiza um usuário para utilizar o sistema.",
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
                        $ref: "#/definitions/cadastrarUsuarioRequest"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Usuário atualizado",
                    schema: {
                        $ref: "#/definitions/atualizadoResponse"
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

export {
    atualizarUsuarioPath
}