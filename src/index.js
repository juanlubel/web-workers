import foorlop from './forloop.js'
import sleep from "./core/sleep";

function HandleClick() {
    foorlop(200_000)
    const totalElement = document.createElement('div')
    totalElement.innerHTML = "10.000"
    document.body.appendChild(totalElement)
}

function HandleWorkerClick() {
    const worker = new Worker('workers/loop.worker.js')
    worker.postMessage(200_000)
    worker.onmessage = ({data}) => {
        console.log(data)
        console.log(`data from worker ${data}`)
        worker.terminate()

    }
}

async function HandleCommunicateClick() {
    const worker = new Worker('workers/communicate.worker.js')


    worker.onmessage = ({data}) => {
        console.log(data)
        console.log(`data from worker ${data[0]}`)
        const alert = document.getElementById('alert')
        alert.innerHTML = data[0]
        if (data[1])
            worker.terminate()
    }
    for (let i = 0; i < 4; i++) {
        worker.postMessage(i)
        await sleep()
    }
    worker.postMessage(null)
}

function ButtonComponent() {
    const element = document.createElement('button')
    element.id = 'button'

    element.innerHTML = 'Click Me!'
    element.onclick = HandleClick

    return element
}

function ButtonWorkerComponent() {
    const element = document.createElement('button')
    element.id = 'button-worker'
    element.innerHTML = 'Click Me! (Worker)'
    element.onclick = HandleWorkerClick

    return element
}

function ButtonCommunicateWorkerComponent() {
    const element = document.createElement('button')
    element.id = 'button-comm-worker'
    element.innerHTML = 'Click Me! (Comm)'
    element.onclick = HandleCommunicateClick

    return element
}

function CounterComponent() {
    const element = document.createElement('div')
    element.id = 'counter'

    element.innerHTML = '1'

    setInterval(() => {
        const domElement = document.getElementById('counter')
        if (domElement) {
            let numInnerHtml = +domElement.innerHTML
            domElement.innerHTML = ++numInnerHtml
        }
    }, 1_000)

    return element
}

function AlertComponent() {
    const component = document.createElement('div')
    component.id = 'alert'

    component.innerHTML = '0'
    return component
}


document.body.appendChild(CounterComponent())
document.body.appendChild(ButtonComponent())
document.body.appendChild(ButtonWorkerComponent())
document.body.appendChild(ButtonCommunicateWorkerComponent())
document.body.appendChild(AlertComponent())