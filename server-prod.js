// Import the express and vite-express modules
import express from "express"
import ViteExpress from "vite-express"

// Create an instance of the express application
const app = express()

// Define a route for the application
app.get("/message", (_, res) => res.send("Hello from express!"))

// Configure vite-express to serve the dist folder
ViteExpress.serve(app, "dist")

// Start the server on port 80
ViteExpress.listen(app, 80, () => console.log("Server is listening on port 80..."))

// Start the server on port 443
ViteExpress.listen(app, 443, () => console.log("Server is listening on port 443..."))