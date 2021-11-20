# It'z Different CTF Platform 

CTF Platform built with [Next.js](https://nextjs.org/) React Framework. 

## File Structure

### `webApp/public`

Contains assets that are publically accessible used throughout the application.

### `webApp/pages`

Contains typescript files, each file representing a unique web page. 

### `webApp/components`

Contains React Components.

### `webApp/styles`

Contains Sass stylesheets. 


### `webApp/prisma`

Contains prisma files used to set up a working database used to login to the platform. 

## Setup with [Docker](https://www.docker.com/) 

1) Ensure that you have docker and docker-compose
2) Copy `env.example` to `.env` and enter your configuration
``` 
$ docker-compose up

```

## Setup (Manual)

The platform is built with the following versions

```bash
$ node -v
v16.13.0
$ npm -v
8.1.0
```

### Install dependencies

``` 
$ cd webApp/
$ npm install
```

### Create `.env` file to store secrets

User Authentication was implemented via the NextAuth library. To configure the platform authentication, please create a `.env` file with the following contents:

```
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>

EMAIL_SERVER=smtp://<USERNAME>:<PASSWORD>@<SMTP SERVER>:587
EMAIL_FROM=It'z Different CTF Authentication <noreply@example.com>

NEXTAUTH_URL=<SITE URL>
```