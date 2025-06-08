# 🎯 Bounty Hunting System

A modern, secure, and scalable backend system for managing bounty hunting operations across the galaxy. Built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- 🔐 Secure authentication with JWT
- 🌍 Multi-planet bounty management
- 👤 User roles and permissions
- 📝 Rich bounty details with image support
- 🔍 Advanced filtering and search
- 📊 Real-time status tracking
- 🛡️ Built-in security features

## 🛠️ Technologies

- **Backend Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Testing**: Jest
- **API Documentation**: OpenAPI/Swagger

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd bounty-hunting-system
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
Haha, ask me about .env
```

4. Start the development server:

```bash
npm run dev
```

## 📚 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── interfaces/     # TypeScript interfaces
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## 🔐 Authentication

### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

## 🎯 Bounty Management

### Create Bounty

```http
POST /api/bounties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "targetName": "string",
  "planet": "string",
  "reward": number,
  "imageUrl": "string" // optional
}
```

### Get Bounty List

```http
GET /api/bounties
```

Query Parameters:

- `planet`: Filter by planet
- `status`: Filter by status (open/accepted/completed)

### Get Bounty by ID

```http
GET /api/bounties/:id
```

### Accept Bounty

```http
POST /api/bounties/:id/accept
Authorization: Bearer <token>
```

### Get My Bounties

```http
GET /api/bounties/my
Authorization: Bearer <token>
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet security headers
- Input validation
- MongoDB injection protection

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run endpoint tests:

```bash
npm run test-endpoints
```

## 📝 API Response Format

### Success Response

```json
{
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "error": "Error message here"
}
```

### Common HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the powerful database
- TypeScript team for the type safety
