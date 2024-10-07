FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

# CMD ["ECHO", "Frontend is running at http://localhost:8080"]

# CMD sh -c "npm run dev & sleep 5 && echo 'Frontend is running at http://localhost:8080' && wait"
