'use strict';

function replaceString(argument) {
  if (typeof(argument) !== 'string') {
    return 'Введите строку, пожалуйста!';
  } else if (argument.length > 30) {
    return argument.substring(0, 30) + '...';
  } else {
    return argument;
  }
}
replaceString('sdjcnsidjmsdjcnsdjnfdjcdkmockmodc,do,docdijncsdncisomdockodckdcodckodkcockcod');
