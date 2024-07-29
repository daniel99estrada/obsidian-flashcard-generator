# Stage 1: Build the React frontend
FROM node:16 AS frontend

# Set the working directory
WORKDIR /app

# Copy the React app source code to the container
COPY frontend/package*.json ./
COPY frontend/ ./

# Install dependencies and build the React app
RUN npm install
RUN npm run build

# Stage 2: Build the Flask backend
FROM python:3.11-slim AS backend

# Set the working directory
WORKDIR /app

# Copy the Flask app source code to the container
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend source code
COPY backend/ ./

# Copy the built React app from the previous stage
COPY --from=frontend /app/build ./static

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose port 5000 for the Flask app
EXPOSE 5000

# Command to run the Flask app
CMD ["flask", "run"]

