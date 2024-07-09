# Node.js User Authentication API

This project is a RESTful API for user authentication built with Node.js, Express, and PostgreSQL. It provides endpoints for user registration, login, and accessing protected routes.

## Features

- User registration with password hashing
- User login with JWT token generation
- Protected routes using JWT authentication
- Input validation
- PostgreSQL database integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have a PostgreSQL database set up

## Installing Node.js User Authentication API

To install the API, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies:
4. Create a `.env` file in the root directory and add the following variables:
   Replace `your_postgresql_connection_string` with your actual database URL and `your_jwt_secret` with a secure random string.

## Using Node.js User Authentication API

To use the API, follow these steps:

1. Start the server:
2. The API will be available at `http://localhost:3000`

### API Endpoints

- POST `/api/users/register`: Register a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- POST `/api/users/login`: Login a user
  - Body: `{ "email": "john@example.com", "password": "password123" }`

- GET `/api/users/me`: Get user information (protected route)
  - Header: `x-auth-token: YOUR_JWT_TOKEN`

## Contributing to Node.js User Authentication API

To contribute to the project, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Contact

If you want to contact me, you can reach me at `<your_email@example.com>`.

## License

This project uses the following license: [MIT License](<link_to_license>).
