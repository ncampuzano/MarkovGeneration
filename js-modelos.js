function doTheThing(jsonResponse){
    var allTheText = '';
    for (var i = 0; i < jsonResponse.length; i++){
        allTheText = allTheText.concat(cleandata(jsonResponse[i].full_text));
        allTheText = allTheText.concat(' ');
    }
    //console.log("TEXTO LIMPIO");
    //console.log(allTheText);
    var rule = makerule(allTheText, 2);
    var string = makestring(rule, 20);
    return string;
}

function cleandata(data){
    var data = data.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    data = data.replace("\n"," ");
    data = data.replace(/[\n.,:;]+/g,'');
    return data;
}


function makerule(data, context){
    var rule = {};
    var words = data.split(" ");

    for (var i = 0; i < words.length; i++) {
        var key = '';
        for (var j = i; j <= i+context && j < words.length; j++) {      
          key = key.concat(words[j]);
          key = key.concat(' ');
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
    console.log(oldwords);
    var string = '';
    for (var j = 0;j < oldwords.length; j++) {
        string = string.concat(' ');
        string = string.concat(oldwords[j]);
    }

    for (var i = 0; i < length; i++) {
        var key = '';
        for (var j = 0;j < oldwords.length - 1; j++) {            
            key = key.concat(oldwords[j]);
            key = key.concat(' ');
        }
        console.log("ESTA ES LA KEY "+key);
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
            console.log("NO HAY REGLA");
            console.log(key);
            return string;
        }
    }
    return string;
}

