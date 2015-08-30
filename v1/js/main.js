var container;

var camera, scene, renderer;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var synesthesia;

var mouseDown = false;

var mouseX = 0.0, mouseY = 0.0;
var splineCamera;
var time = 0.0;
var capturer = new CCapture( { format: 'webm', workersPath: 'js/' } );
var tube;
var matCap, textureCube;
var geometries = [];
var counter = 0;
var chars = [
'A','B','C','D',
'E','F','G','H',
'I','J','K','L',
'M','N','O','P',
'Q','R','S','T',
'U','V','W','X',
'Y','Z','0','1',
'2','3','4','5',
'6','7','8','9'
];
var colors = {
	A: 0xCD1016,
	B: 0x2975CB,
	C: 0x10197D,
	D: 0x37160F,
	E: 0xEB41CF,
	F: 0xF0800E,
	G: 0x25C940,
	H: 0x225F15,
	I: 0xFFFFFF,
	J: 0x9A6CAE,
	K: 0x491813,
	L: 0xE9EA26,
	M: 0xC11E52,
	N: 0xD27F26,
	O: 0xFFFFFF,
	P: 0x6E0F96,
	Q: 0x6F5980,
	R: 0x583317,
	S: 0xE6D30E,
	T: 0x2B110E,
	U: 0xA1A3A7,
	V: 0xB3621C,
	W: 0xD9DCD6,
	X: 0x222222,
	Y: 0xF3F67C,
	Z: 0xFBF721,
	0: 0xFFFFFF,
	1: 0xEA0D0C,
	2: 0x461C11,
	3: 0x2199D7,
	4: 0xEBE414,
	5: 0x0A6F0C,
	6: 0x09610D,
	7: 0xEB821D,
	8: 0x222222,
	9: 0x2F7E22
}
fbInit();
init();
animate();

function init() {
    
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200000 );
	camera.position.z = 300;
	controls = new THREE.OrbitControls(camera);

	scene = new THREE.Scene();
	
	// splineCamera = new SplineCamera(scene);

	renderer = new THREE.WebGLRenderer({alpha: true, preserveDrawingBuffer:true, antialias:true});
	renderer.setClearColor( 0xFFFFFF );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );
    
    var urls = [];
    var path = "assets/textures/grid"
    var format = ".png";
    /*var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];*/
    var urls = [
        path + format, path + format,
        path + format, path + format,
        path + format, path + format
    ];
    // var img = new Image();
    // img.src = "assets/textures/grid.png";
 //    canv = document.createElement("canvas");
 //    canv.width = 1024;
 //    canv.height = 1024;
 //    document.body.appendChild(canv);
	// ctx = canv.getContext("2d");
	// // ctx.fillStyle = "red";
	// // ctx.fillRect(0,0,canv.width,canv.height);
	// var image = new Image();
	// video = document.createElement("video")
	// image.onload = function(){
	// 	ctx.drawImage(image, 0, 0);
	// }
	// image.src = "assets/textures/art1.jpg";
	// video.src = "assets/textures/test.mp4";
	// video.play();
	// video.loop = true;

	// ctx.drawImage(video, 0,0);

	// var vid = document.createElement("video");
	// vid.src = "assets/textures/test.mp4";
	// vid.loop = true;
	// vid.play();
    var images = [
    	fbRenderer.domElement,
    	fbRenderer.domElement,
    	fbRenderer.domElement,
    	fbRenderer.domElement,
    	fbRenderer.domElement,
    	fbRenderer.domElement
    ]
    // textureCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);
    textureCube = new THREE.CubeTexture(images, THREE.CubeRefractionMapping);
    textureCube.minFilter = textureCube.magFilter = THREE.NearestFilter;

	matCap = THREE.ImageUtils.loadTexture("assets/textures/matcap3.jpg");

	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		side: THREE.BackSide

	} ),

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
	// scene.add( mesh );	


	var cubeGeometry = new THREE.SphereGeometry(1000,200,200);


	loader  = new THREE.JSONLoader();

    loader.load( 'assets/json/pretty.json', function( geometry ) {
		var cubeMaterial = new THREE.MeshBasicMaterial({
			envMap:textureCube,
			refractionRatio: 0.95,
				// shading: THREE.FlatShading
		});
		cube = new THREE.Mesh(geometry, cubeMaterial);
		cube.position.set(0,0,0);
		cube.scale.set(100.0,100.0,100.0);
		scene.add(cube);	
    });


    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove(event) {

	// mouseX = ( event.clientX - windowHalfX ) * 20;
	// mouseY = ( event.clientY - windowHalfY ) * 20;
		unMappedMouseX = (event.clientX );
	    unMappedMouseY = (event.clientY );
			    // mouseX = map(unMappedMouseX, window.innerWidth, -1.0/range,1.0/range);
	    mouseX = map(unMappedMouseX, window.innerWidth, -1.0,1.0);
			    // mouseY = map(unMappedMouseY, window.innerHeight, -1.0/range,1.0/range);
	    mouseY = map(unMappedMouseY, window.innerHeight, -1.0,1.0);
}

