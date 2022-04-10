import express from "express";
import Cors from 'cors'

import authRoutes from './controllers/auth'
import * as apiController from "./controllers/api";
import { authMiddleware } from './controllers/auth-middleware'
import { DBService } from "./services/db.service";

const app = express();

app.use(Cors({ origin: true }))

// for parsing application/json
app.use(express.json())

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/', authRoutes)

// auth middleware for api routes
//app.use(authMiddleware)

app.get("/api/v1/restaurants", apiController.getRestaurants);
app.get("/api/v1/restaurants/:tid", apiController.getRestaurants);
app.get("/api/v1/restaurants/search/:term", apiController.getRestaurantsWithSearch);

app.get("/api/v1/users", apiController.getUsers);

app.put("/api/v1/users", apiController.putUsers);

app.get("/api/v1/reviews", apiController.getReviews);

app.post("/api/v1/reviews/:key", apiController.postReview);





//app.put adding/deleting

// start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

DBService.initialize().then(results => {


});

module.exports = app
