const parametrosBuscaBase = [
    {
        name: "x-access-token",
        in: "header",
        type: "string",
        required: true
    },
    {
        in: "query",
        name: "colunas",
        description: "Colunas que serão trazidas na busca",
        required: false,
        type: "string"
    },
    {
        in: "query",
        name: "filtros",
        description: "Filtros utilizados na busca. Formato: Campo=Valor; Separador de filtros utilizar ponto e vírgula, colocar aspas nas strings e pode-se utilizar NOTIN IN, LIKE ou NOT para personalizar",
        required: false,
        type: "string"
    },
    {
        in: "query",
        name: "page",
        description: "Página de resultados da busca",
        required: false,
        type: "integer"
    },
    {
        in: "query",
        name: "limit",
        description: "Limite de resultados por página na busca",
        required: false,
        type: "integer"
    }
]

export default parametrosBuscaBase