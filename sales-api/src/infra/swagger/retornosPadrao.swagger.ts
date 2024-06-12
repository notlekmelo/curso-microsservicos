const retornosPadraoDefinitions = [
    {
        atualizadoResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        Atualizado: {
                            type: "boolean"
                        } 
                    }
                }
            }
        }
    },
    {
        deletadoReponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                data: {
                    type: "object",
                    properties: {
                        Deletado: {
                            type: "boolean"
                        } 
                    }
                }
            }
        }
    },
    {
        InvalidResponse: {
            type: "object",
            properties: {
                status: {
                    type: "integer"
                },
                erro: {
                    type: "string"
                }
            }
        }
    }
]

export default retornosPadraoDefinitions