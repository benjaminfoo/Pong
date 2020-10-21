# Web-Programmierung
## Projekt: Pong

Dieses Projekt ist im Laufe der Vorlesung "Web-Programmierung" entstanden und dient ausschließlich dem Zweck der Wissensvermittlung :). \
Eine Live-Demo kann unter https://benjaminfoo.github.io/pong ausprobiert werden.

## Vorwort
Diese Markdown-Datei ist Teil des Projekts für die Vorlesung "Web-Programmierung.". 
In Diesem Dokument wird die Installation, der Umfang und einige Details zur Implementierung beschrieben.


### Dateihierarchie
* /assets - Enthält multimediale-Daten wie Schriftarten und Sounds  
* /css - Enthält die Cascading-Style-Sheets welche in diesem Projekt verwendet werden
* /js - Enthält die JavaScript-Dateien welche in diesem Projekt verwendet werden
* favicon.ico - Stellt das Icon, welches im Browser(-Tab) dargestellt wird, dar
* index.html - Die Hauptseite des Projekts, enthält Links auf alle Unterseiten
* readme.md - Diese Readme-Datei

### Implementierung
Die Implementierung der Spiel-Logik wurde mittels ECMAScript in der Version 6 realisiert (JavaScript). 
Jede JavaScript-Datei ist dabei mit dem "use strict"-Paradigma versehen. Die HTML-Webseiten wurden mit dem, in der 
Vorlesung vorgestellten Markup Validation Service validiert (https://validator.w3.org/).

##### Details zu JavaScript 
Der Funktionsumfang der Anwendung wurde mittels den vier folgenden JavaScript-Dateien realisiert: 

<b>Pong.js</b>  
Enthält die gesamte Spiel-Logik (Berechnung der Positionen, Darstellung der Spiel-Elemente, 
Highscore-Management, Behandlung des Gewinners, Neustart, etc.). All die anderen Klassen des Projekts werden innerhalb 
dieser Klasse verwendet.  

<b>Player.js</b>   
Modell-Klasse (wie ein POJO aus Java) welches nur zur Datenhaltung verwendet wird. Die Logik des Spielers (Punktevergae,
Steuerung, etc.) wird in <b>Pong.js</b> behandelt.

<b>Ball.js</b>  
Zum einen Teil Modell-Klasse, zum anderen Teil auf der Logik-Ebene, berechnet diese Klasse die Position des Balls und 
dessen allgemeines Verhalten (das Abspielen eines Sound-Effekts, die Kollision mit einem Spieler oder einer Wand, etc.). 

<b>Utils.js</b>  
Helfer-Klasse mit zahlreichen Optionen zur Steuerung des Spiels (wie z.B. der Pause-Modus, die De-/Aktivierung des Tons, 
die Aktivierung der Maussteuerung pro Spieler, uvm.). Wird in der<b>initialize()-Methode</b> der <b>Pong.js</b>-Klasse 
konfiguriert und initialisiert. 


### Installation
Für die korrekte Nutzung der Anwendung wird die Verwendung eines Web-Servers (wie der Apache, Apache Tomcat, nginx, etc.) empfohlen.
Die Installation unterscheided sich je nach verwendeten Betriebssystem und Web-Server, i.d.R. müssen aber alle zu dieser Abgabe gehörenden Dateien und 
Ordner in das jeweilige Verzeichnis für die Auslieferung von Web-Inhalten kopiert werden.

Unter Linux, unter der Verwendung des Apache Web-Servers sollte es ausreichen, wenn die gesamten Dateien und Ordner in das Verzeichnis " /var/www/html" kopiert werden.
