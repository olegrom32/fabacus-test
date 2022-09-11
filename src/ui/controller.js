import {TokenNotFoundError} from "../application/error.js";

export default class Controller {
  constructor(
    generateTokenHandler,
    checkTokenHandler,
    redeemTokenHandler,
  ) {
    this.generateTokenHandler = generateTokenHandler;
    this.checkTokenHandler = checkTokenHandler;
    this.redeemTokenHandler = redeemTokenHandler;
  }

  generateTokens(req, res) {
    let n = req.query.tokens > 0 ? req.query.tokens : 1;
    // TODO upper bound? Let's assume 100 is max
    if (n > 100) {
      n = 100;
    }

    // Call handler (business logic)
    this.generateTokenHandler.handle(n).then(d => {
      res.status(200);
      res.json({created: d.createdAt.toISOString(), token: d.tokens});
    }).catch(e => {
      console.error(e);

      res.status(500);
      res.json({message: e.toString()});
    });
  }

  checkToken(req, res) {
    const token = req.params.token;

    // Call handler (business logic)
    this.checkTokenHandler.handle(token).then(d => {
      res.status(200);
      res.json({status: d.status()});
    }).catch(e => {
      console.error(e);

      // Task description does not list 404 as a possible response code but I guess it has to be here
      if (e === TokenNotFoundError) {
        res.status(404);
        res.send();
      } else {
        // Respond with 500 for any unexpected error
        res.status(500);
        res.json({message: e.toString()});
      }
    })
  }

  // Call handler (business logic)
  redeemToken(req, res) {
    const token = req.params.token;

    this.redeemTokenHandler.handle(token).then(d => {
      // If token is processable, return OK. Return 410 Gone otherwise
      if (d.processable) {
        res.status(200);
        res.json({result: 'ok'});
      } else {
        res.status(410);
        res.json({result: d.token.status()});
      }
    }).catch(e => {
      console.error(e);

      // Task description does not list 404 as a possible response code but I guess it has to be here
      if (e === TokenNotFoundError) {
        res.status(404);
        res.send();
      } else {
        // Respond with 500 for any unexpected error
        res.status(500);
        res.json({message: e.toString()});
      }
    })
  }
}
