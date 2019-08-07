### sandbox

#### dev

- `npm i` install deps
- `npm run next -- -p 3000` start development

#### services

- `PORT=3000 npm run service-server` all services
- `MODE=webhooks PORT=3000 npm run service-server` only webhooks
- `MODE=strategies PORT=3000 npm run service-server` only strategies

#### hasura settings

- `HASURA_GRAPHQL_AUTH_HOOK` `http://<service-server>/webhooks/hasura-bearer`
- `HASURA_GRAPHQL_ADMIN_SECRET` `7777`

#### hasura migrations

##### filenames

```sh
<version>-<order>-<name>.ts
```

- <version> - version of release, 0.0.1 for example
- <order> - order for appying migrations, just a number 0-1000
- <name> - any a-z_- names, likely equal with table names

#### create new styleschool docker

- fork
- set variables
  - CONTAINER_NAME
  - GITLAB_PASSWORD
  - GITLAB_REPOSITORY
  - GITLAB_USERNAME
  - PORT
- create docker repository with name CONTAINER_NAME
- add to https://git.styleschool.ru/admin/runners/3 you repository