function animate() {
	requestAnimationFrame( animate );

	render();
}

function render() {
	many();
	fbDraw();
	time+=0.01;
	textureCube.needsUpdate = true;
	// ctx.drawImage(video, 0,0);
	
	renderer.render( scene, camera );
    capturer.capture( renderer.domElement );

}
function fbInit(){

    fbScene = new THREE.Scene();
    fbCamera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
    fbCamera.position.set(0,0,0);

    fbRenderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true/*, alpha: true*/});
    fbRenderer.setClearColor(0xffffff, 1.0);
    fbRenderer.setSize(1024,1024);

    fbScene = new THREE.Scene();
    

    var customShaders = new CustomShaders();
    var customShaders2 = new CustomShaders();

	canvas = document.createElement("canvas");
	canvas.width = 1024;
	canvas.height = 1024;
	ctx = canvas.getContext("2d");

    fbTexture = new THREE.Texture(canvas);
    fbTexture.needsUpdate = true;

    fbShaders = [ 
        customShaders.reposShader, 
        customShaders.blurShader, 
        customShaders.diffShader, 
        customShaders2.colorShader, 
        customShaders2.blurShader,
        customShaders.bumpShader
    ];

    fbMaterial = new FeedbackMaterial(fbRenderer, fbScene, fbCamera, fbTexture, fbShaders);
        
    fbMaterial.init();
}
function fbDraw(){

	    time+=0.01;
	    for(var i = 0; i < fbMaterial.fbos.length; i++){
	      fbMaterial.fbos[i].material.uniforms.time.value = time;
	      fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(mouseX, mouseY);
	      fbMaterial.material.uniforms.mouse.value = new THREE.Vector2(window.innerWidth, 0);
	    }
	    fbTexture.needsUpdate = true;
	        
	    fbMaterial.update();
	    fbMaterial.expand(1.002);
	    fbRenderer.render(fbScene, fbCamera);

	    fbMaterial.getNewFrame();
	    fbMaterial.swapBuffers();

	    capturer.capture( fbRenderer.domElement );

	    
}
function bezierX(x1, y1, x2, y2, hue){

    ctx.beginPath();

    ctx.moveTo(x1/*+Math.cos(time/50)*canvas.width*/, y1);
    ctx.lineTo(x2/*-Math.sin(time/50)*canvas.width*/, y2);

    ctx.lineWidth = lineWidth;
    
    // line color
    ctx.strokeStyle = hue;
    ctx.stroke();   
}
function bezierY(x1, y1, x2, y2, hue){
    ctx.beginPath();

    ctx.moveTo(x1, y1/*-Math.cos(time/40)*canvas.height*/);
    ctx.lineTo(x2, y2/*+Math.sin(time/40)*canvas.height*/);

    ctx.lineWidth = lineWidth;
    
    // line color
    ctx.strokeStyle = hue;
    ctx.stroke();  
}
var time = 0.5;
function many(){
    // time+=0.01;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var wy = canvas.width;
    var hy = 50;
    var wx = 50;
    var hx = canvas.height;
    var amp = 75;
    var distX = 3;
    var distY = 3;
    var alpha = 0.5;
    lineWidth = 0.5;
	  for(var j = -canvas.height; j < canvas.height*2; j+=distY){
    	var r = Math.floor(map(0.5+0.5*Math.cos(time*4/3), 1, 0, 255));
    	var g = Math.floor(map(j, hx, 0, 255));
    	var b = Math.floor(map(0.5+0.5*Math.sin(time/2), 1, 0, 255));
    	var color = "rgba("+r+","+g+", "+b+", "+alpha+")";
        bezierY(0,j, canvas.width, j,  color /*hslaColor(j*10, 100, 50, alpha)*/);  
    }
    for(var i = -canvas.width; i < canvas.width*2; i+=distX){
    	var r = Math.floor(map(i, wy, 0, 255));
    	var g = Math.floor(map(0.5+0.5*Math.sin(time), 1, 0, 255));
    	var b = Math.floor(map(0.5+0.5*Math.cos(time*3/2), 1, 0, 255));
    	var color = "rgba("+r+","+g+", "+b+", "+alpha+")";
        bezierX(i, 0, i, canvas.height, color /*hslaColor(i*10, 100, 50, alpha)*/);  

    }
}

function hslaColor(h,s,l,a)
  {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }
function screenshot(renderer) {
    if (event.keyCode == "32") {
        grabScreen(renderer);

        function grabScreen(renderer) {
            var blob = dataURItoBlob(renderer.domElement.toDataURL('image/png'));
            var file = window.URL.createObjectURL(blob);
            var img = new Image();
            img.src = file;
            img.onload = function(e) {
                window.open(this.src);

            }
        }
        function dataURItoBlob(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        }

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
    if(event.keyCode == "82"){
        capturer.start();
    }
    if(event.keyCode == "84"){
        capturer.stop();
        capturer.save( function( blob ) {
            window.location = blob;
        });
    }
}
function map(value,max,minrange,maxrange) {
    return ((max-value)/(max))*(maxrange-minrange)+minrange;
}