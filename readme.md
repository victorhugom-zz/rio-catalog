# rio-catalog api **WIP**

## a simple catalog to store products

### It uses mongodb a `express-restify-mongoose` to create an api to manage products

---

- use

```npm run start --MONGO_URI=yourdatabase-uri --AUTH_SERVICE_URI=simpleAuthSrvcUri --NO_AUTH=false```


params:

MONGO_URI - you database url

AUTH_SERVICE_URI - a uri for a auth service

How the auth works:

Every request to this catalog receives a auth token, the service post the token to the auth service to validade it
```

 const options = {
    uri: `${AUTH_SERVICE_URI}/validate`,
    method: 'POST',
    json: {
      token
    }
  }
```

NO_AUTH - If this flag is true the catalog does not try to validate the request


#### METHODS

See [express-restify-mongoose](https://florianholzapfel.github.io/express-restify-mongoose/)

You can do all requests decribed there with `/api/v1/product`

##### Extra Methods

Since the product has and groupId you can get it grouped using:

```
/api/v1/product/grouped?category&query
```