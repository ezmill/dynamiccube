function Synesthesia(SCENE, CAMERA){
	this.scene = SCENE;
	this.camera = CAMERA;
	this.letters = [];
	this.init = function(){
		tube = new Tube(this.scene, this.camera);
		tube.init();
	}
	this.addLetters = function(GEOMETRY, COUNTSTART, COUNTEND, COLOR){
	    	// loader  = new THREE.JSONLoader();
	    // loader.load( 'assets/json/A.json', function( geometry ) {
	    for(var i = 0; i < tube.mesh.geometry.vertices.length; i++){
	    	var letter = new Letter(/*GEOMETRY, COLOR*/);
	        // letter.mesh.position.x = tube.mesh.geometry.vertices[i].x;
	        // letter.mesh.position.y = tube.mesh.geometry.vertices[i].y;
            letter.mesh.position.copy(tube.mesh.geometry.vertices[i]);
            // console.log(tube.mesh.geometry);
	        // letter.mesh.position.z = tube.mesh.geometry.vertices[i].z;
	        this.letters.push(letter);
	    }
    // });
	}
	this.update = function(){
		// tube.update();
		for(var i = 0; i < this.letters.length; i++){
			this.letters[i].update();
		}
	}
}