
var models = require('../models');
var { GOT_STATE, REPEATED_STATE, MISSING_STATE , REPEATED_STATE_ID, MISSING_STATE_ID} = require('../util/states.util');

const MAX_RESULT = 100;

/**
 * Find or creates the user-sticker object from username ans sticker
 * @param {object} sticker sticker in the user-sticker object
 * @param {integer} userName user who owns the sticker
 */
var findOrCreateUserSticker = (sticker, user) =>
{
    return models.userSticker.findOrCreate({
        where:{
          stickerIdSticker: sticker.get('idSticker'),
          userIdUser: user.get('idUser')
        },
        defaults:{
          stickerStateIdStickerState: 1
        }
      });
}

/**
 * Updates the user-sticker, if the new state is 'got' then it is erased
 * @param {*} userSticker the user-sticker
 * @param {*} stickerState new state for the user-sticker
 */
var updateUserSticker = (userSticker,  stickerState) =>
{
  var idUserSticker = userSticker.get('idUserSticker');
  //The new state is  GOT, then the user-sticker is erased
  if(stickerState.get('stickerState') == GOT_STATE)
  {
    return models.userSticker.destroy({
      where: {
        idUserSticker
      }
    });
  }
  else
  {
    return userSticker.setStickerState(stickerState);
  }
  
}

/**
 * Query to find all possible matches in a perimeter
 * @param {} lat latitud of the current user
 * @param {*} lon longitude of the current user
 * @param {*} idUser id of the current user
 * @param {*} idAlbum album where he wants to find the match
 * @param {*} maxDistance maximun distance to find matches
 */
var queryMatch = (lat,lon, idUser, idAlbum, maxDistance) =>{

  return  "SELECT * FROM\n"+
          "(SELECT  stickerIdSticker, userName, stickerState,\n"+
          "numberSticker, latitudUser, longitudUser,\n"+
          calculateDistance(lat, lon)+"AS distance\n"+
          "FROM userSticker\n"+
          "INNER JOIN User ON idUser = userIdUser\n"+
          "INNER JOIN stickerState ON stickerStateIdstickerState = idstickerState\n"+
          "INNER JOIN sticker ON idSticker = stickerIdSticker\n"+
          "WHERE stickerStateIdstickerState = "+REPEATED_STATE_ID+"\n"+
          "AND userIdUser != "+idUser+"\n"+
          "AND albumIdAlbum = "+idAlbum+"\n"+
          "HAVING "+calculateDistance(lat, lon)+"<" +maxDistance+"\n"+
          ") AS otro_repetida\n"+
          "INNER JOIN\n"+
          "(SELECT  stickerIdSticker\n"+
          "FROM userSticker\n"+
          "WHERE stickerStateIdstickerState = "+MISSING_STATE_ID+"\n"+
          "AND userIdUser = "+idUser+") AS yo_faltante\n"+
          "ON otro_repetida.stickerIdSticker = yo_faltante.stickerIdSticker\n"+
          "UNION\n"+
          "SELECT * FROM\n"+
          "(SELECT  stickerIdSticker, userName, stickerState,\n"+
          "numberSticker,latitudUser, longitudUser,\n"+
          calculateDistance(lat, lon)+"AS distance\n"+
          "FROM userSticker\n"+
          "INNER JOIN User ON idUser = userIdUser\n"+
          "INNER JOIN stickerState ON stickerStateIdstickerState = idstickerState\n"+
          "INNER JOIN Sticker ON idSticker = stickerIdSticker\n"+
          "WHERE stickerStateIdstickerState = "+MISSING_STATE_ID+"\n"+
          "AND userIdUser != "+idUser+"\n"+
          "AND ALbumIdAlbum = "+idAlbum+"\n"+
          "HAVING "+calculateDistance(lat, lon)+"<" +maxDistance+"\n"+
          ") AS otro_faltante\n"+
          "INNER JOIN\n"+
          "(SELECT  stickerIdSticker\n"+
          "FROM userSticker\n"+
          "WHERE stickerStateIdstickerState = "+REPEATED_STATE_ID+"\n"+
          "AND userIdUser = "+idUser+") AS yo_repetida\n"+
          "ON otro_faltante.stickerIdSticker = yo_repetida.stickerIdSticker\n"+
          "ORDER BY userName, stickerState";
}
/**
 * Query to find the matching stickers between two users
 * @param {number} idUser1 
 * @param {number} idUser2 
 */
