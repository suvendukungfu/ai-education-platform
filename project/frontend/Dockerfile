FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set env for build time if needed
ENV NEXT_PUBLIC_API_URL=http://localhost:5000/api

EXPOSE 3000

CMD ["npm", "run dev"]
