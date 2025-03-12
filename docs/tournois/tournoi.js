
function is_image(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

module.exports = is_image;