# Album

### GET /album/all
Returns all available albums.

The response is as follows:

```Javascript
{
    data: [
        {
            idAlbum: 1,
            nameAlbum: 'Fifa 2018'
        },
        {
            idAlbum: 2,
            nameAlbum: 'Fifa 2014'
        },
        ...
    ]
}
```

#### Status codes

|Status Code|Description|
|---|---|
|`200`|Successful|
|`500`|Internal server error|

### GET /album/stickers/:idAlbum
Returns all the stickers from an album.

The response is as follows, each number is the number of the sticker in the album:

```Javascript
[
    1,
    2,
    ...
]
```

#### Status codes

|Status Code|Field Code|Error Code|Description|
|---|---|---|---|
|`200`|||Successful|
|`400`|400|103|Album doesn`t exist|
|`500`|||Internal server error|
