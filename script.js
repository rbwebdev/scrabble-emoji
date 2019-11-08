const text = document.getElementById('text');
const before = document.getElementById('before');
const after = document.getElementById('after');
const text_emoji = document.getElementById('text-emoji');
const reset = document.getElementById('reset');
const copy = document.getElementById('copy');
const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
text.addEventListener('input', onChange, false);
before.addEventListener('input', onChange, false);
after.addEventListener('input', onChange, false);
reset.addEventListener('click', resetForm, false);
copy.addEventListener('click', copyClipboard, false);
before.value = getCookie('before');
after.value = getCookie('after');

function onChange(evt) {
    setCookie('before', before.value);
    setCookie('after', after.value);
    let str = text.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let emoji = '';
    for (let i = 0; i < str.length; i++) {
        let letter = str.charAt(i);
        if (str.charAt(i) === ' ') {
            letter = 'space';
        }
        if (letters.indexOf(str.charAt(i)) !== -1) {
            emoji += before.value + letter + after.value;
        } else {
            emoji += before.value + 'space' + after.value;
        }
    }
    text_emoji.value = emoji;
}
function resetForm() {
    text_emoji.value = '';
    removeCookie('before');
    removeCookie('after');
}
function copyClipboard() {
    text_emoji.select();
    document.execCommand("Copy");
    text.focus();
    copy.value = 'Copied';
    copy.classList.remove("btn-success");
    copy.classList.add("btn-info");
    setTimeout(function(){
        copy.value = 'Copy';
        copy.classList.remove("btn-info");
        copy.classList.add("btn-success");
    }, 1000);
}
function getCookie(sName) {
    let oCrumbles = document.cookie.split(';');
    for(let i=0; i<oCrumbles.length;i++)
    {
        let oPair= oCrumbles[i].split('=');
        let sKey = decodeURIComponent(oPair[0].trim());
        let sValue = oPair.length>1 ? oPair[1] : '';
        if(sKey === sName) {
            return decodeURIComponent(sValue);
        }
    }
    return '';
}
function setCookie(sName, sValue) {
    document.cookie= encodeURIComponent(sName) + '=' + encodeURIComponent(sValue);
}
function removeCookie(sName,) {
    setCookie(sName, '');
}