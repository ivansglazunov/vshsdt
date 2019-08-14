# sandbox

### about

- no server side logic, only reach+gql rendering
- all server logic in hasura remote schemas

- server gql render
- server-client gql cache
- client use server query results
- client override queries as subscriptions
- no data client refetching, only subscribing

### how to

#### dev

- `npm i` install deps
- `PORT=3000 npm start` start development

#### docker

By default docker run next server with all services inside. For more detailed logic need to build separated dockers.

#### services

Manual can be runned:

- `PORT=3000 npm start` with next app
- `PORT=3000 npm run service-server` only services

> Can add vars `MODE=webhooks` or `MODE="webhooks,passports"` for run only selected services.

> Yes, need best api.

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
  - POSTGRES
  - HASURA_ADMIN_SECRET
  - HASURA_URL
- create docker repository with name CONTAINER_NAME
- add to https://git.styleschool.ru/admin/runners/3 you repository

#### fork

- create fork
  - create **empty** repo and copy git url
  - git clone https://git.styleschool.ru/ivansglazunov/sandbox.git
  - git remote set-url origin <my-repo>
- merge from sandbox master
  - commit all changes
  - git remote add sandbox https://git.styleschool.ru/ivansglazunov/sandbox.git
  - git pull
  - git merge sandbox/master

> push always `git push origin`, with selected remote!
