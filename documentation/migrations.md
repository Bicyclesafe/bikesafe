# 101 on Migrations


**The following scripts are located in package.json**

*There can not be file named "all" in migrations-folder, because of the script.*

Run all migrations up

```
npm run migrate:up all
```

Run all migrations down

```
npm run migrate:down all
```

Run all migration files up to specific migration file (UP)

```
npm run migrate:up MIGRATION_FILE_NAME.ts
```

Run all migration files up to specific migration file (DOWN)

```
npm run migrate:down MIGRATION_FILE_NAME.ts
```