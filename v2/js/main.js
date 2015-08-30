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
var range = 10.0;
var shards = [];
_init();
fbInit();
init();
animate();

function init() {
    
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200000 );
    camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -100000, 100000 );
	camera.position.z = 1000;
	// controls = new THREE.OrbitControls(camera);

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

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 2000 ), material );
	// scene.add( mesh);	


	var cubeGeometry = new THREE.SphereGeometry(1000,200,200);


	// loader  = new THREE.JSONLoader();

 //    loader.load( 'assets/json/pretty.json', function( geometry ) {
		var cubeMaterial = new THREE.MeshBasicMaterial({
			envMap:textureCube,
			refractionRatio:0.95,
				// shading: THREE.FlatShading
		});
	// 	cube = new THREE.Mesh(geometry, cubeMaterial);
	// 	cube.position.set(0,0,0);
	// 	cube.scale.set(100.0,100.0,100.0);
	// 	scene.add(cube);	
 //    });
    var params = {
        position: new THREE.Vector3(Math.random()*100,Math.random()*100,Math.random()*100),
        rotation: new THREE.Vector3(0,0,0),
        scale: 30.0
    }

    // loadModels("assets/obj/Glass_ashtray_OBJ.obj", cubeMaterial, params)
    for(var i = 0; i < 56; i++){
        createShard(i, cubeMaterial);
    }

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function createShard(INDEX, MAT) {
    loader = new THREE.BinaryLoader(true);
    loader.load("assets/json/shards/" + (INDEX + 1) + ".js", function(geometry) {
        var shard = new THREE.Mesh(geometry, MAT);
        shard.position.set((window.innerWidth / 8) * (INDEX % 8) - (window.innerWidth / 2.25), (window.innerHeight / 7) * (INDEX % 7) - (window.innerHeight / 2.4), -1000);
        var scale = 5000.0;
        shard.scale.set(scale, scale, scale);
        scene.add(shard);
        shards.push(shard);
    });
}
function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function onMouseDown(event){
    meshChange();
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
        for(var i = 0; i < fbMaterial.fbos.length; i++){
          fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(mouseX/range, mouseY/range);
          fbMaterial.material.uniforms.mouse.value = new THREE.Vector2(window.innerWidth, 0);
        }
}

function animate() {
	requestAnimationFrame( animate );

	render();
}
var captureCounter = 0;
function render() {
	// many();
	fbDraw();
	time+=0.01;
    for(var i = 0; i < shards.length; i++){
        shards[i].rotation.x += 0.005;
        shards[i].rotation.y += 0.005;
        shards[i].rotation.z += 0.005;
    }
    // colorGrid.update();
    captureCounter+=1;
    if(captureCounter%125==0){
        meshChange();
    }
    if(on){
        _mesh.material.opacity += (0.0 - _mesh.material.opacity)*0.05 
    } else {
        _mesh.material.opacity += (1.0 - _mesh.material.opacity)*0.05 

    }
    _texture.needsUpdate = true;
	textureCube.needsUpdate = true;
	// ctx.drawImage(video, 0,0);
	
    _renderer.render( _scene, _camera );
	renderer.render( scene, camera );
    capturer.capture( renderer.domElement );

}
function fbInit(){

    fbScene = new THREE.Scene();
    fbCamera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
    fbCamera.position.set(0,0,0);

    fbRenderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, antialias: true/*, alpha: true*/});
    fbRenderer.setClearColor(0xffffff, 1.0);
    fbRenderer.setSize(2500,2500);

    fbScene = new THREE.Scene();
    fbTexture = new THREE.Texture(_renderer.domElement);
    fbTexture.minFilter = fbTexture.magFilter = THREE.LinearFilter;
    // fbGeometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
    // fbMaterial = new THREE.MeshBasicMaterial({map:fbTexture});
    // fbMesh = new THREE.Mesh(fbGeometry, fbMaterial);
    // fbScene.add(fbMesh);
    var customShaders = new CustomShaders();
    var customShaders2 = new CustomShaders();

    fbShaders = [ 
        customShaders.flowShader, 
        customShaders.blurShader, 
        customShaders.diffShader, 
        customShaders2.warp2, 
        customShaders2.blurShader,
        customShaders.passShader
    ];

    fbMaterial = new FeedbackMaterial(fbRenderer, fbScene, fbCamera, fbTexture, fbShaders);
        
    fbMaterial.init();
    for(var i = 0; i < fbMaterial.fbos.length; i++){
      fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(((Math.random()*0.3) - 0.15)/range, ((Math.random()*0.3) - 0.15)/range);
      fbMaterial.material.uniforms.mouse.value = new THREE.Vector2(window.innerWidth, 0);
    }
}
function fbDraw(){
    fbTexture.needsUpdate = true;
    for(var i = 0; i < fbMaterial.fbos.length; i++){
      fbMaterial.fbos[i].material.uniforms.time.value = time;
      fbMaterial.material.uniforms.time.value = time*2.0;
    }
    fbMaterial.update();
    fbRenderer.render(fbScene, fbCamera);

    fbMaterial.getNewFrame();
    fbMaterial.swapBuffers();	    
}
function ColorGrid(WIDTH, HEIGHT){
    this.canvas, this.context;

    this.init = function(){
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;

        this.randomizeColors();
    }

    this.randomizeColors = function(){
        var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var copyData = imgData.data;
        for(var i = 0; i < this.canvas.width; i++){
            for(var j = 0; j < this.canvas.height; j++){
                var pixel = (j * this.canvas.width + i) * 4;
                copyData[pixel] = Math.random()*255;
                copyData[pixel+1] = Math.random()*255;
                copyData[pixel+2] = Math.random()*255;
                copyData[pixel+3] = Math.random()*255;
            }
        }
        this.context.putImageData(imgData, 0, 0);        
    }
    this.update = function(){
        this.randomizeColors();
    }
}