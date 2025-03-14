const fs = require('node:fs');
const Ajv = require("ajv")
const ajv = new Ajv()

const schema_file = 'schema_tournois.json'
const data_file = 'docs/tournois/tournois.json'

try {
    schema = JSON.parse(fs.readFileSync(schema_file, 'utf8'));   
} catch (err) {
    console.error(err);
}

try {
    json_read = JSON.parse(fs.readFileSync(data_file, 'utf8'));
} catch (err) {
    console.error(err);
}

console.log("Schema: " + schema_file)
console.log("Data: " + data_file)
const valid = ajv.validate(schema, json_read)

if (!valid) {
    console.log("ERROR !!!");
    console.log(ajv.errors);
    process.exit(1);
} else {
    console.log("Ok")
}
