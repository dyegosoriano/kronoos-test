import filesystem from 'node:fs'
import { parse } from 'csv-parse'
import path from 'node:path'

import { formatCurrency } from 'utils'

const directory = path.resolve(__dirname, '..', 'data.csv')

const stream = filesystem.createReadStream(directory)
const parser = parse({ delimiter: ',' })

stream.pipe(parser)

parser
  .on('data', async line => {
    const vlPresta = formatCurrency(line[18])
    const vlTotal = formatCurrency(line[8])
    const vlMora = formatCurrency(line[19])

    console.log({ vlTotal, vlPresta, vlMora })
  })
  .on('end', () => console.log('Finish!'))
