// This Script is handcoded by Lars Urban / u-php.de
// Copyright by Lars Urban / u-php.de - April 2020
// Free to use for own purposes
// mentioning my name and website appreciated

// Set main variables for deployment
const colors = require('colors/safe');
var Jimp = require('jimp');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

// set your Page Name - f.e. url !!!
var urlName = "u-php.de";
var indexName = "Big Cities";
var imprintPath = "impressum.html";
var privacyPath = "datenschutz.html";

// create folders for deploy
async function generateFolders() {
    fs.stat('deploy', function(err) {
        if (!err) { return; }
        else if (err.code === 'ENOENT') {
            fs.mkdir('deploy', function(err) {
                if (err) { console.log(colors.bgRed('failed to create doployment folder!')); }
                else {
                    fs.stat('deploy/img', function(err) {
                        if (!err) { return; }
                        else if (err.code === 'ENOENT') {
                            fs.mkdir('deploy/img', function(err) {
                                if (err) { console.log(colors.bgRed('failed to create image folder!')); }
                            });
                        }
                    });
                    fs.stat('deploy/css', function(err) {
                        if (!err) { return; }
                        else if (err.code === 'ENOENT') {
                            fs.mkdir('deploy/css', function(err) {
                                if (err) { console.log(colors.bgRed('failed to create css folder!')); }
                            });
                        }
                    });
                    fs.stat('deploy/fonts', function(err) {
                        if (!err) { return; }
                        else if (err.code === 'ENOENT') {
                            fs.mkdir('deploy/fonts', function(err) {
                                if (err) { console.log(colors.bgRed('failed to create fonts folder!')); }
                            });
                        }
                    });
                }
            });
        }
    });
}

// copy Favicon
function copyFavico() {
    fs.copyFile('./public/favicon.ico', './deploy/favicon.ico', (err) => {
        if (err) throw err;
    });
}

// function to copy files
async function copyFiles(dir, dest, type) {
  let names;
  try {
    names = await readdir(dir);
  } catch (err) {
    console.log(err);
  }
  if (names === undefined) {
    console.log('undefined');
  } else {
    var count = names.length;
    names.forEach(name => {
        if(name != '.DS_Store' && name != 'index.css' && name != 'index.css.map' && name != 'fonts.css' && name != 'fonts.css.map' && name != 'fonts_dev.css' && name != 'fonts_dev.css.map') {
            fs.copyFile(dir+name, dest+name, (err) => {
                if (err) throw err;
            });
        }else{
            count = count-1;
        }
    });
    console.log(colors.green('Successfully copied '+count+' '+type+'-files!'));
  }
}

// function to read files and extract content
function fileToString(filePath){
    try{
        return fs.readFileSync(filePath, 'utf8');
    }catch(e){
        console.log(colors.bgRed('There was an error reading the file: '+ filePath))
        console.log(color.bgRed(e));
        return "";
    }
}

// generating pages
function generateHTML(){

    const pages = require('./src/data/pages.json');
    var countPages = pages.length;
    console.log(colors.green(countPages+' sub-pages to generate...'));

    pages.forEach(page => {

        // generating html from file
        var contentHTML = fileToString('./public/subPage.html');
        contentHTML = contentHTML.replace(/(\r\n|\n|\r)/gm, "");
        
        // including javascript from file
        var contentJS = fileToString('./public/controls.js');
        // contentJS = contentJS.replace(/(\r\n|\n|\r)/gm, "");
        contentHTML = contentHTML.replace('//script', contentJS);

        // set page name for loading script
        contentHTML = contentHTML.replace('replaceCITY', page.tag);

        // including title, description and h1 headline
        pageFile = './src/data/'+page.tag+'.json';
        const content = require(pageFile);
        contentHTML = contentHTML.replace('<!--title-->', content.title);
        contentHTML = contentHTML.replace('//description', content.description);
        contentHTML = contentHTML.replace('<!--h1-->', content.name);

        // generate navi-container
        var navElements = "";
        var i=1;
        content.navi.forEach(nav => {
            for (const [key, value] of Object.entries(nav)) {
                navElements += '<div id="nav'+i+'" onclick="showText('+i+')" class="nav">'+`${value}`+'</div>';
                i++;
            }
        });
        contentHTML = contentHTML.replace('<!--navi-->', navElements);

        // generate page-container
        var pageElements = '';
        var i=1;
        const subPages = require('./src/data/pages.json');
        subPages.forEach(subPage => {
            active = '';
            if(page.tag == subPage.tag){ active = ' active'; }
            pageElements += '<div id="'+subPage.tag+'" class="cityPoint'+active+'"><a href="'+subPage.tag+'.html">'+subPage.name+'</a></div>';
            i++;
        });
        contentHTML = contentHTML.replace('<!--city-->', pageElements);

        // generate text-containers
        var textElements = '';
        var i=1;
        content.content.forEach(nav => {
            for (const [key, value] of Object.entries(nav)) {
                textElements += '<div id="text'+i+'" class="text">'+`${value}`+'</div>';
                i++;
            }
        });
        contentHTML = contentHTML.replace('<!--content-->', textElements);

        // replace foot url info for imprint and privcy
        contentHTML = contentHTML.replace('//urlname', urlName);
        contentHTML = contentHTML.replace('//imprintpath', imprintPath);
        contentHTML = contentHTML.replace('//privacypath', privacyPath);
        
        fs.writeFile('deploy/'+page.tag+'.html', contentHTML, function (err) {
            if (err) throw err;
            console.log(colors.green('Successfully generated ')+colors.underline.green(page.tag+'.html'));
        });
        
    });
}

