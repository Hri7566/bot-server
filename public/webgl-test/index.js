function setup() {
    createCanvas(400, 400, WEBGL);
}

function preload() {
    let model = loadModel('star.obj');
}

angle = {
    x: 0,
    y: 0,
    z: 0
}

function draw() {
    pointLight(255, 255, 255, -800, -800, 1200);
    background(0);

    angle.y = mouseX/400;
    angle.z = -mouseY/400;

    rectMode(CENTER);
    noStroke();
    specularMaterial(255, 0, 0);
    rotateX(angle.x);
    rotateY(angle.y);
    rotateZ(angle.z);
    //box(150, 150, 150)
    //model(model);
}