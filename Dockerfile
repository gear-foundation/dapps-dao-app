FROM node:16-alpine AS builder
WORKDIR /dao
ARG REACT_APP_NETWORK  \
    REACT_APP_CONTRACT_ERC  \
    REACT_APP_CONTRACT_DAO  \
    REACT_APP_REGISTRY_TYPES
ENV REACT_APP_NETWORK=${REACT_APP_NETWORK} \
    REACT_APP_CONTRACT_ERC=${REACT_APP_CONTRACT_ERC} \
    REACT_APP_CONTRACT_DAO=${REACT_APP_CONTRACT_DAO} \
    REACT_APP_REGISTRY_TYPES=${REACT_APP_REGISTRY_TYPES}
COPY . /dao
RUN npm install --force
RUN npm run build

FROM nginx:alpine
RUN rm -vf /usr/share/nginx/html/*
COPY --from=builder /dao/build /usr/share/nginx/html
