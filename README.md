# Bundle a JS-Website and generate HTML Files

In this project I built my own compiler to prove my JS-coding-skills.

The base is a fully in JS generated Website with dynamic content from JSON-files and dynamic changing style content.
https://www.u-php.de/js-coding/big-cities/

My task was, to build a compiler, that bundles the dynamic content and generates static html websites with a little interactive JS left.

## npm install

Installiere die Module für die einwandfreie Bearbeitung der Inhalte

## dev.js

Über das Terminal lässt sich mittels eingabe von "node dev.js" die dynamische Webseite betrachten. Der Source-Code dieser Vorlage befindet sich im Ordner:

- src/
- -> sass/ (Stylesheets)
- -> img/ (Bilder)
- -> js/ (Hauptscript)
- -> data/ (Textinhalte)

Das CSS Layout wird über Sass-Dateien gesteuert, welches transpiliert werden muss.

- sass --watch src/sass/:src/css/

## deploy.js

Um aus dem dynamischen Content statische HTML-Seiten zu generieren, ruft man lediglich "node deploy.js" auf. Mit diesem Script wird automatisch der Ordner "deploy" erstellt, die statischen Inhalte generiert und gespeichert.

### Bildformate

Für die qualität der Hintergrundbilder werden folgende Bildformate benötigt:

- Widescreen: "xxx_wqhd.jpg" / 2160x1440 Pixel
- Full-HD horizontal: "xxx_hd.jpg" / 1920x1080 Pixel
- Full-HD vertikal: "xxx_hd_v.jpg / 1080x1920 Pixel
- Mobile horizontal: "xxx_mobile_h.jpg / 900x500 Pixel
- Mobile vertikal: "xxx_mobile_v.jpg / 500x900 Pixel
- Mobile horizontal: "xxx_mobile_h.jpg / 900x500 Pixel
- Tablet 4:3 / 3/4 Format: "xxx_square.jpg / 1920x1920 Pixel
- 4k UHD: "xxx_4k.jpg2 / 3840x2160 Pixel

