// This Script is handcoded by Lars Urban / u-php.de
// Copyright by Lars Urban / u-php.de - April 2020
// Free to use for own purposes
// mentioning my name and website appreciated


// Loading JSON-File
function loadJSON(file,callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
     }
  };
  xobj.send(null);  
}

// Display Text Sections
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

// Set background image and size regarding screen size on load
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

// set city navigation
function setCityNav(city){
  var jsonFile = 'data/pages.json';
  var cityDiv = document.getElementById('city')
  cityDiv.innerHTML = '';
  loadJSON(jsonFile, function(text){
    var data = JSON.parse(text);;

    data.forEach(function(row) {
      if(row.tag != city){
        var div = document.createElement('div');
        div.setAttribute('id', row.tag);
        div.setAttribute('onclick', "changeCity('"+row.tag+"')");
        div.setAttribute('class', 'cityPoint');
        div.innerHTML = row.name;
        cityDiv.appendChild(div);
      }
    });
  });
}

// show navigation
function showNav(){
  var navCont = document.getElementById('navCont');
  if(navCont.style.display == 'block') {
    navCont.style.display = 'none';
  }else{
    navCont.style.display = 'block';
  }
}

// generate content of page
function setContent(city) {
  
  var jsonFile = 'data/'+city+'.json';

  loadJSON(jsonFile, function(text){
    var data = JSON.parse(text);
    //set header info and h1 title
    document.getElementById('name').innerHTML = data.name;
    document.title = data.title;
    var desc = document.getElementById('description');
    desc.setAttribute('content', data.description);
    
    // set Navi
    var naviDiv = document.getElementById('navi');
    naviDiv.innerHTML = '';
    i = 1;
    data.navi.forEach(obj => {
      for (const [key, value] of Object.entries(obj)) {
        var div = document.createElement('div');
        div.setAttribute('id', `${key}`);
        div.setAttribute('onclick', 'showText('+i+')');
        div.setAttribute('class', 'nav');
        div.innerHTML = `${value}`;
        naviDiv.appendChild(div);
        i++
      }
    });
    // set Citydiv
    setCityNav(city);
    // set Content
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    j=1
    data.content.forEach(obj => {
      for (const [key, value] of Object.entries(obj)) {
        var div = document.createElement('div');
        div.setAttribute('id', `${key}`);
        div.setAttribute('class', 'text');
        div.innerHTML = `${value}`;
        contentDiv.appendChild(div);
        j++
      }
    });
    // set Bottom-References
    var infoDiv = document.getElementById('info');
    infoDiv.innerHTML = '';
    var wiki = document.createElement('a');
    var wikiCont = document.createTextNode("Wikipedia");
    wiki.appendChild(wikiCont);
    wiki.href = data.wiki;
    wiki.title = 'Wikipediaeintrag von '+data.name;
    wiki.target = '_blank'
    var img = document.createElement('a');
    var imgCont = document.createTextNode("Pixabay");
    img.appendChild(imgCont);
    img.href = data.image;
    img.title = 'Link zum Bild auf Pixabay (freie Lizenz)';
    img.target = '_blank'
    var uphp = document.createElement('a');
    var uphpCont = document.createTextNode("u-php");
    uphp.appendChild(uphpCont);
    uphp.href = "../../";
    uphp.title = 'Copyright von u-php.de';
    var start = document.createTextNode('Copyright: ');
    var middle = document.createTextNode(' / Quellennachweise: ');
    var slash = document.createTextNode(" / ");
    infoDiv.appendChild(start);
    infoDiv.appendChild(uphp);
    infoDiv.appendChild(middle);
    infoDiv.appendChild(wiki);
    infoDiv.appendChild(slash);
    infoDiv.appendChild(img);

  });
  // set background-image and stylesheet
  setStyle(city);

  setTimeout(function(){    
    document.getElementById('div3').classList.remove('slideTop_1')
    document.getElementById('div2').classList.remove('slideTop_2')
    document.getElementById('div4').classList.remove('slideTop_2')
    document.getElementById('div1').classList.remove('slideTop_3')
    document.getElementById('div5').classList.remove('slideTop_3')
  }, 2000);

}

// set city on page load
document.addEventListener("DOMContentLoaded", function(event) {
  setContent('moskau');
})

//set city on click
function changeCity(city) {
  var wrapper2 = document.getElementById('wrapper2');

  if(wrapper2.classList.contains("slideLeft")) {
    wrapper2.classList.remove('slideLeft');
  };  

  var btn = document.getElementById('btn');
  if(btn.offsetParent !== null){
    document.getElementById('navCont').style.display = 'none';
  }

  setContent(city);
  document.getElementById('div3').classList.add('slideTop_1')
  document.getElementById('div2').classList.add('slideTop_2')
  document.getElementById('div4').classList.add('slideTop_2')
  document.getElementById('div1').classList.add('slideTop_3')
  document.getElementById('div5').classList.add('slideTop_3')
}

// reset shown text section on click outside of navi container
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
