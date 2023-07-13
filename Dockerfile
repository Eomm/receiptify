# syntax = docker/dockerfile:1

######################
# Base image for all stages
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim as base
LABEL fly_launch_runtime="NodeJS"
WORKDIR /app

######################
# Frontend build stage
FROM base as frontend-build

WORKDIR /frontend
COPY --link projects/frontend/ .
RUN npm ci && npm run build

######################
# Backend build stage
FROM base as backend-build

WORKDIR /backend
COPY --link projects/backend/ .
RUN npm ci --omit=dev

###########################
# Final stage for app image
FROM base

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG WEBSITE_PATH
ENV WEBSITE_PATH=${WEBSITE_PATH}

ARG CORS_ORIGIN_REGEX
ENV CORS_ORIGIN_REGEX=${CORS_ORIGIN_REGEX}

ARG OAUTH_REDIRECT_URI
ENV OAUTH_REDIRECT_URI=${OAUTH_REDIRECT_URI}

COPY --chown=node:node --from=frontend-build /frontend/dist ${WEBSITE_PATH}
COPY --chown=node:node --from=backend-build /backend /app

USER node

CMD [ "npm", "run", "start" ]
