function deSalt(note, shift){
    let deCipher = [];
    for(let i=0; i<note.length; i++){
        let code = note.charCodeAt(i) - shift;
        deCipher.push(String.fromCharCode(code))
    }
    const deCipherStr = deCipher.join('');
    return deCipherStr;
}

export {deSalt};