# UserStick

### PATCH /userstick/update/sticker
This request updates a sticker.  
The stickers information goes in request body as follows:

```Javascript
{
    numberSticker: 1,
    idAlbum : 1,
    stickerState: '',
    userName : 'jhondoe'
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
|`200`|200|103|Sticker state is not valid|
|`200`|300|103|Sticker doesn´t exists or it is in the wrong album|
|`200`|100|103|User not found|
|`500`|||Internal server error|


### GET /userstick/matches/:username/:idAlbum
Gets all the users who 'username' can interchange stickers with from the album with id 'idAlbum'.

The request should be sent as the following example, where the username is jhondoe:

```Javascript
userstick/matches/jhondoe/1
```
The response is as follows in case of an error:

```Javascript
{
    field: fieldCode,
    error: errorCode
}
```
The response is as follows if everything goes well:
```Javascript
{
    [
        {
            userName: "jhondoe",
            forHim: [2,3],
            forMe: [1,4]
        },
        ...
    ]
}
```

Where:
```Javascript
{
    userName: "Name of the user who I can interchange with",
    forHim: "Stickers I have repeated and he needs",
    forMe: "Stickers He has repeated and I need"
}
```


#### Field codes, error codes and status codesv

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`200`|100|103|User not found|
|`200`|400|103|Album not found|
|`500`|||Internal server error|


