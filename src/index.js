import dat from 'dat.gui'
import p5 from 'p5'

const imageSize = { width: 1024, height: 1288 }

const settings = {
    green: 1,
}

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(settings, 'green', 0.0, 1.0).step(0.1)
}

function getCanvasSize(p) {
    const width = Math.min(p.windowWidth, imageSize.width)
    const height = width * (imageSize.height / imageSize.width)
    return { width, height }
}

const sketch = (p) => {
    let shader, image, result

    p.preload = () => {
        shader = p.loadShader('./assets/shaders/shader.vert', './assets/shaders/shader.frag')
        image = p.loadImage('./assets/images/masks.jpg')
    }

    p.setup = () => {
        const { width, height } = getCanvasSize(p)
        p.createCanvas(width, height, p.WEBGL)
        p.noStroke()
    }

    p.draw = () => {
        p.shader(shader)

        shader.setUniform('u_resolution', [p.width, p.height]) // required
        shader.setUniform('green', settings.green)
        shader.setUniform('image', image)
        
        p.rect(0, 0, p.width, p.height)
    }

    p.windowResized = () => {
        const { width, height } = getCanvasSize(p)
        p.resizeCanvas(width, height)
    }
}

new p5(sketch)
