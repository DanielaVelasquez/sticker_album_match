# User

### GET /user/exists/username/:username
Returns information wheter the username exists. The request should be sent as the following example, where the username is jhondoe:

```Javascript
/user/exists/username/jhondoe
```

The response is as follows, exist would be 'true' if the username provided is registered and false otherwise:

```Javascript
{
    exist: true/false
}
```

#### Status codes

|Status Code|Description|
|---|---|
|`200`|Successful|
|`500`|Internal server error|

### PATCH /user/update/id/:id
This request updates a user.  
You should provide the id  to update as URL parameter e.g.

```Html
/user/update/id/1
```

And the user's update in request body as follows:

```Javascript
{
    userName: 'jhondoe',
    latitudUser : 19.23463,
    longitudUser: 23.46234
}
```

The response is as follows:

```Javascript
{
    field: fieldCode,
    error: errorCode
}
```

#### Field codes, error codes and status codesv

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`400`|1|1|Missing data to process the request|
|`400`|100|102|Username is taken|
|`400`|100|100|Username is too short, minimun 3 characters|
|`400`|100|101|Username is too long, maximun 16 characters|
|`400`|101|104|Latitud is not a number|
|`400`|102|104|Longitude is not a number|
|`500`|||Internal server error|


### POST /user/create
This request creates a user. When a new user is created all the stickers all the albums are assumed as 'got'.

The user's information goes in request body as follows:

```Javascript
{
    userName: 'jhondoe',
    latitudUser : 19.23463,
    longitudUser: 23.46234
}
```

The response is as follows:

```Javascript
{
    field: fieldCode,
    error: errorCode
}
```

#### Field codes, error codes and status codesv

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`400`|1|1|Missing data to process the request|
|`400`|100|102|Username is taken|
|`400`|100|100|Username is too short, minimun 3 characters|
|`400`|100|101|Username is too long, maximun 16 characters|
|`400`|101|104|Latitud is not a number|
|`400`|102|104|Longitude is not a number|
|`500`|||Internal server error|