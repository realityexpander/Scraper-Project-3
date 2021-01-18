const { GoogleSpreadsheet } = require('google-spreadsheet');


// Zen quotes source: https://quotabulary.com/famous-zen-quotes-about-life

class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1fz1KCUkLiWRPZ2FThC-wlcZzjbEEE2EIPu8SGeCbwVA');
    }
    
    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'))
        await this.doc.loadInfo(); // loads document properties and worksheets
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }

    async getRows() {
        const sheet = this.doc.sheetsByIndex[0];
        return await sheet.getRows();
    }
}


// async function test() {
//     const sheet = new Sheet()

//     await sheet.load()
//     await sheet.addRows([
//         { name: "Chris Athanas", email:'jimmy@ho.com'},
//         { name: "Crap crapasaurus", email:'uyyy@hos.com'}
//     ])
// }
// test()


module.exports = Sheet
