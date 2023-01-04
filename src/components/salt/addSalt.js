function addSalt(note, shift){
    let cipher = [];
    for(let i=0; i<note.length; i++){
        let code = note.charCodeAt(i) + shift;
        cipher.push(String.fromCharCode(code))
    }
    const cipherStr = cipher.join('');
    return cipherStr;
}

export {addSalt};