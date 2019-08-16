# sandbox

> sandbox code is universal

> current readme of deploying writed for styleschool infrastructure

### about

- no server side logic, only reach+gql rendering
- all server logic in hasura remote schemas

- [x] server gql render
- [x] server-client gql cache
- [x] client use server query results
- [x] client override queries as subscriptions
- [x] no data client refetching, only subscribing for changes
- [ ] passport + hasura tokens auth [@ivansglazunov]
- [ ] links + links_lists + triggers
- [ ] props based on links_lists
- [ ] access props based on links_lists

### how to

#### dev

- install
  - `npm i`
- set env
  - in .env
    ```
    PORT=3000
    POSTGRES=<POSTGRES>
    HASURA_ADMIN_SECRET=<HASURA_ADMIN_SECRET>
    HASURA_URL=<HASURA_URL>
    ```
  - in terminal `export PORT=3000 && export POSTGRES=<POSTGRES> && export HASURA_ADMIN_SECRET=<HASURA_ADMIN_SECRET> && export HASURA_URL=<HASURA_URL>`
- start
  - `npm start` with next app
  - `npm run service-server` only services

#### docker

By default docker run next server with all services inside. For more detailed logic need to build separated dockers.

> Can add vars `MODE=webhooks` or `MODE="webhooks,passports"` for run only selected services.

> Yes, need best api.

#### hasura settings

- `HASURA_GRAPHQL_AUTH_HOOK` `http://<service-server>/_webhooks/hasura-bearer`
- `HASURA_GRAPHQL_ADMIN_SECRET` `7777`

#### hasura migrations

##### filenames

```sh
<version>-<order>-<name>.ts
```

- <version> - version of release, 0.0.1 for example
- <order> - order for appying migrations, just a number 0-1000
- <name> - any a-z_- names, likely equal with table names

#### create new sandbox docker

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
  - git pull sandbox master
  - git merge sandbox/master

> push always `git push origin`, with selected remote!
