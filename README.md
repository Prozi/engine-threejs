# @minininja/threejs

*The @minininja/engine* + threejs. Ready for game development.

It requires `three.js` as a peer dependency.


## Installation

`yarn add @minininja/threejs three.js --save`

or

`npm install @minininja/threejs three.js --save`


## Demo / Benchmark

https://prozi.github.io/engine-threejs/demo/

See at any time corresponding FPS to

`app.currentScene.transform.children.length`

All sprites are updated each frame if they're active (in benchmark they are)
And it works fast and smooth


## Documentation

https://prozi.github.io/engine-threejs/


Read more about *The engine* here:

https://github.com/Prozi/engine/


## Contents

✅ Mesh

✅ Scene

✅ Application

... and more to come!


## Usage

web + webpack

```
const engine = require('@minininja/threejs')
```


node

```
const engine = require('@minininja/threejs')
```


then

```
const scene = new engine.Scene()
const object = new engine.Mesh()
scene.add(object)
setInterval(scene.onUpdate.bind(scene), 1000 / 60)
```


## About

All classes are extended from `GameObject` from *The engine*.


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
