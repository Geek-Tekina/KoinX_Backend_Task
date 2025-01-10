# KoinX Backend Task

This project is a server-side application that fetches and provides cryptocurrency data using Node.js, MongoDB, and CoinGecko API. It includes a background job to fetch the latest prices for Bitcoin, Ethereum, and Matic and offers APIs to retrieve the latest stats and calculate the standard deviation of price data.

---

## **Features**
- Background job running every minute to fetch cryptocurrency prices
- API to get the latest stats for a given cryptocurrency
- API to compute the standard deviation of cryptocurrency prices for the last 100 records

---

## **Prerequisites**
- **Node.js** installed (v16+ recommended)
- **MongoDB** instance (local or MongoDB Atlas)
- **Git** for version control

---

## **Getting Started**

### **1. Clone the Repository**
```bash
$ git clone https://github.com/Geek-Tekina/KoinX_Backend_Task
$ cd KoinX_Backend_Task
```

### **2. Install Dependencies**
```bash
$ npm install
```

### **3. Create a `.env` File**
Create a `.env` file in the root of the project with the following content:

```env
MONGO_URI=your_mongo_connection_string
```
Replace `your_mongo_connection_string` with your actual MongoDB connection string.

---

## **Running the Application Locally**
To start the application locally:
```bash
$ npm start
```

Visit `http://localhost:5000/` to check the home route and available API endpoints.

---

## **Deploying to Render**

1. **Create a Render Account**: [Sign up for Render](https://render.com/).
2. **Create a New Web Service**:
   - Connect your repository to Render.
   - Configure the following settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
3. **Add Environment Variables** in Render:
   - `MONGO_URI`: Add your MongoDB connection string.

4. **Deploy**: Render will automatically build and deploy your project.

---

## **API Endpoints**

### **Home Route**
**GET /**
- Returns a welcome message and available routes.

### **Get Latest Stats**
**GET /stats?coin={coin_name}**
- Query Params: `coin` (required) - one of `bitcoin`, `ethereum`, `matic-network`
- **Response**:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### **Get Standard Deviation**
**GET /deviation?coin={coin_name}**
- Query Params: `coin` (required) - one of `bitcoin`, `ethereum`, `matic-network`
- **Response**:
```json
{
  "deviation": 4082.48
}
```

---

