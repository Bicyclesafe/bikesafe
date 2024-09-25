# Vaihe 1: build vaihe
FROM node:20-alpine AS build

RUN echo "buildi alkaa"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
# ARG VITE_API_URL: Määrittelee build-argumentin nimeltä VITE_API_URL.
# ENV VITE_API_URL=$VITE_API_URL: Asettaa ympäristömuuttujan build-vaiheessa, jotta se on käytettävissä käännöksen aikana.
ARG VITE_API_URL 
ENV VITE_API_URL=$VITE_API_URL

# Tulosta muuttujan arvo
RUN echo "VITE_API_URL on $VITE_API_URL"

RUN npm run build



# Vaihe 2: tuotanto vaihe
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]