import { Response, Request } from 'express';
import { DBService } from '../services/db.service';



export let getRestaurants = async (req: Request | any, res: Response) => {
  try {
    let restaurants = await DBService.loadRestaurants();
    return res.send({ restaurants })
  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let getRestaurantsWithSearch = async (req: Request | any, res: Response) => {
  try {
    console.log(req)
    let restaurants = await DBService.getRestaurantsWithSearch(req.params.term);
    return res.send({ restaurants })
  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let getUsers = async (req: Request | any, res: Response) => {
  try {
    let email = req.query.email;
    if (email) {
      let user = await DBService.loadUser(email);
      return res.send({ user })
    } else {
      let users = await DBService.loadUsers();
      return res.send({ users })
    }

  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let putUsers = async (req: Request | any, res: Response) => {
  try {
    let email = req.query.email;
    if (email) {
      let user = await DBService.loadUser(email);
      if (user) {
        let b = req.body;
        user.saved = b.saved;
        user.friends = b.friends;
        await DBService.saveUser(user);
      }
      return res.send({ user })
    } else {
      return res.send({})
    }
  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let deleteUsers = async (req: Request | any, res: Response) => {
  try {
    let email = req.query.email;
    if (email) {
      let user = await DBService.loadUser(email);
      if (user) {
        let b = req.body;
        if (b.saved) {
          if (user.saved) {
            user.saved = '';
          }
          await DBService.saveUser(user);
        }
      }
      return res.send({ user })
    } else {
      return res.send({})
    }

  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let getReviews = async (req: Request | any, res: Response) => {
  try {
    let uid = req.query.uid;
    let rid = req.query.rid;
    let reviews = await DBService.loadReviews(uid, rid);
    return res.send({ reviews })
  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}

export let postReview = async (req: Request | any, res: Response) => {
  try {
    let b = req.body;
    let review = {
      user_id: b.uid,
      restaurant_id: b.rid,
      review: b.review,
      rating: b.rating
    }
    await DBService.postReview(review);
    return res.send({ review })
  } catch (e) {
    console.error(e)
    return res.send({ error: e })
  }
}




