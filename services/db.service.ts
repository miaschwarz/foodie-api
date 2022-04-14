

import * as fs from 'fs';
import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript'
import { Op } from "sequelize";

import { Message } from '../models/message';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { Review } from '../models/review';

console.log(`dir: ${process.cwd()}`);

let envfile = './.keys/db-ticketing';
try {
  if (fs.existsSync(envfile)) {
    console.log('have env file');
  }
} catch (err) {
  console.log('no env file');
}
dotenv.config({ path: envfile });
console.log(process.env.DB_USER);

let port = Number.parseInt(process.env.DB_PORT);
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: port,
  logging: false,
  timezone: '-00:00'
});

sequelize.addModels([Message, Restaurant, User, Review]);

export class DBService {

  static initialized = false;

  constructor() {
  }

  static async initialize() {

    if (!DBService.initialized) {
      try {
        DBService.initialized = true;
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

  }

  static async loadRestaurants() {

    let where = {
    }
    let restaurants = await Restaurant.findAll({
      where: where,
      limit: 10
    })
    return restaurants;
  }


  static async getRestaurantsWithSearch(term: string) {
    console.log(`getRestaurantsWithSearch(), term: ${term}`);
    let where = {
      key: term
    }
    let restaurants = await Restaurant.findAll({
      where: where
    })
    console.log(restaurants);
    return restaurants;
  }


  static async findOrCreate(message: any) {
    await Message.findOrCreate({
      where: {
        fid: message.fid,
        tid: message.tid
      },
      defaults: message
    });
  }

  static async loadUsers() {

    let where = {
    }
    let users = await User.findAll({
      where: where,
      limit: 10
    })
    return users;
  }

  static async loadUser(email: string) {
    console.log(`loadUser(), email: ${email}`);
    let where = {
      email: email
    }
    let user = await User.findOne({
      where: where
    })
    return user;
  }

  static async saveUser(user: User) {
    await user.save();
  }

  // static async loadReview(rid: number) {
  //   console.log(`loadReview(), review: ${rid}`);
  //   let where = {
  //     rid: rid
  //   }
  //   let reviews = await Review.findAll({
  //     where: where
  //   })
  //   console.log(reviews);
  //   return reviews;
  // }

  static async loadReviews(uid, rid) {

    let where = {
      user_id: uid
    }
    if (rid) {
      where['restaurant_id'] = rid
    }
    let reviews = await Review.findAll({
      where: where,
      limit: 10
    })
    console.log(rid, uid, where);
    return reviews;
  }

  static async saveReview(review: Review) {
    await review.save();
  }

  static async postReview(review: any) {
    console.log(review);
    await Review.findOrCreate({
      where: {
        user_id: review.user_id,
        restaurant_id: review.restaurant_id,
      },
      defaults: review
    });
  }



}
