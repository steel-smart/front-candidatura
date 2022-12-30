import ApiService from "@/core/services/api.service";

export const searchAddressMixin = {
    methods: {
        loadEstadoOptions({searchQuery, callback}, pais_id = '') {
            ApiService.get(`estado/pesquisa/${searchQuery}/${pais_id}`)
                .then(({data}) => {
                    let options = data.map(estado => ({id: estado.id, label: estado.nome}))
                    callback(null, options)
                })
        },
        loadCidadeOptions({searchQuery, callback}, estado_id = '') {
            ApiService.get(`cidade/pesquisa/${searchQuery}/${estado_id}`)
                .then(({data}) => {
                    let options = data.map(estado => ({id: estado.id, label: estado.nome}))
                    callback(null, options)
                })
        },
    }
}