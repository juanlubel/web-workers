# webworkers

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run watch
```

# Goals

Este proyecto se ha comenzado configurando un webpack simple para permitir el uso de ES6 y explorar los entrypoints para incluir más archivos (workers).

También se ha iniciado la exploración de los [DedicatedWorkers](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope), buscando la siguiente funcionalidad:

* Evitar el bloqueo del hilo principal, simulando un componente que se actualiza cada segundo.

    * El primer botón ejecuta un bucle con 200,000 iteraciones, lo que impide la actualización del DOM cada segundo.
    * El segundo botón ejecuta el mismo bucle, pero utilizando un worker, lo que no bloquea la actualización del DOM.
* Comunicación con el Worker hasta que el worker reciba toda la información y, al procesarla, la devuelva.

    * El tercer botón lanza un método que envía 4 mensajes al worker. Cuando el quinto mensaje con valor NULL llega al worker, este calcula la información y la devuelve.
      Este método actualiza un elemento del DOM con cada respuesta del worker.

---

This project has been started by setting up a simple webpack configuration to enable the use of ES6 in the code and to explore entrypoints to include more files (workers).

Also, the exploration of [DedicatedWorkers](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope) has begun, aiming for the following functionality:

* Avoid blocking the main thread, simulating a component that updates every second.

    * The first button runs a loop with 200,000 iterations, which prevents the DOM from updating every second.
    * The second button executes the same loop but uses a worker, which doesn't block DOM updates.
* Communicate with the Worker until it receives all the information and, upon processing it, returns it.

    * The third button triggers a method that sends 4 messages to the worker. When the fifth message with a NULL value arrives at the worker, it calculates the information and returns it.
      This method updates a DOM element with each response from the worker.