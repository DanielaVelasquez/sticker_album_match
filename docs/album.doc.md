# User

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