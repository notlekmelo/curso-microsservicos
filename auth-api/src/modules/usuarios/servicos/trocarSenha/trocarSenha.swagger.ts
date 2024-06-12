const trocarSenhaUsuarioPath = {
    "/usuario/alterar-senha": {
        post: {
            summary: "Altera a senha de um usuário",
            tags: ["Usuário"],
            description: "Altera a senha de um usuário",
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
                        $ref: "#/definitions/trocarSenhaUsuarioRequest"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Usuário criado",
                    schema: {
                        "$ref": "#/definitions/atualizadoResponse"
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

const trocarSenhaUsuarioDefinitions = [
    {
        trocarSenhaUsuarioRequest: {
            type: "object",
            properties: {
                CodigoUsuario: {
                    type: "integer"
                },
                SenhaAntiga: {
                    type: "string"
                },
                NovaSenha: {
                    type: "string"
                }
            }
        }
    }
]

export {
    trocarSenhaUsuarioDefinitions, trocarSenhaUsuarioPath
}