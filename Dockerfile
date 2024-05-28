FROM node:18

WORKDIR /app/
ADD ./ /app/

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 5173
ENTRYPOINT ["pnpm", "dev"]