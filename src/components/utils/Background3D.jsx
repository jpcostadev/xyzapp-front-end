import React, { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const ThreeScene = () => {
  useEffect(() => {
    // Three JS Template
    //----------------------------------------------------------------- BASIC parameters
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // Remove essa linha, pois não é necessária.
      // renderer.shadowMap.needsUpdate = true;
    }

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );

    camera.position.set(0, 2, 14);

    var scene = new THREE.Scene();
    var city = new THREE.Object3D();
    var smoke = new THREE.Object3D();
    var town = new THREE.Object3D();

    var createCarPos = true;
    var uSpeed = 0.001;

    //----------------------------------------------------------------- FOG background

    var setcolor = 0xf02050;

    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);

    //----------------------------------------------------------------- RANDOM Function
    function mathRandom(num = 8) {
      var numValue = -Math.random() * num + Math.random() * num;
      return numValue;
    }

    //----------------------------------------------------------------- CHANGE building colors
    var setColor = 0x000000;
    var setTintNum = true; // Inicialize a variável setTintNum aqui

    function setTintColor() {
      if (setTintNum) {
        setTintNum = false;
        setColor = 0x000000;
      } else {
        setTintNum = true;
        setColor = 0x000000;
      }
      return setColor;
    }
    //----------------------------------------------------------------- CREATE City

    function init() {
      var segments = 2;
      for (var i = 1; i < 100; i++) {
        var geometry = new THREE.BoxGeometry(
          1,
          0,
          0,
          segments,
          segments,
          segments,
        );
        var material = new THREE.MeshStandardMaterial({
          color: setTintColor(),
          wireframe: false,
          shading: THREE.SmoothShading,
          side: THREE.DoubleSide,
        });
        var wmaterial = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
          side: THREE.DoubleSide,
        });

        var cube = new THREE.Mesh(geometry, material);
        var wire = new THREE.Mesh(geometry, wmaterial);
        var floor = new THREE.Mesh(geometry, material);
        var wfloor = new THREE.Mesh(geometry, wmaterial);

        cube.add(wfloor);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

        floor.scale.y = 0.05;
        cube.scale.y = 0.1 + Math.abs(mathRandom(8));

        var cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());

        floor.position.set(cube.position.x, 0, cube.position.z);

        town.add(floor);
        town.add(cube);
      }

      var gmaterial = new THREE.MeshToonMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
      });
      var gparticular = new THREE.CircleGeometry(0.01, 3);
      var aparticular = 5;

      for (var h = 1; h < 300; h++) {
        var particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(
          mathRandom(aparticular),
          mathRandom(aparticular),
          mathRandom(aparticular),
        );
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      var pmaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        roughness: 10,
        metalness: 0.6,
        opacity: 0.9,
        transparent: true,
      });
      var pgeometry = new THREE.PlaneGeometry(60, 60);
      var pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = (-90 * Math.PI) / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;

      city.add(pelement);
    }

    //----------------------------------------------------------------- MOUSE function
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(),
      INTERSECTED;

    function onMouseMove(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove, false);

    //----------------------------------------------------------------- Lights
    var ambientLight = new THREE.AmbientLight(0xffffff, 4);
    var lightFront = new THREE.SpotLight(0xffffff, 20, 10);
    var lightBack = new THREE.PointLight(0xffffff, 0.5);

    var spotLightHelper = new THREE.SpotLightHelper(lightFront);

    lightFront.rotation.x = (45 * Math.PI) / 180;
    lightFront.rotation.z = (-45 * Math.PI) / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    smoke.position.y = 2;

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);

    //----------------------------------------------------------------- GRID Helper
    var gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);
    city.add(gridHelper);

    //----------------------------------------------------------------- CAR world
    var generateCar = function () {};
    //----------------------------------------------------------------- LINES world

    var createCars = function (cScale = 2, cPos = 20, cColor = 0xffff00) {
      var cMat = new THREE.MeshToonMaterial({
        color: cColor,
        side: THREE.DoubleSide,
      });
      var cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      var cElem = new THREE.Mesh(cGeo, cMat);
      var cAmp = 3;

      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(cAmp);

        gsap.to(cElem.position, {
          x: cPos,
          repeat: -1,
          yoyo: true,
          duration: 3,
          delay: mathRandom(3),
        });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(cAmp);
        cElem.position.z = -cPos;
        cElem.rotation.y = (90 * Math.PI) / 180;

        gsap.to(cElem.position, {
          z: cPos,
          repeat: -1,
          yoyo: true,
          duration: 5,
          delay: mathRandom(3),
          ease: "power1.inOut",
        });
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };

    var generateLines = function () {
      for (var i = 0; i < 60; i++) {
        createCars(0.1, 20);
      }
    };

    //----------------------------------------------------------------- CAMERA position

    var cameraSet = function () {
      createCars(0.1, 20, 0xffffff);
    };

    //----------------------------------------------------------------- ANIMATE

    var animate = function () {
      var time = Date.now() * 0.00005;
      requestAnimationFrame(animate);

      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;
      var cityRotation = Math.sin(Date.now() / 5000) * 13;

      for (let i = 0, l = town.children.length; i < l; i++) {
        var object = town.children[i];
      }

      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;

      camera.lookAt(city.position);
      renderer.render(scene, camera);
    };

    //----------------------------------------------------------------- START functions
    generateLines();
    init();
    animate();
  }, []);

  return (
    <div id="three-container">
      {/* A cena Three.js será renderizada dentro deste div */}
      <style></style>
      <div className="container-fluid fixed-top header disable-selection">
        <div className="row">
          <div className="col">
            <div className="col-md-6">
              <div className="row">
                <div className="col">
                  <h1>
                    <strong>Lab City 3D</strong>
                  </h1>
                  <p className="small">– Back to the red –</p>
                  {/* Se desejar, você pode adicionar o botão aqui */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Se desejar, você também pode adicionar o conteúdo do rodapé aqui */}
      {/* <div className="container-fluid fixed-bottom footer">
        <div className="row">
          <div className="col">
            <h4>Experiment N.3</h4>
            <small>
              <a
                href="https://dribbble.com/victorvergara"
                target="_blank"
                rel="noopener noreferrer"
              >
                dribbble.com/victorvergara
              </a>
            </small>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ThreeScene;
