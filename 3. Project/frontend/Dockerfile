
FROM oven/bun:latest

WORKDIR /app
COPY  . .

RUN bun install

EXPOSE 3000
CMD [ "bun", "dev" ]

# docker buildx build -t farhansyah/rela-frontend --platform linux/amd64,linux/arm64 --push .