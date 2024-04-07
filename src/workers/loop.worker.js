onmessage = function (e) {
    console.log('Worker: Message received from main script');
    console.log(e)
    const iterations = e.data;
    for (let i = 0; i < iterations; i++) {
        console.log(i)
    }
    postMessage(iterations);

}