
# MERN Chat App

A real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack with WebSocket functionality using Socket.IO.

## Features

- User authentication
- Real-time messaging
- Room-based chat

## Requirements

- Node.js (v14.x or higher)
- MongoDB Atlas account (or local MongoDB server)
- NPM (or Yarn)

## Installation

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rishi-Sudhakar/mern-chat-app.git
   cd mern-chat-app
   ```

2. **Navigate to the `server` directory and install dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Create a `.env` file in the `server` directory and add the following:**

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.t32oyhf.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

   Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
   (I have my credentials in the repo, do change it according to your credentials)
   Remember to allow your ip address to connect to the credentials.

4. **Start the backend server:**

   ```bash
   npm start
   ```

### Frontend

1. **Navigate to the `client` directory and install dependencies:**

   ```bash
   cd ../client
   npm install
   ```

2. **Start the frontend development server:**

   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000`.

## Project Structure

```
mern-chat-app/
├── client/         # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/         # Express backend
│   ├── models/     # Mongoose models
│   ├── routes/     # Express routes
│   ├── server.js   # Server entry point
│   ├── .env        # Environment variables
│   ├── package.json
│   └── ...
└── README.md
```

## Packages Used

### Backend

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.
- [cors](https://www.npmjs.com/package/cors): Middleware to enable Cross-Origin Resource Sharing (CORS).
- [socket.io](https://www.npmjs.com/package/socket.io): Real-time, bidirectional event-based communication.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.

### Frontend

- [react](https://www.npmjs.com/package/react): A JavaScript library for building user interfaces.
- [react-dom](https://www.npmjs.com/package/react-dom): Serves as the entry point of the DOM-related rendering paths.
- [axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js.
- [socket.io-client](https://www.npmjs.com/package/socket.io-client): Socket.IO client library.

## Usage

1. **Login**: Enter a username and password to log in. If the user does not exist, it will be created.
2. **Join a Room**: Enter a room name to join. If the room does not exist, it will be created.
3. **Chat**: Send messages in real-time to users in the same room.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.