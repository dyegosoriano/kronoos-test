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
    const vlPresta = utils.formatCurrency(line[18])
    const vlTotal = utils.formatCurrency(line[8])
    const vlMora = utils.formatCurrency(line[19])
    const nrCpfCnpj = line[4]

    const isValidDocument = utils.validateCPF(nrCpfCnpj) || utils.validateCNPJ(nrCpfCnpj)

    console.log({ nrCpfCnpj, vlTotal, vlPresta, vlMora, isValidDocument })
  })
  .on('end', () => console.log('Finish!'))