var matchUsers = (idUser1, idUser2) =>{

  return "SELECT * FROM\n"+
          "(SELECT  stickerIdSticker, userName, stickerState,\n"+
          "numberSticker\n"+
          "FROM userSticker\n"+
          "INNER JOIN User ON idUser = userIdUser\n"+
          "INNER JOIN stickerState ON stickerStateIdstickerState = idstickerState\n"+
          "INNER JOIN Sticker ON idSticker = stickerIdSticker\n"+
          "WHERE stickerStateIdstickerState = "+REPEATED_STATE_ID+"\n"+
          "AND userIdUser = "+idUser2+"\n"+
          ") AS otro_repetida\n"+
          "INNER JOIN\n"+
          "(SELECT  stickerIdSticker\n"+
          "FROM userSticker\n"+
          "WHERE stickerStateIdstickerState = "+MISSING_STATE_ID+"\n"+
          "AND userIdUser = "+idUser1+") AS yo_faltante\n"+
          "ON otro_repetida.stickerIdSticker = yo_faltante.stickerIdSticker\n"+
          "UNION\n"+
          "SELECT * FROM\n"+
          "(SELECT  stickerIdSticker, userName, stickerState,\n"+
          "numberSticker\n"+
          "FROM userSticker\n"+
          "INNER JOIN User ON idUser = userIdUser\n"+
          "INNER JOIN stickerState ON stickerStateIdstickerState = idstickerState\n"+
          "INNER JOIN Sticker ON idSticker = stickerIdSticker\n"+
          "WHERE stickerStateIdstickerState = "+MISSING_STATE_ID+"\n"+
          "AND userIdUser = "+idUser2+"\n"+
          ") AS otro_faltante\n"+
          "INNER JOIN\n"+
          "(SELECT  stickerIdSticker\n"+
          "FROM userSticker\n"+
          "WHERE stickerStateIdstickerState = "+REPEATED_STATE_ID+"\n"+
          "AND userIdUser = "+idUser1+") AS yo_repetida\n"+
          "ON otro_faltante.stickerIdSticker = yo_repetida.stickerIdSticker\n"+
          "ORDER BY userName, stickerState";

}

/**
 * Query to calculate the distance from latitud and longitude
 * @param {number} lat latitude
 * @param {number} lon longitude
 */
var calculateDistance = (lat, lon) =>{
  return "(acos(sin(radians(latitudUser)) * sin(radians("+lat+")) + "+
         "cos(radians(latitudUser)) * cos(radians("+lat+")) *"+
         "cos(radians(longitudUser) - radians("+lon+"))) * 6378)";
}

/**
 * Takes the result from the query and put them into a list
 * @param {list} results 
 */
var buildListStickers = (results) =>{

  var users = [];
  var forHim = [];
  var forMe = [];
  var user;
  for(i in results)
  {
    var u = results[i];
    var state = u.stickerState;

    //First time
    if(!user)
    {
      user = u.userName;
    }
    //If it is a new user
    else if(user != u.userName)
    {
      
      if(users.length + 1 == MAX_RESULT)
      {
        u = results[i -1];
        break;
      }
      var ant = results[i -1];
      var newuser = buildSticker(user, forMe, forHim)
      users.push(newuser);

      forHim = [];
      forMe = [];
      user = u.userName;
    }

    
    if(state == MISSING_STATE)
      forHim.push(u.numberSticker);
    else
      forMe.push(u.numberSticker);
  }
  if(user)
  {
    var newuser = buildSticker(user, forMe, forHim)
    users.push(newuser);
  }
  return users;
}
//Creates the object of a sticker
var buildSticker = (userName, forMe, forHim ) =>{
  
  return {
    userName,
    forHim,
    forMe
  }
}

/**
 * Query to get all the stickers from a user in an album
 * @param {number} idUsuario identifier of the user
 * @param {number} idAlbum identifier of the album
 */
var getStickerFrom = (idUsuario, idAlbum ) =>{
  return models.userSticker.findAll({
    where: {
      UserIdUser: idUsuario
    },
    include: [
      {
        model: models.sticker,
        where: {
          albumIdAlbum: idAlbum
        }
      }
    ]
  });
}
/**
 * Query to get all the usersticker from a user, according to an album an a state
 * @param {*} idUser user's identifieer
 * @param {*} idAlbum album's identifier
 * @param {*} idStickerState state's identifier
 */
var getStickerFromState = (idUser, idAlbum, idStickerState) =>{
  return models.userSticker.findAll({
    where: {
      userIdUser: idUser,
      stickerStateIdstickerState: idStickerState
    },
    include: [
      {
        model: models.sticker,
        where: {
          albumIdAlbum: idAlbum
        }
      }
    ]
  });
}

/**
 * Creates from a list of object of usersticker a readable list
 * where you can see which are the missing and repeated stickers
 * @param {list} userStickers results from the query
 * @returns {obj} result
 * {
 *  missingStickers: [...],
 *  repeatedStickers : [...]
 * }
 */
var createListUserSticker = (userStickers) =>{
  missingStickers = []
  repeatedStickers = []
  for(index in userStickers)
  {
      var userSticker = userStickers[index];
      var num = userSticker.sticker.numberSticker;
      
      if(userSticker.stickerStateIdStickerState == MISSING_STATE_ID)
        missingStickers.push(num);
      else if(userSticker.stickerStateIdStickerState == REPEATED_STATE_ID)
        repeatedStickers.push(num);
  }

  return {missingStickers, repeatedStickers}
}

module.exports = {
  findOrCreateUserSticker,
  updateUserSticker,
  queryMatch,
  buildListStickers,
  matchUsers,
  getStickerFrom,
  createListUserSticker,
  getStickerFromState
}