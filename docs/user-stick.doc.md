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
|`500`|||Internal server error|