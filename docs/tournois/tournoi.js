
function is_image(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

module.exports = is_image;