
function is_image(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

if (typeof module !== 'undefined') {
    module.exports = is_image;
}