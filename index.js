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

