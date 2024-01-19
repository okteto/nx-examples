FROM node:lts as dev
WORKDIR /usr/src/app

# install nx globally
RUN yarn global add nx
COPY package.json yarn.lock /usr/src/app/

# install the dependencies
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --ignore-scripts
COPY  . .

# build the assets using NX
RUN nx build --prod

# use NGINX to serve the assets
FROM bitnami/nginx

# copy the assets we build in the previous stage to the /app folder, where NGINX will serve them
COPY --from=build /usr/src/app/dist/apps/products /app/products
