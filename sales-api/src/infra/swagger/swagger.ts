import {definitions, paths, tags} from "./configSwagger"

const swagger = {
    swagger: "2.0",
    info: {
        description: "Documentação Swagger da API Vendas",
        version: "1.0.0",
        title: "Vendas",
        contact: {
            email: "keltonmof@gmail.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    schemes: [
        "http"
    ],
    host: "localhost:3002",
    basePath: "/",
    tags,
    paths,
    definitions,
}

export default swagger