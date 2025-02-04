FROM postgres:17.2-alpine3.21

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=copilot
ENV POSTGRES_DB=prisma

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
