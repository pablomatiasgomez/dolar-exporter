#!/usr/bin/env node
'use strict';

const request = require('request-promise');
const XLSX = require('xlsx');

//----------------------

return request({
	url: "http://www.bcra.gob.ar/Pdfs/PublicacionesEstadisticas/com3500.xls",
	encoding: null
}).then(response => {
	let data = new Uint8Array(response);
	let workbook = XLSX.read(data, { type: "array" });
	let sheet = workbook.Sheets["TCR diario y TCNPM"];

	let i = 5;
	while (true) {
		let date = sheet["C" + i];
		let value = sheet["D" + i];
		if (date && date.w && value && value.w) {
			let dateSplit = date.w.split("-");
			console.log(`${dateSplit[1]}/${dateSplit[0]}/20${dateSplit[2]}\t${value.w}`);
			i++;
		} else {
			break;
		}
	}
});