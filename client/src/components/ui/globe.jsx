import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

const Globe = () => {
  useEffect(() => {
    //scene
    const scene = new THREE.Scene();

    //creation of sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);  //first parameter is the radius of the sphere and the other two are the segments of the sphere

    const material = new THREE.MeshStandardMaterial({
      roughness: 0.5,
      transparent: true,
      opacity: 1, 
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //sizes
    const sizes = {
        // width: window.innerWidth,
        // height: window.innerHeight,
        width: window.innerWidth < 420 ? 230 : 300,
        height: window.innerWidth < 420 ? 230 : 300,
    }

    //lights
    const light = new THREE.PointLight(0xffffff ,200 ,100) //first parameter is the color of the light and second parameter is the intensity(brightness) of the light and third parameter is the distance the light can travel
    light.position.set(0 , 10, 10)
    scene.add(light)

    //camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1 , 100);
    camera.position.z = 10;
    scene.add(camera)

    //renderer
    const canvas = document.querySelector(".webgl");
    const renderer = new THREE.WebGLRenderer({ canvas , alpha: true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2)
    renderer.setClearAlpha(0);

    //controls to actually move it which mouse click on it
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 10

    //resize
    window.addEventListener('resize',()=>{
        //update sizes
        sizes.width = window.innerWidth < 420 ? 230 : 300
        sizes.height = window.innerWidth < 420 ? 230 : 300

        //update camera
        camera.updateProjectionMatrix();
        camera.aspect = sizes.width / sizes.height
        renderer.setSize(sizes.width, sizes.height)
    })

    //timeline magic
    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})

    const animate = (event) => {
      controls.update();  
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas className="webgl"></canvas>;
};

export default Globe;