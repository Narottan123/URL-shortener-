# Scalable URL Shortener Project

## Phase I

### Overview

URL shortening is a technique used to create shorter aliases for long URLs. These shorter aliases, called "short links," redirect users to the original long URLs. URL shortening is useful for saving space, making URLs easier to share, and reducing the likelihood of typing errors.

The goal of this project is to develop a scalable URL shortener application that can create short links for long URLs and redirect users to the original URLs.

### Installation
##  Clone the repository:

git clone https://github.com/Narottan123/URL-shortener-.git

Install dependencies: npm install

### Models

#### Url Model

```
{
  urlCode: { mandatory, unique, lowercase, trim },
  longUrl: { mandatory, valid URL },
  shortUrl: { mandatory, unique }
}
```

### APIs

#### POST /url/shorten

Create a short URL for a given original URL in the request body.

- The `baseUrl` must be the application's base URL.
- Return the shortened unique URL.
- Return HTTP status 400 for an invalid request.

#### GET /:urlCode

Redirect to the original URL corresponding to the given `urlCode`.

- Use a valid HTTP status code for redirection.
- Return a suitable error message for a URL not found.
- Return HTTP status 400 for an invalid request.

### Testing

- Create a new collection in Postman named "Project 2 Url Shortener".
- Add a separate request for each API endpoint in the collection.
- Name each request appropriately.

## Phase II

### Caching

- Implement caching for newly created links for 24 hours.
- When a short URL is used within the first 24 hours, retrieve the long URL from the cache instead of making a database call.
- Utilize caching to minimize database calls.

### Response

#### Successful Response Structure

```json
{
  "status": true,
  "data": {

  }
}
```

#### Error Response Structure

```json
{
  "status": false,
  "message": ""
}
```

#### Sample Response for URL Shorten API

```json
{
  "status": true,
  "data": {
    "longUrl": "http://www.abc.com/oneofthelongesturlseverseenbyhumans.com",
    "shortUrl": "http://localhost:3000/ghfgfg",
    "urlCode": "ghfgfg"
  }
}
```


