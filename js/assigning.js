
var i;
function camelCasing(){
    
    var varName = splitWords[0];
    for (i = 1; i < splitWords.length && (!(splitWords[i] in assignmentOperators) ); i++) {
        varName += splitWords[i].replace(/^./, splitWords[i][0].toUpperCase()); //variable name in camel case
    }
    splitWords[0] = varName;
    
}

function assign(){
   
    var statement = splitWords[0];
    // console.log(assignmentOperators);
    // console.log(splitWords[i]);
    if (splitWords[i] !== 'equals'){
        statement += ' ' + assignmentOperators[splitWords[i]] +  assignmentOperators[splitWords[i+1]] + ' ' + splitWords[i+2];
    }



    else {
        var var2Name = splitWords[i+1];
        statement +=  ' = ';
        for (t = i + 2; t < splitWords.length && (!(splitWords[t] in assignmentOperators) ); t++) {
            var2Name += splitWords[t].replace(/^./, splitWords[t][0].toUpperCase()); //variable name in camel case
            // console.log(var2Name);
        }

        {
            if (dictContainsKey(variables, var2Name)){
                statement += var2Name;
            }
            else {
                if (isNaN(var2Name)){
                    statement += `'${var2Name}'`}
                
                else{
                    statement += var2Name;
                }
            }
        }
    }
    // console.log(i);
    console.log(statement);
    
    // console.log('assign function')
}

