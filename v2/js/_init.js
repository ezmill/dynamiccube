var _scene, _renderer, _camera, _mesh, _texture, _material, _geometry;
function _init() {

    _scene = new THREE.Scene();

    _camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000000 );
    _camera.position.set( 0, 0, 2452.1003559896444 );
    _scene.add( _camera );
    controls = new THREE.OrbitControls(_camera);
    colorGrid = new ColorGrid(window.innerWidth/40, window.innerHeight/40);
    colorGrid.init();

    _texture = new THREE.Texture( colorGrid.canvas );
    // _texture = THREE.ImageUtils.loadTexture("assets/textures/asdfas.jpg");
    _geometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
    _material = new THREE.MeshBasicMaterial({map: _texture, transparent: true, opacity:0.0});
    _mesh = new THREE.Mesh(_geometry, _material);
    _mesh.position.z = 500;
    _scene.add(_mesh);

    var width = 640*2, height = 480*2;
    var nearClipping = 10, farClipping = 4000;
    _geometry = new THREE.Geometry();

    for ( var i = 0, l = width * height; i < l; i ++ ) {

        var position = new THREE.Vector3();
        position.x = ( i % width );
        position.y = Math.floor( i / width );

        _geometry.vertices.push( position );

    }

    _material = new THREE.ShaderMaterial( {
        uniforms: {
            "map": { type: "t", value: 0, texture: _texture },
            "width": { type: "f", value: width },
            "height": { type: "f", value: height },
            "nearClipping": { type: "f", value: nearClipping },
            "farClipping": { type: "f", value: farClipping }
        },
        vertexShader: document.getElementById( 'vs' ).textContent,
        fragmentShader: document.getElementById( 'fs' ).textContent,
        transparent: true,
        opacity: 1.0
    } );

    _mesh = new THREE.PointCloud( _geometry, _material );
    _mesh.position.x = 0;
    _mesh.position.y = 0;
    _mesh.rotation.z = Math.PI;
    _scene.add( _mesh );

    _renderer = new THREE.WebGLRenderer();
    _renderer.setSize( 1440*3, 742*3 );
    _renderer.setClearColor(0xffffff,1.0);
}
var counter = 0;
var on = false;
function meshChange(){
    if(counter%2==0){
        // _mesh.visible = false;
        on = true;
    } else {
        // _mesh.visible = true;
        on = false;
    }
    counter++;

    colorGrid.update();
    
    for(var i = 0; i < fbMaterial.fbos.length; i++){
      fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(((Math.random()*0.3) - 0.15)/range, ((Math.random()*0.3) - 0.15)/range);
      fbMaterial.material.uniforms.mouse.value = new THREE.Vector2(window.innerWidth, 0);
    }
}