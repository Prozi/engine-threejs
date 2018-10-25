'use strict'

import { Application, Mesh } from '../src'
import Stats from 'stats-js'

const stats = new Stats()

document.body.appendChild(stats.domElement)

export default class App extends Application {
  constructor() {
    super()
    this.camera.position.z = 10
  }
  createCube(onUpdate) {
    return new Mesh({ onUpdate })
  }
  addCube() {
    const speedX = Math.random()
    const speedY = Math.random()
    const speedZ = Math.random()
    const cube = this.createCube(function () {
      const sec = Date.now() / 1000
      const lifeTime = (Date.now() - cube.createdAt) / 1000
      const opacity = Math.min(1, this.transform.material.opacity + lifeTime * 0.1)
      this.transform.rotation.x = sec * speedX
      this.transform.rotation.y = sec * speedY
      this.transform.rotation.z = sec * speedZ
      this.transform.material.opacity = opacity
    })
    cube.createdAt = Date.now()
    cube.transform.position.x = (Math.random() - 0.5) * 15
    cube.transform.position.y = (Math.random() - 0.5) * 10
    cube.transform.position.z = 0
    cube.transform.material.transparent = true
    cube.transform.material.opacity = 0
    this.addToScene(cube)
  }
  beforeUpdate() {
    stats.begin()
    super.beforeUpdate()
  }
  loop() {
    this.addCube()
    super.loop()
  }
  afterUpdate() {
    super.afterUpdate()
    stats.end()
  }
}
