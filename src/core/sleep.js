
function sleep(time = 2_000) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

module.exports = sleep