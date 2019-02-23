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

### GET /user/exists/email/:email
Returns information wheter the email exists. The request should be sent as the following example, where the email is jhondoe@unknown.com:

```Javascript
/user/exists/email/jhondoe@unknown.com
```

The response is as follows, exist would be 'true' if the email provided is registered and false otherwise:

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
