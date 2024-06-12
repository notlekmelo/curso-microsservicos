const deletarUsuarioPath = {
    "/usuario": {
        delete: {
            summary: "Deleta um usuário",
            tags: ["Usuário"],
            description: "Deleta um usuário",
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
                200: {
                    description: "Usuário excluído",
                    schema: {
                        $ref: "#/definitions/deletadoReponse"
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

export {deletarUsuarioPath}