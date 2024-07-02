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
    const xml = builder.buildObject({ data: obj }); // Dodanie korzenia "data" dla xml2js
    return xml;
}

// Funkcja do konwersji na format JSON
function toJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

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

            // Konwersja na żądany format po zakończeniu parsowania
            switch (outputFormat) {
                case 'xml':
                    const xmlOutput = toXML(parsedData);
                    const outputFile = inputFile.replace(ext, `.${outputFormat}`);
                    fs.writeFileSync(outputFile, xmlOutput, 'utf8');
                    console.log(`Converted ${inputFile} to ${outputFile}`);
                    break;
                case 'json':
                    const jsonOutput = toJSON(parsedData);
                    const jsonOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                    fs.writeFileSync(jsonOutputFile, jsonOutput, 'utf8');
                    console.log(`Converted ${inputFile} to ${jsonOutputFile}`);
                    break;
                case 'yml':
                    const yamlOutput = toYAML(parsedData);
                    const yamlOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                    fs.writeFileSync(yamlOutputFile, yamlOutput, 'utf8');
                    console.log(`Converted ${inputFile} to ${yamlOutputFile}`);
                    break;
            }
        });
        break;
    case '.json':
        parsedData = JSON.parse(inputContent);
        // W przypadku pliku JSON, konwersja do innych formatów bezpośrednio
        switch (outputFormat) {
            case 'xml':
                const xmlOutput = toXML(parsedData);
                const outputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(outputFile, xmlOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${outputFile}`);
                break;
            case 'json':
                const jsonOutput = toJSON(parsedData);
                const jsonOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(jsonOutputFile, jsonOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${jsonOutputFile}`);
                break;
            case 'yml':
                const yamlOutput = toYAML(parsedData);
                const yamlOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(yamlOutputFile, yamlOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${yamlOutputFile}`);
                break;
        }
        break;
    case '.yml':
    case '.yaml':
        parsedData = yaml.load(inputContent);
        // W przypadku pliku YAML, konwersja do innych formatów bezpośrednio
        switch (outputFormat) {
            case 'xml':
                const xmlOutput = toXML(parsedData);
                const outputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(outputFile, xmlOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${outputFile}`);
                break;
            case 'json':
                const jsonOutput = toJSON(parsedData);
                const jsonOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(jsonOutputFile, jsonOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${jsonOutputFile}`);
                break;
            case 'yml':
                const yamlOutput = toYAML(parsedData);
                const yamlOutputFile = inputFile.replace(ext, `.${outputFormat}`);
                fs.writeFileSync(yamlOutputFile, yamlOutput, 'utf8');
                console.log(`Converted ${inputFile} to ${yamlOutputFile}`);
                break;
        }
        break;
    default:
        console.error('Error: Unsupported input file format. Supported formats are: .xml, .json, .yml');
        process.exit(1);
}
