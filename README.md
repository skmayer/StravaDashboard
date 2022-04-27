# StravaDashboard

This react application helps user view their Strava activities.

## Authentication

Getting proper access to the Strava API was tricky. Read [Mark Needham's](https://www.markhneedham.com/blog/2020/12/15/strava-authorization-error-missing-read-permission/) article on how to get authenticated.

We used the following URL:

```
http://www.strava.com/oauth/authorize?client_id=[REPLACE_WITH_YOUR_CLIENT_ID]&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read
```

The scope is set to read when this API end point requires activity:read_all permissions, so the URL should instead read like this:

```
http://www.strava.com/oauth/authorize?client_id=[REPLACE_WITH_YOUR_CLIENT_ID]&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
```

And if we do that and use the authorisation code that it returns to generate an access token, it all works as expected.

## Setup

- Create a .env file with the value `REACT_APP_STRAVA_ACCESS_TOKEN=13a3c63a5a776cb36121aff9a00b176a18c1a0f8`
- Install dependencies `npm install`
- Run app `npm start`
