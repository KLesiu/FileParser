#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const yaml = require('js-yaml');

// Funkcja pomocnicza do wyświetlania pomocy
function showHelp() {
    console.log(`
Usage: node index.js <inputFile> <outputFormat>

<inputFile>     Path to the input file (.xml, .json, .yml)
<outputFormat>  Desired output format (xml, json, yml)
    `);
}

// Sprawdzenie argumentów
if (process.argv.length !== 4) {
    showHelp();
    process.exit(1);
}

const inputFile = process.argv[2];
const outputFormat = process.argv[3].toLowerCase();
const validFormats = ['xml', 'json', 'yml'];

// Sprawdzenie, czy format wyjściowy jest poprawny
if (!validFormats.includes(outputFormat)) {
    console.error('Error: Invalid output format. Valid formats are: xml, json, yml');
    showHelp();
    process.exit(1);
}

// Wczytanie pliku wejściowego
const inputContent = fs.readFileSync(inputFile, 'utf8');
const ext = path.extname(inputFile).toLowerCase();

// Funkcja do konwersji na format XML
function toXML(obj) {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
}

// Funkcja do konwersji na format JSON
function toJSON(obj) {
    return JSON.stringify(obj, null, 2);
}


// Zapisanie wyniku do pliku wyjściowego
const outputFile = inputFile.replace(ext, `.${outputFormat}`);
fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log(`Converted ${inputFile} to ${outputFile}`);



// Funkcja do konwersji na format YAML
function toYAML(obj) {
    return yaml.dump(obj);
}

// Parsowanie i konwersja
let parsedData;
switch (ext) {
    case '.xml':
        xml2js.parseString(inputContent, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                process.exit(1);
            }
            parsedData = result;
        });
        break;
    case '.json':
        parsedData = JSON.parse(inputContent);
        break;
    case '.yml':
    case '.yaml':
        parsedData = yaml.load(inputContent);
        break;
    default:
        console.error('Error: Unsupported input file format. Supported formats are: .xml, .json, .yml');
        process.exit(1);
}

// Konwersja na żądany format
let outputContent;
switch (outputFormat) {
    case 'xml':
        outputContent = toXML(parsedData);
        break;
    case 'json':
        outputContent = toJSON(parsedData);
        break;
    case 'yml':
        outputContent = toYAML(parsedData);
        break;
}

