function Letter(GEOMETRY, COLOR){

    // this.geometry = GEOMETRY;
    var index = Math.floor(Math.random()*geometries.length);
    this.geometry = geometries[index];
    this.color = colors[this.geometry.name];
    this.offSpeeds; 

    this.material = new THREE.MeshBasicMaterial({
        envMap: textureCube,
        // side: 2,
        refractionRatio: 0.98,
        shading: THREE.FlatShading,
        // color:this.color,
    });
    // this.texture = matCap;
    // this.shader = new LetterShader;
    // this.material = new THREE.ShaderMaterial({
    //     uniforms: this.shader.uniforms,
    //     vertexShader: this.shader.vertexShader,
    //     fragmentShader: this.shader.fragmentShader,
    //     shading: THREE.FlatShading
    // })
    // this.material.uniforms["tMatCap"].value = this.texture;
    
    // this.material = new THREE.MeshBasicMaterial({color:0xff0000});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1), this.material);
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 150;
    this.xRot = Math.random()*Math.PI*2;
    this.yRot = Math.random()*Math.PI*2;
    this.zRot = Math.random()*Math.PI*2;
    this.mesh.rotation.set(this.xRot, this.yRot, this.zRot);
    scene.add(this.mesh);

    this.update = function(){
        // this.material.uniforms["tMatCap"].value.needsUpdate = true;
        this.xRot += 0.01;
        this.yRot += 0.01;
        this.zRot += 0.01;
        this.mesh.rotation.set(this.xRot, this.yRot, this.zRot);
    }
}