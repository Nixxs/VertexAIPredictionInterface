# Step 1: Use the node base image
FROM node:16 as build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Serve the application
# Using serve to serve the static files
FROM node:16
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist /app
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
