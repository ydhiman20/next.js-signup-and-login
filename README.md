
# Next.js Signup and Login

A simple project demonstrating the implementation of user authentication using Signup and Login functionalities in Next.js. This project covers creating a user authentication system, handling form submissions, and managing user state in a Next.js application.

![Image](https://github.com/user-attachments/assets/8bce3ecf-1037-45e2-bf1b-8d0637eccf9c)

## Features

- User Registration (Signup)
- User Login
- Form validation for both login and signup
- Simple UI built with React
- Session management using JWT (or any other authentication method)
- Error handling and form feedback

## Tech Stack

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JWT**: JSON Web Tokens for handling authentication (or any preferred method).
- **Axios**: HTTP client for making requests to the server.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ydhiman20/next.js-signup-and-login.git
   ```

2. Navigate into the project directory:

   ```bash
   cd next.js-signup-and-login
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables. Create a `.env.local` file in the root of the project and add your environment variables like API URLs, JWT secrets, etc. For example:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   JWT_SECRET=your-secret-key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

- Go to the **Signup** page to create a new account by providing necessary user details.
- Go to the **Login** page to sign in using registered credentials.

## Contributing

Feel free to fork this repository and create a pull request with any improvements or features you'd like to contribute.
