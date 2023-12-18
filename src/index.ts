import filesystem from 'node:fs'
import { parse } from 'csv-parse'
import path from 'node:path'

const directory = path.resolve(__dirname, '..', 'data.csv')

const stream = filesystem.createReadStream(directory)
const parser = parse({ delimiter: ',' })

stream.pipe(parser)

parser.on('data', async line => console.log(line)).on('end', () => console.log('Finish!'))
