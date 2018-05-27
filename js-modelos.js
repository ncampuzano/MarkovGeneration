function doTheThing(jsonResponse){
    var allTheText = '';
    for (var i = 0; i < jsonResponse.length; i++){
        allTheText = allTheText.concat(cleandata(jsonResponse[i].full_text));
        allTheText = allTheText.concat(' ');
    }
    console.log(allTheText);
    var rule = makerule(allTheText, 4);
    var string = makestring(rule, 15);
    return string;
}

function cleandata(data){
    var res = data.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    return res;
}


function makerule(data, context){
    var rule = {};
    var words = data.split(" ");

    for (var i = 0; i < words.length; i++) {
        var key = '';
        for (var j = i; j <= i+context && j < words.length; j++) {
          key = key.concat(' ');
          key = key.concat(words[j]);
        }        
        if (rule.hasOwnProperty(key)) {
            rule[key].push(words[j]);
        }else{
            rule[key] = [words[j]];
        }
    }
    return rule;
}

function makestring(rule, length){
    
    var oldwords = Object.keys(rule);
    var r = Math.floor((Math.random() * (oldwords.length - 1)));
    oldwords = oldwords[r].split(" ");

    var string = '';
    for (var j = 0;j < oldwords.length; j++) {
        string = string.concat(' ');
        string = string.concat(oldwords[j]);
    }

    for (var i = 0; i < length; i++) {
        var key = '';
        for (var j = 1;j < oldwords.length; j++) {
            key = key.concat(' ');
            key = key.concat(oldwords[j]);
        }
        if (rule.hasOwnProperty(key)){
            var rulenext = rule[key];
            var r = Math.floor((Math.random() * (rulenext.length - 1)));
            newword = rulenext[r];
            string = string.concat(newword);
            string = string.concat(' '); 
            
            for (var j = 0;j < oldwords.length; j++) {
                oldwords[j] = oldwords[(j + 1) % oldwords.length];
            }
            oldwords[oldwords.length-1] = newword;
        }else{
            return string;
        }
        return string;
    }
}
