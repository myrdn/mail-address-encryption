//Lists of characters
const emailChars = "ab1cdefgh9ijklmnopqrst2uvwxyz8ABCD5EF4GHIJKLMNOPQRSTUVW6XYZ!#$%7&'*+-/=?^_`{|}~.";
const replacedChars = "ɐʯ7ɑЖ1ЮУʕэʖʗʘʙʢʡʥʂ2ʃ9ʄɸɪɫɬɭяɒɓɔ8ɕɖɗɣɤɥɦɧɨɶɵɴɳɲɱɰɯɮʭʬ5ʫʪʩ6ʨʧʟʞ4ʝʜʛʚΞΦζξψϟϞϛϚϙϐϔϑλ";

function getEmailAndGenerate(){
    let mailAddress = document.getElementById('email').value;
    //Encode - Decode 
    function substitution(emailChars, replacedChars) {
	this.encode = function (str) {
	    return str.replace(/./g, x => replacedChars[emailChars.indexOf(x)] || x);
	};
	this.decode = function (str) {
	    return str.replace(/./g, x => emailChars[replacedChars.indexOf(x)] || x);
	};
    }

    let sub = new substitution(emailChars, replacedChars);
    let mailEncoded = sub.encode(mailAddress);

    //Remove duplicate characters
    function removeDuplicateCharacters(string) {
	return string
	    .split('')
	    .filter(function (item, pos, self) {
	    return self.indexOf(item) == pos;
	})
	    .join('');
    }
    
    let removedDuplicates = removeDuplicateCharacters(mailEncoded);

    //Shuffle
    let shuffledCharacters = removedDuplicates.split('').sort(function () { return 0.5 - Math.random(); }).join('');

    //Decode
    let charsDecoded = sub.decode(shuffledCharacters);

    //Build our command
    document.getElementById('command').innerHTML = "<p> <i class='fa fa-terminal' aria-hidden='true'></i> " +  "This is the command you can share :" +  "</p>"  + "<code>" + `echo '${mailEncoded}' | sed 'y/${shuffledCharacters}/${charsDecoded}/'` + "</code>";
}

let generateButton = document.getElementById('generate');
generateButton.addEventListener('click', getEmailAndGenerate);


