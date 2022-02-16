"use strict";

var gl;
var triangleShape;
var squareShape;
var hexShape;
var shapeNum = 1;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //
    //  Initialize our data for a single triangle
    //

    // First, initialize the  three points.

    triangleShape = new Float32Array([
        -0.5, -0.5,
        0,  0.5,
        0.5, -0.5
    ]);

    squareShape = new Float32Array([
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);

    hexShape = new Float32Array([
        -0.5, 0,
        -0.3, 0.5,
        0.3, 0.5,
        0.5, 0,
        0.3, -0.5,
        -0.3, -0.5
    ]);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );

    // Associate out shader variables with our data buffer

    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render(shapeNum);
};


function render(shapeNum) {
    gl.clear( gl.COLOR_BUFFER_BIT );

    var pickShape;
    var numVerts;

    switch (shapeNum) {
        case 1:
            pickShape = triangleShape;
            numVerts = 3;
            break;
        case 2:
            pickShape = squareShape;
            numVerts = 4;
            break;
        case 3:
            pickShape = hexShape;
            numVerts = 6;
            break;
    }

    gl.bufferData( gl.ARRAY_BUFFER, pickShape, gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, numVerts);
}

document.onmousedown = click
// click function called
function click(event) {
    // left click
    if (event.button == 0) {
        if (shapeNum == 3)
            shapeNum = 1;
        else
            shapeNum += 1;

        render(shapeNum);
    }
}
