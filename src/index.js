import dat from 'dat.gui'
import p5 from 'p5'

window.onload = function() {
    const gui = new dat.GUI()
    const foo = { bar: 'Hello World!' }
    gui.add(foo, 'bar', 10, 1000)
}

const sketch = (p) => {
    let shader

    p.preload = () => {
        shader = p.loadShader('./shaders/shader.vert', './shaders/shader.frag')
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        p.noStroke()
    }

    p.draw = () => {
        p.shader(shader)
        p.rect(0, 0, p.width, p.height)
    }

    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight)
}

new p5(sketch)
