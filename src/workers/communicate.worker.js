import sleep from "../core/sleep";

const rand = Math.random()
const map = []
onmessage = async (e) => {
    console.log(rand)
    console.log(e.data)
    if (e.data === null) {
        let sum = 0;
        for (const e of map) {
            sum += e
        }
        postMessage([sum, true])
    }

    map.push(e.data)
    postMessage([e.data])

}