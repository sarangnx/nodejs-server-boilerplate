# USAGE

These scripts can be used to automate table creation and data insertion.

`migrations` directory contains scripts to create tables.  
`seeders` directory contains scripts to insert data to tables.

## Running the scripts
```bash
node scripts/run.js <command> [from] [to]
```

## Available commands
`migrate` : Run migrations  
`seed` : Run seeders

## Available options
`-u` or `--undo` : Undo migrations or seeds.  
`-a` or `--all` : Select all.  
`--from` : Name of migration or seed file.  
`--to` : Name of migration or seed file.  

## Example Usage
```bash
# run all migrations
node scripts/run.js migrate
node scripts/run.js migrate -a

#run from specific migration
node scripts/run.js migrate -a '005-users.js'

#run only specific migration
node scripts/run.js migrate '005-users.js'
```
