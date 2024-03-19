
function log(req, res, next) {
    console.log("HEllo")

}

function log2(req, res, next) {
    console.log("2nd")
    next()
}

module.exports.logger = log
module.exports.logger2 = log2