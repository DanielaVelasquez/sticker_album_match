/**
 * Determines if an object has all the 
 * neccesary field
 * @param {*} object an object 
 * @param {*} fields the fields the object shoudl have
 */
var isValidModel = (object, fields) =>{
    var isValid = true;
    fields.every((field)=>{
        
        if(object[field] == undefined)
            isValid = false;
        return isValid;
    });
    return isValid;
}

var isCollectionValid = (collection, fields) =>{
    if(!Array.isArray(collection))
        return false;
    var isValid = true;
    collection.every((element)=>{
       isValid = isValidModel(element, fields);
       return isValid;
    });
    return isValid;
}

module.exports = {
    isValidModel,
    isCollectionValid
}