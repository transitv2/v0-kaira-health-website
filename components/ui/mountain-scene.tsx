"use client"

import React, { useRef, useEffect } from "react"
import * as THREE from "three"

/**
 * GenerativeMountainScene
 * Renders a solid, undulating mountain landscape with Perlin noise.
 * Adapted for KAIRA Health brand — gold/amber tones on dark background.
 */
export function GenerativeMountainScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    // Pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(currentMount)

    // SCENE SETUP
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.5, 3)
    camera.rotation.x = -0.3

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    currentMount.appendChild(renderer.domElement)

    // Lower-res geometry on mobile
    const isMobile = window.innerWidth < 768
    const segments = isMobile ? 64 : 128
    const geometry = new THREE.PlaneGeometry(12, 8, segments, segments)

    // SHADER MATERIAL — Multi-tone blue with icy edge highlights
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      wireframe: false,
      uniforms: {
        time: { value: 0 },
        pointLightPosition: { value: new THREE.Vector3(0, 0, 5) },
        colorDeep: { value: new THREE.Color("#1E3A5F") },   // Deep navy base
        colorMid: { value: new THREE.Color("#3B82F6") },    // Medical blue mid
        colorPeak: { value: new THREE.Color("#93C5FD") },   // Light blue peaks
        colorEdge: { value: new THREE.Color("#DBEAFE") },   // Icy white edge glow
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        // --- PERLIN NOISE FUNCTIONS ---
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }
        void main() {
            vNormal = normal;
            vPosition = position;

            float noiseFreq = 0.8;
            float noiseAmp = 0.6;

            // Layer 1: Base shape
            float displacement = snoise(vec3(position.x * noiseFreq, position.y * noiseFreq - time * 0.2, 0.0)) * noiseAmp;

            // Layer 2: Detail
            displacement += snoise(vec3(position.x * noiseFreq * 2.0, position.y * noiseFreq * 2.0 - time * 0.2, 0.0)) * (noiseAmp * 0.5);
            vDisplacement = displacement;
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorDeep;
        uniform vec3 colorMid;
        uniform vec3 colorPeak;
        uniform vec3 colorEdge;
        uniform vec3 pointLightPosition;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(pointLightPosition - vPosition);

            float diffuse = max(dot(normal, lightDir), 0.0);

            // Height-based color: deep navy valleys → blue mid → light peaks
            float heightT = smoothstep(-0.3, 0.8, vDisplacement);
            vec3 baseColor = mix(colorDeep, colorMid, smoothstep(0.0, 0.5, heightT));
            baseColor = mix(baseColor, colorPeak, smoothstep(0.5, 1.0, heightT));

            // Fresnel edge glow — icy white highlights on silhouette edges
            float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
            fresnel = pow(fresnel, 2.5);

            vec3 finalColor = baseColor * (diffuse * 0.8 + 0.2) + colorEdge * fresnel * 0.4;

            gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 5)
    lightRef.current = pointLight
    scene.add(pointLight)

    let frameId: number

    const animate = (t: number) => {
      frameId = requestAnimationFrame(animate)
      // Skip rendering when off-screen
      if (!isVisibleRef.current) return
      material.uniforms.time.value = t * 0.0003
      renderer.render(scene, camera)
    }
    animate(0)

    const handleResize = () => {
      if (!currentMount) return
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      const pos = new THREE.Vector3(x * 5, 2, 2 - y * 2)

      if (lightRef.current) {
        lightRef.current.position.copy(pos)
      }
      if (material.uniforms.pointLightPosition) {
        material.uniforms.pointLightPosition.value = pos
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />
}

export default GenerativeMountainScene
