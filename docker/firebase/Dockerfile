FROM node:23-alpine3.20

WORKDIR /app

RUN npm install -g firebase-tools

COPY . /app

EXPOSE 8080
EXPOSE 9099

CMD ["firebase", "emulators:start", "--only", "auth", "--project", "ignite-copilot"]

