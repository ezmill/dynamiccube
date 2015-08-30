
function SplineCamera(SCENE){
    
    this.scene = SCENE; 

    var binormal = new THREE.Vector3();
    var normal = new THREE.Vector3();
    var parent = new THREE.Object3D();
    parent.position.y = 100;
    this.scene.add( parent );

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000000 );
    this.cameraScale = 1.0;
    this.lookAhead = true;
    this.cameraTime = 0.0;  

    
    this.update = function(){
       	this.cameraTime+=0.25;
		var looptime = 1000;
		var t = ( this.cameraTime % looptime ) / looptime;

		var pos = tube.mesh.geometry.parameters.path.getPointAt( t );
		pos.multiplyScalar( this.cameraScale );

		// interpolation
		var segments = tube.mesh.geometry.tangents.length;
		var pickt = t * segments;
		var pick = Math.floor( pickt );
		var pickNext = ( pick + 1 ) % segments;

		binormal.subVectors( tube.mesh.geometry.binormals[ pickNext ], tube.mesh.geometry.binormals[ pick ] );
		binormal.multiplyScalar( pickt - pick ).add( tube.mesh.geometry.binormals[ pick ] );


		var dir = tube.mesh.geometry.parameters.path.getTangentAt( t );

		var offset = 1;

		normal.copy( binormal ).cross( dir );

		// We move on a offset on its binormal
		pos.add( normal.clone().multiplyScalar( offset ) );

		this.camera.position.copy( pos );


		// Camera Orientation 1 - default look at

		// Using arclength for stablization in look ahead.
		var lookAt = tube.mesh.geometry.parameters.path.getPointAt( ( t + 30 / tube.mesh.geometry.parameters.path.getLength() ) % 1 ).multiplyScalar( this.cameraScale );
		// this.camera.lookAt( lookAt );

		// Camera Orientation 2 - up orientation via normal
		// if (!this.lookAhead)
		lookAt.copy( pos ).add( dir );
		this.camera.matrix.lookAt(this.camera.position, lookAt, normal);
		this.camera.rotation.setFromRotationMatrix( this.camera.matrix, this.camera.rotation.order );
		// this.camera.rotation.set(Math.PI/2, Math.PI/2, Math.PI/2)
		// parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05;

    }
}