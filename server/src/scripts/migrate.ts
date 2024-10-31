import { migrator } from '../util/db'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const migrationsPath = path.resolve(__dirname, '../migrations')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: (line: string) => {
    const files = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.ts'))
    const hits = files.filter(file => file.startsWith(line))
    return [hits.length ? hits : files, line]
  }
})

const runMigration = async (direction: 'up' | 'down', fileName?: string) => {
  try {
    if (direction === 'up') {
      if (fileName === 'all') {
        await migrator.up()
        console.log('All migrations have been run.')

      } else if (fileName) {
        await migrator.up({ to: fileName })
        console.log(`Migration up to ${fileName} completed.`)
      } else {
        await migrator.up()
        console.log('Migrations up to date.')
      }
    } else if (direction === 'down') {
      if (fileName === 'all') {
        await migrator.down()
        console.log('All migrations have been reverted.')
      } else if (fileName) {
        await migrator.down({ to: fileName })
        console.log(`Migration down to ${fileName} completed.`)
      } else {
        await migrator.down()
        console.log('Migrations have been reverted.')
      }
    } else {
      console.error('Unknown direction. Use "up" or "down".')
    }
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    rl.close()  // Tämä sulkee readline-liittymän suorituksen lopussa
  }
}

const args = process.argv.slice(2)
const direction = args[0] as 'up' | 'down'
const fileName = args[1]

if (fileName) {
  runMigration(direction, fileName)
    .catch( error => {console.error("Migration failed", error)})
} else {
  rl.question('Enter the migration file name: ', (input) => {
    runMigration(direction, input)
      .catch( error => {console.error("Migration failed", error)})
    rl.close()
  })
}
