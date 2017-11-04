let string = 'Three days was simply not a(n) acceptable amount of time to complete such a lot of work.'

function convertStr (str) {
  let stringArr = string.split(' ');
  let textPieces = [];
  for (let i = 0; i < stringArr.length; i++) {
    textPieces.push({
      text: stringArr[i],
      blank: false,
      id: shortid.generate(),
    });
  }
  return textPieces;
}

{ text: 'Three', blank: false, id: shortid.generate() },
{ text: 'days', blank: false, id: shortid.generate() },
{ text: 'was', blank: false, id: shortid.generate() },
{ text: 'simply', blank: false, id: shortid.generate() },
{ text: 'not', blank: false, id: shortid.generate() },
{ text: 'a(n)', blank: false, id: shortid.generate() },
{ text: 'acceptable', blank: true, id: shortid.generate() },
{ text: 'amount', blank: false, id: shortid.generate() },
{ text: 'of', blank: false, id: shortid.generate() },
{ text: 'time', blank: false, id: shortid.generate() },
{ text: 'to', blank: false, id: shortid.generate() },
{ text: 'complete', blank: false, id: shortid.generate() },
{ text: 'such', blank: false, id: shortid.generate() },
{ text: 'a', blank: false, id: shortid.generate() },
{ text: 'lot', blank: false, id: shortid.generate() },
{ text: 'of', blank: false, id: shortid.generate() },
{ text: 'work.', blank: false, id: shortid.generate() }

function splitText(textPieces) {
  let newTextPieces = [];
  for (let i = 0; i < textPieces.length; i++) {
    let textPiece = textPieces[i];
    if (textPiece.blank) newTextPieces.push(textPiece);
    let textArr = textPiece.text.split(' ');
    for (let j = 0; j < textArr.length; j++) {
      newTextPieces.push({
        text: textArr[j],
        blank: false,
        id: shortid.generate(),
      });
    }
  }
  return newTextPieces;
}

let arr = [
  {
    text : "Three days was simply not a(n)",
    blank : false,
    id: shortid.generate(),
  },
  {
    text : "acceptable",
    blank : true,
    id: shortid.generate(),
  },
  {
    text : "amount of time to complete such a lot of work.",
    blank : false,
    id: shortid.generate(),
  }
]
