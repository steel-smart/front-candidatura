export default {
    filters: {
        formatMoney(value) {
            if(!value) {
                value = 0
            }
            return Number(value).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        },
        formatMoneyPY(value) {
            if(!value) {
                value = 0
            }
            return Number(value).toLocaleString('es-ES', {style: 'currency', currency: 'PYG'})
        },
        formatMoneyMoeda(value) {
            if(!value.valor) {
                value.valor = 0
            }
            if(value.finan_moeda_id == 1){
            return Number(value.valor).toLocaleString('es-ES', {style: 'currency', currency: 'PYG'})
            }
            if(value.finan_moeda_id == 2){
                return Number(value.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                }
        }
    }
}