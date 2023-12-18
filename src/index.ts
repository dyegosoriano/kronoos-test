import filesystem from 'node:fs'
import { parse } from 'csv-parse'
import path from 'node:path'

import * as utils from 'utils'

const directory = path.resolve(__dirname, '..', 'data.csv')

const stream = filesystem.createReadStream(directory)
const parser = parse({ delimiter: ',' })

stream.pipe(parser)

parser
  .on('data', async line => {
    const vlPresta = utils.formatCurrency(+line[18])
    const vlTotal = utils.formatCurrency(+line[8])
    const vlMora = utils.formatCurrency(+line[19])

    const nrCpfCnpj = line[4]
    const valid_document = utils.validateCPF(nrCpfCnpj) || utils.validateCNPJ(nrCpfCnpj)

    const installments = +line[7]
    const total_value = +line[8]

    const installment_value = +(total_value / installments).toFixed(2)
    const valid_installment = installment_value === +line[18]

    console.log({
      valid_installment,
      valid_document,
      vlPresta,
      vlTotal,
      vlMora
    })
  })
  .on('end', () => console.log('Finish!'))
