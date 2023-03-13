import { WebKwil } from 'kwil'

export const kwil = new WebKwil({
    kwilProvider: "https://provider.kwil.com",
    timeout: 10000,
    logging: true
})