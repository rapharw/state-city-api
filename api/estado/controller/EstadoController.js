module.exports = function (app) {
    "use strict";
    let apiEstado = process.env.APP_API_ESTADO;

    /**
     * Lista os Estados
     */
    app.get(`${apiEstado}/`, function (req, res) {
        app.logger.info("Listando estados");
        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.findAll()
            .then(result => {
                app.logger.info(`Lista de estados: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Busca um Estado pelo ID
     */
    app.get(`${apiEstado}/:idEstado`, function (req, res) {
        app.logger.info("Buscando estado");
        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.findById(req.params.idEstado)
            .then(result => {
                app.logger.info(`Estado: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Cadastra um Estado
     */
    app.post(`${apiEstado}`, function(req, res){
        app.logger.info("Cadastrando estado");

        let estado = req.body;
        estado.dataCriacao = new Date();
        estado.dataUltAlt = new Date();

        let estadoRepository = app.estado.repository.EstadoRepository;

        estadoRepository.save(estado)
            .then(result => {
                app.logger.info(`Estado salvo com sucesso: ${result}`);
                res.json(result);
            })
            .catch(error => res.json(error));
    });


    /**
     * Edita um Estado
     */
    app.put(`${apiEstado}/:idEstado`, function(req, res) {
        app.logger.info("Editando estado");

        let estadoRepository = app.estado.repository.EstadoRepository;
        let estado = req.body;

        // estadoRepository.findById(req.params.idEstado)
        //     .then(result => {
        //         app.logger.info(`Estado: ${result}`);
        //
        //         estado.id = result.id;
        //         estado.dataUltAlt = new Date();
        //         estadoRepository.save(estado)
        //             .then(result => {
        //                 app.logger.info(`Estado editado com sucesso: ${result}`);
        //                 res.json(result);
        //             })
        //             .catch(error => res.json(error));
        //
        //     })
        //     .catch(error => res.json(error));

        estado.dataUltAlt = new Date();
        estadoRepository.edit(req.params.idEstado, estado)
                        .then(result => {
                            app.logger.info(`Estado: ${result}`);
                            res.json(result);
                        }).catch(error => res.json(error))
    });
}