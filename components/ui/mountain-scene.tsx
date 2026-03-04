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

    // Triple particle density for fine-grained mountain definition
    const isMobile = window.innerWidth < 768
    const segments = isMobile ? 128 : 380
    const geometry = new THREE.PlaneGeometry(12, 8, segments, segments)

    // PARTICLE MATERIAL — Glowing data-point dots on Perlin noise terrain
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        lightIntensity: { value: 0 },
        pointLightPosition: { value: new THREE.Vector3(0, 0, 5) },
        colorValley: { value: new THREE.Color("#0A1628") },
        colorMid:    { value: new THREE.Color("#5B9EA6") },  // Teal for mid-heights
        colorPeak:   { value: new THREE.Color("#C9A84C") },  // Gold for peaks
        pixelRatio:  { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        varying float vDisplacement;
        varying vec3 vWorldPosition;
        varying float vDepthFade;

        // --- PERLIN NOISE ---
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

        float getDisplacement(vec3 pos) {
            float noiseFreq = 0.8;
            float noiseAmp = 0.6;
            float d = snoise(vec3(pos.x * noiseFreq, pos.y * noiseFreq - time * 0.2, 0.0)) * noiseAmp;
            d += snoise(vec3(pos.x * noiseFreq * 2.0, pos.y * noiseFreq * 2.0 - time * 0.2, 0.0)) * (noiseAmp * 0.5);
            return d;
        }

        void main() {
            float d0 = getDisplacement(position);
            vDisplacement = d0;

            vec3 newPosition = position + normal * d0;
            vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // 50% smaller dots
            float heightT = smoothstep(-0.6, 0.9, d0);
            gl_PointSize = mix(1.4, 2.5, heightT) * pixelRatio;

            // Gentle fade for very near particles only
            vDepthFade = smoothstep(0.3, 1.5, -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 colorValley;
        uniform vec3 colorMid;
        uniform vec3 colorPeak;
        uniform vec3 pointLightPosition;
        uniform float lightIntensity;
        varying float vDisplacement;
        varying vec3 vWorldPosition;
        varying float vDepthFade;

        void main() {
            // Circular dot with soft edge
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float dot = 1.0 - smoothstep(0.0, 0.5, dist);

            // Height-based color: navy → teal → gold
            float heightT = smoothstep(-0.6, 0.9, vDisplacement);
            vec3 color = mix(colorValley, colorMid, smoothstep(0.0, 0.5, heightT));
            color = mix(color, colorPeak, smoothstep(0.4, 1.0, heightT));

            // Brighten near mouse cursor
            float mouseDist = length(pointLightPosition - vWorldPosition);
            float mouseGlow = 1.0 / (1.0 + 0.2 * mouseDist * mouseDist);
            color = mix(color, vec3(1.0, 0.95, 0.8), mouseGlow * 0.35);

            // Compose: visible but not overpowering
            vec3 finalColor = color * lightIntensity;
            float alpha = dot * lightIntensity * vDepthFade * (0.35 + 0.55 * heightT);

            gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    points.rotation.x = -Math.PI / 2
    scene.add(points)

    // No scene point light needed — mouse proximity is handled in shader
    lightRef.current = null

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

    // On mobile/touch: skip dead zone, show particles at full brightness immediately
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      currentIntensity = 1
      material.uniforms.lightIntensity.value = 1
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
