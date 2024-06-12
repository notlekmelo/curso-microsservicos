import express, { Request, RequestHandler, Response } from "express";
import fs from 'fs';
import path from 'path';
import swaggerTools from 'swagger-tools';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import swagger from "../swagger/swagger";

const routes = express.Router();

function listarArquivosRotas(diretorio: string, arquivos?: Array<string>) : Array<string> {
    const diretorioModulos = path.resolve(__dirname, '../../modules');

    if (!arquivos)
        arquivos = []

    let modulos = fs.readdirSync(diretorio);

    for (let modulo in modulos) {
        let stat = fs.statSync(diretorio + '/' + modulos[modulo])
        // se for um diretorio efetua a chamada recursiva do metodo
        if (stat.isDirectory())
            listarArquivosRotas(diretorio + '/' + modulos[modulo], arquivos)
        //se for um arquivo verifica se o nome dele possui .routes.
        else {
            // busca somente os arquivos que possuem o nome .routes.
            if (modulos[modulo].includes('.routes.')) {
                let arquivo = diretorio + '/' + modulos[modulo]
                // trata o nome do arquivo antes de adiciona o mesmo no array
                arquivo = arquivo.replace(diretorioModulos, '')
                arquivos.push('../../modules' + arquivo)
            }
        }
    }

    return arquivos;
}

const rotas = listarArquivosRotas(path.resolve(__dirname, '../../modules'));
for (let rota of rotas) {
    require(String(rota))(routes)
}

const optionsSwagger: SwaggerUiOptions = {
    explorer: false,
    customSiteTitle: 'auth-api',
    swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        layout: 'BaseLayout',
        operationsSorter: 'method',
        tagsSorter: 'alpha',
    },
};

swaggerTools.initializeMiddleware(swagger, function (middleware) {
    routes.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(swagger, optionsSwagger));
    routes.use(middleware.swaggerMetadata() as RequestHandler);
    // Serve the Swagger documents and Swagger UI
    routes.use(middleware.swaggerUi() as RequestHandler);
})

routes.get('/', function (req : Request, res: Response) {
    res.send('Api escritório on-line');
});

export default routes;