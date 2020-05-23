function arrayContains(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === element)
            return true;
    }

    return false;
}

function dictContains(dict, element) {
    for (var i in dict) {
        if (dict[i] === element)
            return true;
    }

    return false;
}

function insertAtPosition(str, pos, charToInsert) {
    return str.substr(0, pos) + charToInsert + str.substr(pos);
}


function getCondition() {

    var varName = '';
    var wordCount = 0;
    var condition = '';
    var i = 1;
    var conditionLHS = '';
    var finished = false;

    while (!finished) {

        varName = '';
        wordCount = 0;
        conditionLHS = '';

        if (splitWords[i] === 'variable') {
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'greater' && splitWords[j] !== 'less' && splitWords[j] !== 'equals' && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j];
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());

                wordCount++;
                i = j;
            }

            condition += varName;
            conditionLHS = varName;

            varName = '';
            wordCount = 0;
        }
        else {
            condition += isNaN(splitWords[i]) ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
        }


        if (splitWords[i+1] === 'greater' && splitWords[i+2] === 'equals') {
            condition += ' >= ';
            i += 3;
        }
        else if (splitWords[i+1] === 'greater') {
            condition += ' > ';
            i += 2;
        }
        else if (splitWords[i+1] === 'less' && splitWords[i+2] === 'equals') {
            condition += ' <= ';
            i += 3
        }
        else if (splitWords[i+1] === 'less') {
            condition += ' < ';
            i += 2;
        }
        else if (splitWords[i+1] === 'equals') {
            condition += ' == ';
            i += 2;
        }


        if (splitWords[i] === 'variable') {
            for (var j = i+1; j < splitWords.length && splitWords[j] !== 'and' && splitWords[j] !== 'or'; j++) {
                if (wordCount === 0)
                    varName += splitWords[j];
                else
                    varName += splitWords[j].replace(/^./, splitWords[j][0].toUpperCase());


                i = j;
            }

            condition += varName;
        }
        else {
            condition += (isNaN(splitWords[i]) || variables[conditionLHS] === 'char') ? '\'' + splitWords[i][0] + '\'' : splitWords[i];
            i++;
        }

        if (i === splitWords.length) {
            finished = true;
            break;
        }
        else {
            if (splitWords[i] === 'and')
                condition += ' && ';
            else if (splitWords[i] === 'or')
                condition += ' || ';
            i++;
        }
    }

    return condition;
}


function autoIndent() {
  
}
