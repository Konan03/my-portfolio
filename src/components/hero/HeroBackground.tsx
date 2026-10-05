"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const hero = container?.parentElement;
    if (!container || !hero) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let disposed = false;
    let visible = false;
    let generation = 0;
    let release: (() => void) | undefined;

    const sync = async () => {
      const ticket = ++generation;
      release?.();
      release = undefined;
      if (disposed || !desktop.matches || motion.matches || !visible || document.hidden) return;

      // Keep the WebGL library out of the initial content path and mobile experience.
      const modules = await Promise.all([
        import("three"),
        import("three/addons/lines/LineSegments2.js"),
        import("three/addons/lines/LineSegmentsGeometry.js"),
        import("three/addons/lines/LineMaterial.js"),
      ]).catch(() => null);
      if (!modules || disposed || ticket !== generation) return;
      const [THREE, { LineSegments2 }, { LineSegmentsGeometry }, { LineMaterial }] = modules;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        // Decoration is optional on devices without WebGL2.
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
      camera.position.z = 9;
      const network = new THREE.Group();
      scene.add(network);

      // A deterministic, branching spatial network: no random particle field.
      const positions: number[] = [];
      for (let i = 0; i < 36; i++) {
        const branch = i % 4;
        const step = Math.floor(i / 4);
        positions.push(
          -1.4 + step * 0.39 + Math.sin(i * 1.7) * 0.28,
          (branch - 1.5) * 0.75 + Math.sin(step * 0.8 + branch) * 0.4,
          Math.sin(i * 1.13) * 0.85,
        );
      }
      const edges: number[] = [];
      for (let i = 0; i < 36; i++) {
        if (i + 4 < 36) edges.push(i, i + 4);
        if (i % 4 < 3 && i % 3 === 0) edges.push(i, i + 1);
        if (i + 5 < 36 && i % 5 === 0) edges.push(i, i + 5);
      }
      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      const nodeStrength = new THREE.Float32BufferAttribute(new Float32Array(36), 1);
      nodeStrength.setUsage(THREE.DynamicDrawUsage);
      pointsGeometry.setAttribute("strength", nodeStrength);
      const pointsMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          color: { value: new THREE.Color("#3B82F6") },
          pixelRatio: { value: renderer.getPixelRatio() },
          pointSize: { value: 5 },
        },
        vertexShader: `
          attribute float strength;
          uniform float pixelRatio;
          uniform float pointSize;
          varying float intensity;
          void main() {
            intensity = strength;
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = pointSize * pixelRatio * (1.0 + max(0.0, strength - 0.65) * 0.7) * (9.0 / -viewPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float intensity;
          void main() {
            float radius = length(gl_PointCoord - vec2(0.5));
            float alpha = (1.0 - smoothstep(0.18, 0.5, radius)) * intensity;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(color, alpha);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
      });
      network.add(new THREE.Points(pointsGeometry, pointsMaterial));
      const linesGeometry = new LineSegmentsGeometry();
      linesGeometry.setPositions(edges.flatMap((index) => positions.slice(index * 3, index * 3 + 3)));
      const linesMaterial = new LineMaterial({ color: "#3B82F6", linewidth: 1.3, transparent: true, opacity: 0.34, depthWrite: false });
      network.add(new LineSegments2(linesGeometry, linesMaterial));

      // Five staggered signals reuse one geometry, including their short fading trails.
      const signalCount = 5;
      const trailCount = 13;
      const travelDurations = [0.95, 1.15, 1.35, 1.05, 1.25];
      const restDurations = [0.65, 0.8, 0.7, 0.9, 0.6];
      const pulseGeometry = new THREE.BufferGeometry();
      const pulsePosition = new THREE.Float32BufferAttribute(new Float32Array(signalCount * trailCount * 3), 3);
      const pulseStrength = new THREE.Float32BufferAttribute(new Float32Array(signalCount * trailCount), 1);
      pulsePosition.setUsage(THREE.DynamicDrawUsage);
      pulseStrength.setUsage(THREE.DynamicDrawUsage);
      pulseGeometry.setAttribute("position", pulsePosition);
      pulseGeometry.setAttribute("strength", pulseStrength);
      const pulseMaterial = pointsMaterial.clone();
      pulseMaterial.uniforms.pointSize.value = 6;
      pulseMaterial.uniforms.color.value.set("#60A5FA");
      const pulses = new THREE.Points(pulseGeometry, pulseMaterial);
      // Moving positions make a cached bounding sphere inappropriate.
      pulses.frustumCulled = false;
      network.add(pulses);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const halfWidth = 9 * Math.tan(THREE.MathUtils.degToRad(18)) * camera.aspect;
        const desktopProgress = THREE.MathUtils.clamp((width - 1024) / 416, 0, 1);
        network.scale.setScalar(THREE.MathUtils.lerp(1.05, 1.36, desktopProgress));
        network.position.set(halfWidth * THREE.MathUtils.lerp(0.36, 0.32, desktopProgress), 0.15, 0);
        linesMaterial.resolution.set(width, height);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      let targetX = 0;
      let targetY = 0;
      const maxHorizontalRotation = THREE.MathUtils.degToRad(10);
      const maxVerticalRotation = THREE.MathUtils.degToRad(6);
      const onPointer = (event: PointerEvent) => {
        if (!mouse.matches || event.pointerType !== "mouse") return;
        const bounds = hero.getBoundingClientRect();
        targetY = THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1) * maxHorizontalRotation;
        targetX = THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1) * maxVerticalRotation;
      };
      const resetPointer = () => { targetX = 0; targetY = 0; };
      hero.addEventListener("pointermove", onPointer);
      hero.addEventListener("pointerleave", resetPointer);
      mouse.addEventListener("change", resetPointer);
      let frame = 0;
      let previous = 0;
      let elapsed = 0;
      let rotationX = 0;
      let rotationY = 0;
      const draw = (now: number) => {
        frame = requestAnimationFrame(draw);
        if (now - previous < 1000 / 30) return;
        const delta = Math.min((now - previous) / 1000, 0.1);
        previous = now;
        elapsed += delta;
        for (let node = 0; node < 36; node++) {
          nodeStrength.setX(node, 0.52 + (node % 4) * 0.07);
        }
        for (let signal = 0; signal < signalCount; signal++) {
          const duration = travelDurations[signal];
          const period = duration + restDurations[signal];
          const cycleTime = elapsed + signal * 0.37;
          const cycle = Math.floor(cycleTime / period);
          const progress = (cycleTime % period) / duration;
          const edge = ((signal * 9 + cycle * 7) % (edges.length / 2)) * 2;
          const start = edges[edge];
          const end = edges[edge + 1];
          for (let trail = 0; trail < trailCount; trail++) {
            const point = signal * trailCount + trail;
            const travel = progress - trail * 0.0175;
            const t = THREE.MathUtils.clamp(travel, 0, 1);
            for (let axis = 0; axis < 3; axis++) {
              pulsePosition.array[point * 3 + axis] = THREE.MathUtils.lerp(positions[start * 3 + axis], positions[end * 3 + axis], t);
            }
            const fade = Math.min(t * 12, (1 - t) * 12, 1);
            pulseStrength.setX(point, fade * Math.pow(1 - trail / trailCount, 1.2));
          }
          // A gentle, brief increase in the destination node after each arrival.
          const arrival = (progress - 1) * duration;
          if (arrival >= 0 && arrival < 0.32) {
            const feedback = Math.sin((arrival / 0.32) * Math.PI) * 0.42;
            nodeStrength.setX(end, Math.min(1.1, nodeStrength.getX(end) + feedback));
          }
        }
        nodeStrength.needsUpdate = true;
        pulsePosition.needsUpdate = true;
        pulseStrength.needsUpdate = true;
        const blend = 1 - Math.exp(-delta * 3);
        rotationX += (targetX - rotationX) * blend;
        rotationY += (targetY - rotationY) * blend;
        network.rotation.set(
          THREE.MathUtils.clamp(Math.sin(elapsed * 0.09) * 0.035 + rotationX, -maxVerticalRotation, maxVerticalRotation),
          THREE.MathUtils.clamp(Math.sin(elapsed * 0.07) * 0.065 + rotationY, -maxHorizontalRotation, maxHorizontalRotation),
          Math.sin(elapsed * 0.05) * 0.015,
        );
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(draw);
      release = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        hero.removeEventListener("pointermove", onPointer);
        hero.removeEventListener("pointerleave", resetPointer);
        mouse.removeEventListener("change", resetPointer);
        pointsGeometry.dispose();
        pulseGeometry.dispose();
        linesGeometry.dispose();
        pointsMaterial.dispose();
        pulseMaterial.dispose();
        linesMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      void sync();
    }, { threshold: 0.15 });
    observer.observe(hero);
    desktop.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      generation++;
      observer.disconnect();
      desktop.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      release?.();
    };
  }, []);

  return <div ref={containerRef} className="hero-background" aria-hidden="true" />;
}
