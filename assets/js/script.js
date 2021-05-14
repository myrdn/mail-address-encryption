//Lists of characters
const emailChars =
  "ab1cdefgh9ijklmnopqrst2uvwxyz8ABCD5EF4GHIJKLMNOPQRSTUVW6XYZ!#$%7&'*+-/=?^_`{|}~.";
const replacedChars =
  "ɐʯ7ɑЖ1ЮУʕэʖʗʘʙʢʡʥʂ2ʃ9ʄɸɪɫɬɭяɒɓɔ8ɕɖɗɣɤɥɦɧɨɶɵɴɳɲɱɰɯɮʭʬ5ʫʪʩ6ʨʧʟʞ4ʝʜʛʚΞΦζξψϟϞϛϚϙϐϔϑλ";

function getEmailAndGenerate() {
  let mailAddress = document.getElementById("email").value;
  //Encode - Decode
  function substitution(emailChars, replacedChars) {
    this.encode = function (str) {
      return str.replace(
        /./g,
        (x) => replacedChars[emailChars.indexOf(x)] || x
      );
    };
    this.decode = function (str) {
      return str.replace(
        /./g,
        (x) => emailChars[replacedChars.indexOf(x)] || x
      );
    };
  }

  let sub = new substitution(emailChars, replacedChars);
  let mailEncoded = sub.encode(mailAddress);

  //Remove duplicate characters
  function removeDuplicateCharacters(str) {
    return str
      .split("")
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join("");
  }

  let removedDuplicates = removeDuplicateCharacters(mailEncoded);

  //Shuffle
  let shuffledCharacters = removedDuplicates
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  //Decode
  let charsDecoded = sub.decode(shuffledCharacters);

  //Build our command
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailAddress.match(mailformat)) {
    document.getElementById("command").innerHTML =
      "This is the command you can share :" +
      "</p>" +
      "<code>" +
      `echo '${mailEncoded}' | sed 'y/${shuffledCharacters}/${charsDecoded}/'` +
      "</code>";
  } else {
    document.getElementById("command").innerHTML =
      "<p>" + "Please enter valid email address." + "</p>";
  }
}

let generateButton = document.getElementById("generate");
generateButton.addEventListener("click", getEmailAndGenerate);
