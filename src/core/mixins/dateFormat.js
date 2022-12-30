import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale'

export default {
    filters: {
        formatDBDateToLocale(value) {
            if (value.length > 10) {
                value = value.substr(0, 10)
            }

            if (!value) {
                return '--'
            }

            let [y, m, d] = value.split('-')
            return format(
                new Date(y, m - 1, d),
                'PP',
                {locale: ptBR}
            )
        }
    }
}