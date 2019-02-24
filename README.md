# Sticker album app

### Requirements
Software neeeded to run the application.

- Node V11.6.0
- MariaDB V10.1.28

### Previous requirements

- Create a database named **sticker-album**. No extra scripts are needed.
- Create a user named **root** without password

### Important information

- The application tries to connect to the database on port 3308 by default.

- In case you need to change the database name, open the file on */server/config/config.json* and change the attribute *database* to the new name in the *development* object.

- In case you need to change the port of the database , open the file on */server/config/config.json* and change the attribute *port* to the new port in the *development* object.

- In case you need to change the username of the database , open the file on */server/config/config.json* and change the attribute *username* to the new username in the *development* object.

- In case you need to change the password of the database , open the file on */server/config/config.json* and change the attribute *password* to the new password in the *development* object.

### Steps to executionconsider

1. Download the project
2. Open a terminal in the root of the project.
3. Run the following command, to install the modules
```Javascript
npm install
```
4. To start the application run the following command:
```Javascript
npm start
```
5. Aplication is ready for requests, it runs in the 1337 port.

### How to use  the API

To use the API, please open the *docs* folder, in there you will find all the available routes in the API.

Please  be aware that the file *errors* doesn't refer to any route and it just contains general information about errors and field codes.

### Facts
The application loads by default 4 users, 1 album with 10 stickers and missing and repeated stickers for each user. Every time the application starts, this default information is loaded again, previous changes will be deleted.

Users are:
- john
- dorothy
- george
- izzie

User's location

|User|Latitud|Longitude|
|---|---|---|
|john|42.264992|-71.164709|
|dorothy|42.349091|-71.077469|
|george|42.287935|-71.131212|
|izzie|40.799050|-73.953866|

User's missing and repeated stickers

|User|Missing|Repeated|
|---|---|---|
|john|1, 2, 3, 4, 5|6, 7, 8|
|dorothy|1, 4, 7|2, 5, 10|
|george|3|1, 2, 7, 8, 9, 10|
|izzie|2, 3, 4|1|

The album's id is *1*.

### Examples 

#### Get matches for john within a distance of 20 kilometers

Check the *user-stick* file in the docs folder to see how it works in detail.

Request GET

```Javascript
http://localhost:1337/usersticker/matches/john/1/20
```

Response
```Javascript
[
    {
        "userName": "dorothy",
        "forHim": [
            7
        ],
        "forMe": [
            2,
            5
        ]
    },
    {
        "userName": "george",
        "forHim": [],
        "forMe": [
            1,
            2
        ]
    }
]
```

#### Get matches for john with izzie

Check the *user-stick* file in the docs folder to see how it works in detail.

Request POST

```Javascript
http://localhost:1337/usersticker/matches
```

Body request
```Javascript
{
	"username": "john",
	"otherusername": "izzie"
}
```
Response
```Javascript
[
    {
        "userName": "izzie",
        "forHim": [],
        "forMe": [
            1
        ]
    }
]
```

