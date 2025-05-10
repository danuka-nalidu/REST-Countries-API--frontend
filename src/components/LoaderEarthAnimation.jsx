"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const LoaderEarthAnimation = () => {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const earthRef = useRef(null)
  const ringRef = useRef(null)
  const particlesRef = useRef(null)
  const controlsRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 300
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enablePan = false
    controlsRef.current = controls

    // Earth texture loader
    const textureLoader = new THREE.TextureLoader()

    // Earth textures
    const earthDayMap = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    )

    const earthBumpMap = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    )

    const earthSpecularMap = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
    )

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(100, 64, 64)

    // Earth material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthDayMap,
      bumpMap: earthBumpMap,
      bumpScale: 5,
      specularMap: earthSpecularMap,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    })

    // Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)
    earthRef.current = earth

    // Create rotating ring around Earth
    const ringGeometry = new THREE.RingGeometry(120, 125, 64)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)
    ringRef.current = ring

    // Create second ring with different rotation
    const ring2Geometry = new THREE.RingGeometry(130, 133, 64)
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    })
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material)
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.y = Math.PI / 6
    scene.add(ring2)

    // Create third ring with different rotation
    const ring3Geometry = new THREE.RingGeometry(140, 142, 64)
    const ring3Material = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    })
    const ring3 = new THREE.Mesh(ring3Geometry, ring3Material)
    ring3.rotation.x = -Math.PI / 4
    ring3.rotation.z = Math.PI / 5
    scene.add(ring3)

    // Create particles around Earth
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 1000
    const posArray = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create particles in a spherical distribution
      const radius = 150 + Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      particleSizes[i / 3] = Math.random() * 2 + 0.5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Create pulsing loader effect
    const loaderGeometry = new THREE.SphereGeometry(110, 32, 32)
    const loaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x3b82f6) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create wave pattern
          float wave = sin(vUv.y * 20.0 + time * 2.0) * 0.5 + 0.5;
          
          // Create latitude bands
          float latitude = abs(vUv.y - 0.5) * 2.0;
          float band = smoothstep(0.0, 0.1, mod(latitude * 10.0 + time * 0.2, 1.0));
          
          // Combine effects
          float alpha = wave * band * 0.3;
          
          // Add equator highlight
          float equator = smoothstep(0.1, 0.0, abs(vUv.y - 0.5));
          alpha += equator * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    })

    const loader = new THREE.Mesh(loaderGeometry, loaderMaterial)
    scene.add(loader)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 0.5, 1).normalize()
    scene.add(directionalLight)

    // Add subtle blue point light for atmosphere effect
    const blueLight = new THREE.PointLight(0x3b82f6, 5, 500)
    blueLight.position.set(200, 100, 50)
    scene.add(blueLight)

    // Add a soft orange light from the opposite side for contrast
    const orangeLight = new THREE.PointLight(0xff7700, 3, 500)
    orangeLight.position.set(-200, -100, -50)
    scene.add(orangeLight)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0005
      }

      if (ringRef.current) {
        ringRef.current.rotation.z += 0.001
        ring2.rotation.z -= 0.0015
        ring3.rotation.z += 0.002
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002

        // Update particle positions for a subtle flowing effect
        const positions = particlesRef.current.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(elapsedTime + i) * 0.02
          positions[i + 1] += Math.cos(elapsedTime + i) * 0.02
          positions[i + 2] += Math.sin(elapsedTime + i) * 0.02
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }

      // Update loader shader time
      loader.material.uniforms.time.value = elapsedTime

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

export default LoaderEarthAnimation
