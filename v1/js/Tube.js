	function Tube(SCENE, CAMERA){
		this.scene = SCENE;
		// this.camera = splineCamera.camera;	
		this.time = 0.0;
		CustomSinCurve = THREE.Curve.create(
	        function ( scale ) { //custom curve constructor
	            this.scale = (scale === undefined) ? 1 : scale;
	        },
	        
	        function ( t ) { //getPoint: t is between 0-1
	            // var tx = t * 3 - 1.5,
	            var tx = Math.cos( t*30)*0.2,
	            // var tx = 0,
	                ty = Math.sin(t-(Math.PI*2)),
	                // ty = t,
	                tz = Math.sin( t*50)*0.2;
	                // tz = 0;
	            
	            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
	        }
	    );

	    this.init = function(){
	        this.path = new THREE.Curves.TrefoilKnot(200);
		    // this.path = new CustomSinCurve( 2000 );
			// this.shader = matcapShader;
		    // this.geometry = new THREE.TubeGeometry(this.path, 250, 50, 6, true);
		    // this.geometry = new THREE.TubeGeometry(this.path, 100, 100, 20, true);
		    this.geometry = new THREE.SphereGeometry(500, 50, 50);
		    // this.material = new THREE.ShaderMaterial({
		    //     uniforms: this.shader.uniforms,
		    //     vertexShader: this.shader.vertexShader,
		    //     fragmentShader: this.shader.fragmentShader,
		    //     blending: THREE.AdditiveBlending,
		    //     transparent: true,
		    //     side: 2,
		    //     depthWrite: false,
		    //     wireframe: true
		    // });
	     //    this.texture = THREE.ImageUtils.loadTexture("assets/textures/lightning.jpg");

		    // this.material.uniforms["tMatCap"].value = this.texture;
		    // this.material.uniforms["noiseScale"].value = 20.0;
		    // this.material.uniforms["noiseDetail"].value = 0.01;
		    // this.material.uniforms["glowColor"].value = new THREE.Color(0xffffff);
		    // this.material.uniforms["viewVector"].value = this.camera.position;
		    // this.material.uniforms["u_p"].value = 0.1;
		    // this.material.uniforms["c"].value = 10.0;
		    // this.material.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);

		    this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true}) );	
		    // this.mesh.rotation.x = Math.PI/2;
		    // this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 100;  
		    // this.scene.add(this.mesh);  	
	    }
	    this.update = function(){
	    	this.time+=0.01;
		    // this.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( this.camera.position, this.mesh.position );
		    // this.geometry.verticesNeedUpdate = true;
	     //    for(var i = 0; i < this.geometry.vertices.length; i++){
	     //        this.geometry.vertices[i].y += Math.sin((i-i/2)/(500) + this.time*5)*0.75; //sin wave effect
	     //        this.geometry.vertices[i].z += Math.sin((i-i/2)/(1000) + this.time*2.5)*0.75; //sin wave effect
	     //    }
	    }
	}