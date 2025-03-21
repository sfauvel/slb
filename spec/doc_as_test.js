const fs = require('fs');

function verify(title, text) {
    const name = title.replaceAll(' ', '_').toLowerCase();
    received_filename='spec/docs/'+ name + '.received.adoc';
    approved_filename='spec/docs/'+ name + '.approved.adoc';

    if (fs.existsSync(received_filename)) {
        fs.unlinkSync(received_filename);
    }


    if (!fs.existsSync(approved_filename)) {
        fs.writeFileSync(received_filename, text);
        fail(`No approved file: ${approved_filename}`);
        return;
    }
        console.log("xxx");
    var approved;
    try {
        approved = fs.readFileSync(approved_filename, 'utf8');
        if (approved === text) {
        return;
        }      
    } catch (err) {
        console.error(err);
    }

    fs.writeFileSync(received_filename, text);
    expect(text).toEqual(approved);
}

function doc(name, test_function) {
    return it(name, function() {
        test_function(name);
    });
}

module.exports = {
    doc,
    verify
}