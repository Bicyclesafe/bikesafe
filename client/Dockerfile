# Vaihe 1: build vaihe
FROM node:20-alpine AS build

RUN echo "Buildataan Openshiftiin tarkoitetulla Dockerfilella"

WORKDIR /app

COPY package*.json ./

# Kuin "run npm install", mutta asentaa vain tuotantoon tarvittavat riippuvuudet.
RUN npm ci

COPY . .
# ARG VITE_API_URL: Määrittelee build-argumentin nimeltä VITE_API_URL.
# ENV VITE_API_URL=$VITE_API_URL: Asettaa ympäristömuuttujan build-vaiheessa, jotta se on käytettävissä käännöksen aikana.
ARG VITE_API_URL 
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY

ARG VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN

ARG VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID

ARG VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET

ARG VITE_FIREBASE_MESSAGE_SENDER_ID
ENV VITE_FIREBASE_MESSAGE_SENDER_ID=$VITE_FIREBASE_MESSAGE_SENDER_ID

ARG VITE_FIREBASE_APP_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

ARG VITE_FIREBASE_MEASUREMENT_ID
ENV VITE_FIREBASE_MEASUREMENT_ID=$VITE_FIREBASE_MEASUREMENT_ID


# Tulosta muuttujan arvo
RUN echo "VITE_API_URL on $VITE_API_URL"

RUN npm run build



# Vaihe 2: tuotantovaihe
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Kopioi nginx-konfiguraatio tiedosto oletusarvoisen tilalle
COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 8080

# Käynnistä nginx palvelin, siten, että se pysyy etualalla
CMD ["nginx", "-g", "daemon off;"]
