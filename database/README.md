# PostgreSQL: murphy-ecommerce

## Setting up tools.

You will need tools to connect and to run script/queries on the database.

Choose and download a tool with a graphical interface:
* [SQL Electron](https://sqlectron.github.io/)
* [pgAdmin](https://www.pgadmin.org/)

or install the CLI:
* [psql](https://www.postgresql.org/docs/current/app-psql.html)

## Creating a local instance

Download and install [PostgreSQL](https://www.postgresql.org/). Then, start a server.

Resources:
* [macOS Guide.](https://www.youtube.com/watch?v=wTqosS71Dc4)
* [Windows Guide](https://www.youtube.com/watch?v=0n41UTkOBb0)

## Creating an instance use Docker container.

Install [Docker](https://www.docker.com/) on your machine.

Create an account with docker.

On your terminal run the following command:
```
docker login
```

After login, run the following command to create container:

```
docker run --name murphy-development -p 5432:5432 -e POSTGRES_PASSWORD=murphy123 -e POSTGRES_DB=murphy_ecommerce -d postgres
```

Resources:
* [Create an instance of PostgreSQL using Docker Container](https://www.youtube.com/watch?v=RdPYA-wDhTA&t=381s)
* [Docker PostgreSQL image](https://hub.docker.com/_/postgres)

## Connecting to Cloud database.
There is a database running on the cloud. We are using AWS RDS to host it. No keys/addresses will be uploaded to this repository. Look on Discord for the details on how to connect to it.

Resources:
* [Create a free PostgreSQL database in AWS RDS.](https://www.youtube.com/watch?v=I_fTQTsz2nQ&t=55s)
* [Resolve "error: no pg_hba.conf entry for host" with RDS.](https://stackoverflow.com/questions/76899023/rds-while-connection-error-no-pg-hba-conf-entry-for-host)