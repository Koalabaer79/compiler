function setStyle(city){
function gcd (a, b) {
return (b == 0) ? a : gcd (b, a%b);
}
var w = screen.width;
var h = screen.height;
var r = gcd (w, h);
var ratio = w/r+":"+h/r;
var image = "";
var style = "";
var max_w = "";
var max_h = "";

if(w>h && w>1920){
image = "'img/"+city+"_wqhd.jpg'";
max_w = 2160+"px";
max_h = 1440+"px";
style = 'css/style_h.css';
}else if(w>h && w<=1920 && w>900) {
image = "'img/"+city+"_hd.jpg'";
max_w = 1920+"px";
max_h = 1080+"px";
style = 'css/style_h.css';
}else if(h>w && w<=1920 && w>500) {
image = "'img/"+city+"_hd_v.jpg'";
max_h = 1920+"px";
max_w = 1080+"px";
style = 'css/style_v.css';
}else if(h>w && w<=500) {
image = "'img/"+city+"_mobile_v.jpg'";
max_h = 900+"px";
max_w = 500+"px";
style = 'css/style_v.css';
}else if(w>h && w<=900) {
image = "'img/"+city+"_mobile_h.jpg'";
max_h = 500+"px";
max_w = 900+"px";
style = 'css/style_v.css';
}else if(ratio == "4:3" || ratio == "3:4") {
image = "'img/"+city+"_square.jpg'";
max_w = 1920+"px";
max_h = 1920+"px";
style = 'css/style_v.css';
}else if(ratio = "16:9" && w>3000) {
image = "'img/"+city+"_4k.jpg'";
max_w = 3840+"px";
max_h = 2160+"px";
style = 'css/style_h.css';
}

var s = document.getElementById('setStyle');
s.setAttribute('href', style);

var addStyle = document.getElementById('addStyle');
addStyle.innerHTML = '';
addStyle.innerHTML = '.mainPic { background: url('+image+') no-repeat center fixed; max-width: '+max_w+'; max-height: '+max_h+'; }';

document.getElementById('wrapper1').classList.add('mainPic');
}

function showNav(){
var navCont = document.getElementById('navCont');
if(navCont.style.display == 'block') {
navCont.style.display = 'none';
}else{
navCont.style.display = 'block';
}
}

function showText(id) {
var text = 'text'+id;  
var showText = document.getElementById(text);
var textAlready = document.getElementsByClassName('showText');
var navAlready = document.getElementsByClassName('activated');
var slideAlready = document.getElementsByClassName('slideRight');

if(textAlready.length != 0 && showText != textAlready[0]) {
textAlready[0].classList.add('hideText');
textAlready[0].classList.remove('showText');
navAlready[0].classList.remove('activated');
}

if(showText == textAlready[0]){
textAlready[0].classList.add('hideText');
textAlready[0].classList.remove('showText');
slideAlready[0].classList.add('slideLeft');
slideAlready[0].classList.remove('slideRight');
navAlready[0].classList.remove('activated');
}else{
var wrapper2 = document.getElementById('wrapper2');

if(wrapper2.classList.contains("slideLeft")) {
wrapper2.classList.remove('slideLeft');
};

wrapper2.classList.add('slideRight');
if(showText.classList.contains('hideText')){
showText.classList.remove('hideText');
}
showText.classList.add('showText');

var nav = 'nav'+id;
navPiont = document.getElementById(nav);
navPiont.classList.add('activated');
}

var btn = document.getElementById('btn');
if(btn.offsetParent !== null){
document.getElementById('navCont').style.display = 'none';
}
}

function setContent(city) { 
setStyle(city);

setTimeout(function(){    
document.getElementById('div3').classList.remove('slideTop_1')
document.getElementById('div2').classList.remove('slideTop_2')
document.getElementById('div4').classList.remove('slideTop_2')
document.getElementById('div1').classList.remove('slideTop_3')
document.getElementById('div5').classList.remove('slideTop_3')
}, 2000);

}

document.addEventListener("DOMContentLoaded", function(event) {
setContent('replaceCITY');
})

document.addEventListener('click', function(e){
if (document.getElementById('navi').contains(e.target)){
return;
} else{    
var textAlready = document.getElementsByClassName('showText');
var navAlready = document.getElementsByClassName('activated');
var slideAlready = document.getElementsByClassName('slideRight');

if(textAlready.length != 0 && navAlready.length != 0 && slideAlready.length != 0) {
textAlready[0].classList.add('hideText');
textAlready[0].classList.remove('showText');
slideAlready[0].classList.add('slideLeft');
slideAlready[0].classList.remove('slideRight');
navAlready[0].classList.add('inactive');
navAlready[0].classList.remove('activated');
}
}
});

