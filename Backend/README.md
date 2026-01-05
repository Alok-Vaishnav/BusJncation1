# Bus Junction Dashboard - Backend API

Backend API for Bus Junction Dashboard with MongoDB Atlas integration.

## Features

- ✅ MongoDB Atlas Database
- ✅ Bus CRUD Operations
- ✅ Mongoose ODM
- ✅ CORS Enabled
- ✅ Error Handling
- ✅ Data Validation

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://gotam1875_db_user:alok@123@busjuction.8nuho7h.mongodb.net/busjuction
```

## Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Buses

#### Get All Buses
- **GET** `/api/buses`
- Returns: `{ success: true, count: number, data: [...] }`

#### Get Single Bus
- **GET** `/api/buses/:id`
- Returns: `{ success: true, data: {...} }`

#### Create Bus
- **POST** `/api/buses`
- Body:
```json
{
  "busName": "Express Bus",
  "busModel": "Volvo B11R",
  "busType": "AC",
  "seater": 42,
  "price": 2500,
  "busImage": "https://example.com/image.jpg"
}
```
- Returns: `{ success: true, message: "Bus created successfully", data: {...} }`

#### Update Bus
- **PUT** `/api/buses/:id`
- Body: (any fields to update)
```json
{
  "price": 2800,
  "seater": 38
}
```
- Returns: `{ success: true, message: "Bus updated successfully", data: {...} }`

#### Delete Bus
- **DELETE** `/api/buses/:id`
- Returns: `{ success: true, message: "Bus deleted successfully", data: {...} }`

## Bus Schema

```javascript
{
  busName: String (required),
  busModel: String (required),
  busType: Enum ["AC", "Non-AC"] (required),
  seater: Number [11, 21, 25, 28, 32, 36, 38, 41, 42] (required),
  price: Number (required),
  busImage: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Project Structure

```
Backend/
├── config/
│   └── db.js              (MongoDB connection)
├── controllers/
│   └── busController.js   (Business logic)
├── models/
│   └── Bus.js             (Mongoose schema)
├── routes/
│   └── busRoutes.js       (API routes)
├── .env                   (Environment variables)
├── .gitignore
├── package.json
├── README.md
└── server.js              (Entry point)
```

## Testing the API

### Using cURL

**Create Bus:**
```bash
curl -X POST http://localhost:5000/api/buses \
  -H "Content-Type: application/json" \
  -d '{
    "busName": "Luxury Coach",
    "busModel": "Volvo B11R",
    "busType": "AC",
    "seater": 42,
    "price": 3000
  }'
```

**Get All Buses:**
```bash
curl http://localhost:5000/api/buses
```

**Get Single Bus:**
```bash
curl http://localhost:5000/api/buses/{bus_id}
```

**Update Bus:**
```bash
curl -X PUT http://localhost:5000/api/buses/{bus_id} \
  -H "Content-Type: application/json" \
  -d '{"price": 3500}'
```

**Delete Bus:**
```bash
curl -X DELETE http://localhost:5000/api/buses/{bus_id}
```

## Notes

- No authentication required
- All data stored in MongoDB Atlas
- Auto-generated timestamps (createdAt, updatedAt)
- Field validation handled by Mongoose
- Ready to connect with React frontend
