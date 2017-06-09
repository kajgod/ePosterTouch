var childProc = require('child_process');
var fs = require('fs');

var ulaz='', izlaz='', ime, upisano='';
var jsoni=[];
var brojac=0;
fs.readdirSync('./input/').forEach(file => {
  ime=file.substr(file.length-4);
    if(ime.toUpperCase()==='.PDF'){
            	console.log('Konvertiram: '+file);
    	childProc.execSync('"poppler-0.51/bin/pdftocairo.exe" -svg "input/'+file+'" "output/'+file.slice(0,-4)+'.svg"');
    	console.log('Kreirano: svg/asd'+file.slice(0,-4)+'.svg');
        console.log('"output/asd'+file.slice(0,-4)+'.png"');
    	childProc.execSync('"poppler-0.51/bin/pdftoppm.exe" -png -scale-to 400 "input/'+file+'" "output/'+file.slice(0,-4)+'.png"');//pdftoppm -png myfile.pdf > myfile.png
    	console.log('Kreirano: png/asd'+file.slice(0,-4)+'.png');
    	console.log('****************************************');
    	fs.appendFile('biljezi.txt','\n\r"poppler-0.51/bin/pdftocairo.exe" -svg "'+file+'" "svg/asd'+file.slice(0,-4)+'.svg"');
    	jsoni.push({id: brojac, filename: file.slice(0,-4), naslov: "Ovo je naslov", opis: "A ovo je nešto duže zato kaj je to opis.", audio: true, video: true});
        brojac++;
    }
});
fs.writeFile('output/lista.js', 'var lista='+JSON.stringify(jsoni));
