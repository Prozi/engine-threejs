'use strict'

import * as THREE from 'three'
import * as engine from '@minininja/engine'

/**
 * Script extension with one parameter: the onUpdate function
 * @extends engine.Script
 */
export class UpdateScript extends engine.Script {
  /**
   * @param {function} onUpdate the runner meat of script
   */
  constructor(onUpdate) {
    super(Object.assign({
      name: 'UpdateScript',
      onUpdate
    }, props))
  }
}

/**
 * Simple GameObject API Sprite with this.transform: THREE.Mesh
 * @extends engine.GameObject
 */
export class Mesh extends engine.GameObject {
  /**
   * Initializes component with props, with THREE.Mesh
   * @param {object} props
   * @param {string} [props.name=PixiScene]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  createTransform(config = {}) {
    const geometry = config.geometry || new THREE.BoxGeometry(1, 1, 1)
    const material = config.material || new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    mesh.gameObject = this
    return mesh
  }
}

/**
 * Simple GameObject API Container with this.transform: THREE.Scene
 * @extends engine.GameObject
 */
export class Scene extends engine.GameObject {
  /**
   * Initializes component with props, and THREE.Scene
   * @param {object} props
   * @param {string} [props.name=PixiScene]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props) {
    super(Object.assign({
      name: 'ThreeScene'
    }, props))
  }
  /**
   * Initializes component with props, with PIXI.Sprite
   * @param {object} props
   * @param {string} [props.name=PixiScene]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  createTransform(config) {
    const scene = new THREE.Scene()
    scene.gameObject = this
    return scene
  }
}

/**
 * Exntesion of THREE.WebGLRenderer
 * with mouse and resize support
 * 
 * just add any of engine.* classes' transforms
 * and it will update their gameObjects' scripts
 */
export class Application extends THREE.WebGLRenderer {
  /**
   * Initializes component with props, and PIXI.Container
   * @param {object} props
   * @param {string} [props.name=Game]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props = {}) {
    super()
    // todo check three.js event loop
    this.autoUpdate = false
    this.setSize(window.innerWidth, window.innerHeight)
    this.props = props
    this.state = {
      mouse: new engine.Vector3()
    }
    this.addEmptyScene()
    this.addCamera()
    this.addCanvas()
    this.bindEvents()
    this.startScripts()    
  }
  addEmptyScene() {
    this.currentScene = new Scene()
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10)
  }
  addToScene(gameObject) {
    this.currentScene.transform.add(gameObject.transform)
  }
  addCanvas() {
    document.body.appendChild(this.domElement)
  }
  bindEvents() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.setSize(window.innerWidth, window.innerHeight)
      })
    })
    window.addEventListener('pointermove', (event) => {
      this.state.mouse.set({
        x: event.pageX,
        y: event.pageY
      })
    })
  }
  updateScripts() {
    const scripts = this.currentScene.transform.children.filter((child) => child.gameObject)
      .map((child) => child.gameObject)
    scripts.forEach((child) => child.onUpdate())
    scripts.forEach((child) => child.afterUpdate())
  }
  startScripts() {
    this.updateScripts()
    this.render(this.currentScene.transform, this.camera)
    setTimeout(() => this.startScripts(), 1000 / 60)
  }
}
