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

    const cleanup = initScene(currentMount, lightRef, isVisibleRef)
    return cleanup
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />
}

/** All Three.js setup extracted so it can run deferred */
function initScene(
  currentMount: HTMLDivElement,
  lightRef: React.MutableRefObject<THREE.PointLight | null>,
  isVisibleRef: React.MutableRefObject<boolean>,
) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentMount.appendChild(renderer.domElement)

    // Lower-res geometry on mobile
    const isMobile = window.innerWidth < 768
    const segments = isMobile ? 64 : 128
    const geometry = new THREE.PlaneGeometry(12, 8, segments, segments)

    // SHADER MATERIAL — Warm-cool dual-lit terrain: golden hour ridges, teal ambient, navy valleys
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      wireframe: false,
      uniforms: {
        time: { value: 0 },
        lightIntensity: { value: 0 },  // 0 = pitch black, 1 = fully lit (driven by mouse Y)
        pointLightPosition: { value: new THREE.Vector3(0, 0, 5) },
        colorValley: { value: new THREE.Color("#0A1628") },  // Deep navy — blends into background
        colorMid:    { value: new THREE.Color("#1A2A40") },  // Mid slate-blue
        colorPeak:   { value: new THREE.Color("#2E3E55") },  // Lighter blue-grey for peaks
        goldLight:   { value: new THREE.Color("#C9A84C") },  // Warm gold for directional highlights
        tealLight:   { value: new THREE.Color("#5B9EA6") },  // Muted teal for ambient fill
        goldEdge:    { value: new THREE.Color("#C9A84C") },  // Gold fresnel edge glow
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;
        varying vec3 vWorldPosition;

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

        // Compute displacement at arbitrary point (for finite-difference normals)
        float getDisplacement(vec3 pos) {
            float noiseFreq = 0.8;
            float noiseAmp = 0.6;
            float d = snoise(vec3(pos.x * noiseFreq, pos.y * noiseFreq - time * 0.2, 0.0)) * noiseAmp;
            d += snoise(vec3(pos.x * noiseFreq * 2.0, pos.y * noiseFreq * 2.0 - time * 0.2, 0.0)) * (noiseAmp * 0.5);
            return d;
        }

        void main() {
            vPosition = position;

            // Compute displacement at this vertex and two neighbors (finite differences)
            float eps = 0.05;
            float d0  = getDisplacement(position);
            float dPx = getDisplacement(position + vec3(eps, 0.0, 0.0));
            float dPy = getDisplacement(position + vec3(0.0, eps, 0.0));

            // Reconstruct normal from cross product of tangent vectors
            vec3 tangentX = vec3(eps, 0.0, dPx - d0);
            vec3 tangentY = vec3(0.0, eps, dPy - d0);
            vec3 computedNormal = normalize(cross(tangentX, tangentY));

            // Transform normal to world space
            vNormal = normalize((modelMatrix * vec4(computedNormal, 0.0)).xyz);
            vDisplacement = d0;

            vec3 newPosition = position + normal * d0;
            vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorValley;
        uniform vec3 colorMid;
        uniform vec3 colorPeak;
        uniform vec3 goldLight;
        uniform vec3 tealLight;
        uniform vec3 goldEdge;
        uniform vec3 pointLightPosition;
        uniform float time;
        uniform float lightIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vDisplacement;

        void main() {
            vec3 normal = normalize(vNormal);

            // ── Height-based terrain color ──
            float heightT = smoothstep(-0.6, 0.9, vDisplacement);
            vec3 terrainColor = mix(colorValley, colorMid, smoothstep(0.0, 0.5, heightT));
            terrainColor = mix(terrainColor, colorPeak, smoothstep(0.4, 1.0, heightT));

            // ── Gold directional light (upper-left, like golden hour sun) ──
            float lightDrift = sin(time * 0.25) * 0.3;
            vec3 goldDir = normalize(vec3(-0.6 + lightDrift, 0.8, 0.5));
            float goldDiffuse = max(dot(normal, goldDir), 0.0);
            float heightBoost = 0.3 + 0.7 * smoothstep(0.1, 0.8, heightT);
            vec3 goldContribution = goldLight * goldDiffuse * 0.6 * heightBoost;

            // ── Teal ambient fill (opposite side, like cool sky) ──
            vec3 tealDir = normalize(vec3(0.5, -0.3, 0.6));
            float tealDiffuse = max(dot(normal, tealDir), 0.0);
            vec3 tealContribution = tealLight * tealDiffuse * 0.25;

            // ── Mouse-following point light (warm gold-white) ──
            vec3 pointDir = normalize(pointLightPosition - vWorldPosition);
            float pointDist = length(pointLightPosition - vWorldPosition);
            float pointAtten = 1.0 / (1.0 + 0.1 * pointDist * pointDist);
            float pointDiffuse = max(dot(normal, pointDir), 0.0);
            vec3 pointContribution = vec3(1.0, 0.9, 0.7) * pointDiffuse * pointAtten * 0.5;

            // ── Ambient base ──
            vec3 ambient = terrainColor * 0.2;

            // ── Fresnel edge glow — warm gold on silhouette edges ──
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
            fresnel = pow(fresnel, 2.5);
            vec3 fresnelGlow = goldEdge * fresnel * 0.2;

            // ── Compose lit color ──
            vec3 litColor = ambient
                + goldContribution
                + tealContribution
                + pointContribution
                + fresnelGlow;

            // Valley fade: lowest areas blend toward background
            float valleyFade = 1.0 - smoothstep(0.0, 0.25, heightT);
            litColor = mix(litColor, colorValley, valleyFade * 0.7);

            // ── Mouse-Y dead zone: pitch black until cursor drops below hero text ──
            // lightIntensity = 0 (dark) to 1 (fully lit), driven by JS
            vec3 finalColor = litColor * lightIntensity;

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
    let currentIntensity = 0   // mirrors the uniform — checked CPU-side
    let lastRenderTime = 0
    const FRAME_INTERVAL = 1000 / 30  // cap at 30 fps (terrain is slow)

    const animate = (t: number) => {
      frameId = requestAnimationFrame(animate)
      // Skip when off-screen
      if (!isVisibleRef.current) return
      // Skip when pitch black — no GPU work needed
      if (currentIntensity <= 0) return
      // Throttle to ~30 fps
      if (t - lastRenderTime < FRAME_INTERVAL) return
      lastRenderTime = t

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

      // Dead zone: pitch black above "See More" text (~55% of viewport).
      // Starts at 10% once past threshold, scales 2x faster to reach 100%.
      const screenY = e.clientY / window.innerHeight
      const threshold = 0.55
      if (screenY <= threshold) {
        currentIntensity = 0
        material.uniforms.lightIntensity.value = 0
      } else {
        const ramp = Math.min(1, ((screenY - threshold) / (1 - threshold)) * 2)
        currentIntensity = 0.1 + 0.9 * ramp
        material.uniforms.lightIntensity.value = currentIntensity
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Return cleanup function
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
}

export default GenerativeMountainScene
