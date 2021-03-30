function tryParseJSON (jsonString){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;

};

exports.isJson = tryParseJSON;