FROM node:16-alpine as base

EXPOSE 4000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node

COPY . .

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base as prod
ENV NODE_ENV=production
RUN npm ci
RUN npm run build
CMD ["npm", "start"]
