### sandbox

#### dev

- `npm i` install deps
- `npm run next -- -p 3000` start development

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