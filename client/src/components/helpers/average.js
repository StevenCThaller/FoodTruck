module.exports = reviews => {
    let avg = 0;
    if(reviews.length !== 0) {
        reviews.forEach(r => {
            avg += r.rating;
        });
        avg /= reviews.length;
    }
    return avg;
}