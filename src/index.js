import foorlop from './forloop.js'
import sleep from "./core/sleep";


function HandleClick() {
    const message = document.getElementById('message')
    message.innerHTML = "I'm going to ..."
    setTimeout(() => {
        foorlop(500_000)
        message.innerHTML = "500_000 Bored"
    },0)
}

function HandleWorkerClick() {
    const worker = new Worker('workers/loop.worker.js')
    const message = document.getElementById('message')

    message.innerHTML = "I'm not going to block"
    const timeout = setTimeout(() => {
        message.innerHTML = "You see?"
    }, 3_000)
    worker.postMessage(500_000)
    worker.onmessage = ({data}) => {
        clearTimeout(timeout)
        console.log(data)
        console.log(`data from worker ${data}`)
        worker.terminate()
        message.innerHTML = "500_000 Magic"
    }
}

async function HandleCommunicateClick() {
    const worker = new Worker('workers/communicate.worker.js')

    worker.onmessage = ({data}) => {
        console.log(data)
        console.log(`data from worker ${data[0]}`)
        const message = document.getElementById('message')
        message.innerHTML = data[0]
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
    element.innerHTML = 'Bored button'
    element.onclick = HandleClick

    return element
}

function ButtonWorkerComponent() {
    const element = document.createElement('button')
    element.id = 'button-worker'
    element.innerHTML = 'Magic Button'
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
    const element = document.createElement('h1')
    element.id = 'counter'
    element.innerHTML = '1'

    setInterval(() => {
        const domElement = document.getElementById('counter')
        if (domElement) {
            let numInnerHtml = +domElement.innerHTML
            domElement.innerHTML = `${++numInnerHtml}`
        }
    }, 1_000)

    return element
}

function MessageComponent() {
    const component = document.createElement('p')
    component.className = 'notice'
    component.id = 'message'

    component.innerHTML = '0'
    return component
}

const header = document.getElementsByTagName('header')[0]
const main = document.getElementsByTagName('main')[0]
const footer = document.getElementsByTagName('footer')[0]

header.appendChild(CounterComponent())
main.appendChild(ButtonComponent())
main.appendChild(ButtonWorkerComponent())
// document.body.appendChild(ButtonCommunicateWorkerComponent())
footer.appendChild(MessageComponent())