function generateIndex(){

    // generating html from file
    var contentHTML = fileToString('./public/index.html');
    contentHTML = contentHTML.replace(/(\r\n|\n|\r)/gm, "");

    // generating html from file
    var contentCSS = fileToString('./src/css/index.css');
    contentCSS = contentCSS.replace(/(\r\n|\n|\r)/gm, "");
    contentCSS = contentCSS.replace('/*# sourceMappingURL=index.css.map */', '');
    contentHTML = contentHTML.replace('/*style*/', contentCSS);

    // including title, description and h1 headline
    contentHTML = contentHTML.replace('<!--title-->', indexName+' - Overview');
    contentHTML = contentHTML.replace('//description', 'Overview of Page - '+indexName);
    contentHTML = contentHTML.replace('<!--h1-->', indexName+' - Overview');

    const pages = require('./src/data/pages.json');
    pageElements = '';
    pages.forEach(page => {
        // generate page-container
        pageElements += '<a href="'+page.tag+'.html"><div id="'+page.tag+'" class="cityDiv" style="background-image: url(\'img/'+page.tag+'_idx.jpg\')"><div class="inside"><h2>'+page.name+'</h2></div></div></a>';
    });

    contentHTML = contentHTML.replace('<!--content-->', pageElements);

    // replace foot url info for imprint and privcy
    contentHTML = contentHTML.replace('//urlname', urlName);
    contentHTML = contentHTML.replace('//imprintpath', imprintPath);
    contentHTML = contentHTML.replace('//privacypath', privacyPath);
    
    fs.writeFile('deploy/index.html', contentHTML, function (err) {
        if (err) throw err;
        console.log(colors.green('Successfully generated ')+colors.underline.green('index.html'));
    });
}

async function resizeImage() {
    let names;
    try {
        names = await readdir('src/img/');
    } catch (err) {
        console.log(err);
    }
    if (names === undefined) {
        console.log('undefined');
    } else {
        var newWidth = 500;
        var newHeight = (1080 * 500) / 1920 ;
        var i=1;
        names.forEach(name => {
            if(name.includes('_hd.jpg')) {
                var newName = name.replace('_hd.jpg', '');
                var newImageName = 'deploy/img/'+newName+"_idx.jpg";
                var currentImage = 'src/img/'+name;
                Jimp.read(currentImage, (err, newImage) => {
                    if (err) throw err;
                    newImage
                      .resize(newWidth, newHeight) // resize
                      .crop(0, 10,newWidth, 260)
                      .quality(50) // set JPEG quality
                      .write(newImageName); // save
                });
                i++;
            }
        });
        console.log(colors.green('Successfully generated '+i+' overview-images!'));
      }
} 

function deployWebsite(){
    generateFolders();

    setTimeout(function(){
        copyFiles('src/img/', 'deploy/img/', 'image');
        copyFavico();
        copyFiles('src/css/', 'deploy/css/', 'css');
        copyFiles('src/fonts/', 'deploy/fonts/', 'font');
        resizeImage();
        console.log('----------');
        setTimeout(function(){
            console.log('----------');
            generateHTML();
        }, 1000);
        setTimeout(function(){
            console.log('----------');
            generateIndex();
        }, 2000);
        setTimeout(function(){
            console.log('----------');
            console.log(colors.yellow('Finished process: folder "deploy" is ready to be published'));
        }, 3000);
    }, 2500);
    
}


console.log(colors.yellow('Starting process'));
deployWebsite();