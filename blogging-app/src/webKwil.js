import { WebKwil } from 'kwil'

export const kwil = new WebKwil({
    kwilProvider: "https://provider.kwil.com:443",
    timeout: 10000,
    logging: true
})