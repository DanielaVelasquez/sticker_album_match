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


### POST /userstick/matches
Gets all the users who 'username' can interchange stickers with from the album with id 'idAlbum'.
The users information goes in request body as follows:

```Javascript
{
    username: 'jhondoe',
    otherusername : 'janedoe'
}
```

The request should be sent as the following example, where the username is jhondoe:

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


### GET /userstick/getStickers/username/album/:username/:idAlbum
Gets all the user's misssing and repeated stickers in an specific album.
The user's username and the album he wants to see are sent in the request as follows, where username is 'jhondoe' and 'idAlbum' is 1

```Javascript
/userstick/getStickers/username/album/jhondoe/1
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
    missingStickers: [1, 2, 3],
    repeatedStickers: [4, 5, 6]
}
```

Where:
```Javascript
{
    missingStickers: "stickers the user doesn't have from that album",
    repeatedStickers: "stickers the user have from that album"
}
```


#### Field codes, error codes and status codesv

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`200`|100|103|User not found|
|`200`|400|103|Album not found|
|`500`|||Internal server error|

### GET /userstick/getStickers/username/stateSticke/album/:username/:idAlbum/:state
Gets all the user's stickers from an album with an specific state, state must be one of the values: 
['missing', 'repeated']

The user's username, state and the album he wants to see are sent in the request as follows, where username is 'jhondoe' and 'idAlbum' is 1

```Javascript
/userstick/getStickers/username/stateSticke/album/jhondoe/1/missing
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
    stickers: [
        1, 2, 3
    ]
}
```

Where:
```Javascript
{
    stickers: "stickers with the given state in the selected album"
}
```


#### Field codes, error codes and status codesv

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`200`|100|103|User not found|
|`200`|400|103|Album not found|
|`200`|200|103|State not found|
|`200`|200|106|The given state is invalid, you must sent either 'missing' or 'repeated'|
|`500`|||Internal server error|


