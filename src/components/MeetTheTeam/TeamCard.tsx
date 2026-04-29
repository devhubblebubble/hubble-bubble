"use client";

import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import {
  displayFragmentShader,
  fluidFragmentShader,
  vertexShader,
} from "./shaders";
import styles from "./TeamCard.module.css";

export interface TeamCardProps {
  /** URL/path of the default ("top") portrait shown before the trail. */
  topImage: string;
  /** URL/path of the portrait revealed by the fluid trail. */
  bottomImage: string;
  /** Member name displayed in orange. */
  name: string;
  /** Member role/title. Accepts a string or any ReactNode (e.g. with <em>). */
  role?: ReactNode;
  /** Optional class applied to the outermost <article>. */
  className?: string;
  /** Aspect ratio of the card. Defaults to "4 / 5". */
  aspectRatio?: string;
}

/**
 * Interactive team member card. Hovering / dragging across the card reveals
 * the `bottomImage` along a fluid trail driven by a Three.js ping-pong
 * simulation, while the rest of the card keeps showing `topImage`.
 */
export default function TeamCard({
  topImage,
  bottomImage,
  name,
  role,
  className,
  aspectRatio = "4 / 5",
}: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cardEl = cardRef.current;
    if (!canvas || !cardEl) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      precision: "highp",
      alpha: true,
    });

    const getSize = () => {
      const rect = cardEl.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      };
    };

    let { width: viewWidth, height: viewHeight } = getSize();
    renderer.setSize(viewWidth, viewHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let isMoving = false;
    let lastMoveTime = 0;

    const simSize = 500;
    const pingPongTargets: THREE.WebGLRenderTarget[] = [
      new THREE.WebGLRenderTarget(simSize, simSize, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
      new THREE.WebGLRenderTarget(simSize, simSize, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
    ];
    let currentTarget = 0;

    const createPlaceholderTexture = (color: string) => {
      const c = document.createElement("canvas");
      c.width = 4;
      c.height = 4;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 4, 4);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const topTexture = createPlaceholderTexture("#080808");
    const bottomTexture = createPlaceholderTexture("#080808");
    const topTextureSize = new THREE.Vector2(1, 1);
    const bottomTextureSize = new THREE.Vector2(1, 1);

    const trailsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse },
        uPrevMouse: { value: prevMouse },
        uResolution: { value: new THREE.Vector2(simSize, simSize) },
        uDecay: { value: 0.97 },
        uIsMoving: { value: false },
      },
      vertexShader,
      fragmentShader: fluidFragmentShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluid: { value: null },
        uTopTexture: { value: topTexture },
        uBottomTexture: { value: bottomTexture },
        uResolution: { value: new THREE.Vector2(viewWidth, viewHeight) },
        uDpr: { value: window.devicePixelRatio },
        uTopTextureSize: { value: topTextureSize },
        uBottomTextureSize: { value: bottomTextureSize },
      },
      vertexShader,
      fragmentShader: displayFragmentShader,
    });

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
    scene.add(displayMesh);

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    renderer.setRenderTarget(pingPongTargets[0]);
    renderer.clear();
    renderer.setRenderTarget(pingPongTargets[1]);
    renderer.clear();
    renderer.setRenderTarget(null);

    const loadedTextures: THREE.Texture[] = [];

    const loadImage = (
      url: string,
      uniformKey: "uTopTexture" | "uBottomTexture",
      sizeUniformKey: "uTopTextureSize" | "uBottomTextureSize"
    ) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const maxSize = 4096;
        let w = img.width;
        let h = img.height;
        if (w > maxSize || h > maxSize) {
          if (w > h) {
            h = Math.floor(h * (maxSize / w));
            w = maxSize;
          } else {
            w = Math.floor(w * (maxSize / h));
            h = maxSize;
          }
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);

        const tex = new THREE.CanvasTexture(c);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;

        displayMaterial.uniforms[uniformKey].value = tex;
        displayMaterial.uniforms[sizeUniformKey].value.set(img.width, img.height);
        loadedTextures.push(tex);
      };
      img.onerror = (err) => {
        console.error(`TeamCard: failed to load ${url}`, err);
      };
      img.src = url;
    };

    loadImage(topImage, "uTopTexture", "uTopTextureSize");
    loadImage(bottomImage, "uBottomTexture", "uBottomTextureSize");

    const updateMouseFromPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        isMoving = false;
        return;
      }
      prevMouse.copy(mouse);
      mouse.x = (clientX - rect.left) / rect.width;
      mouse.y = 1 - (clientY - rect.top) / rect.height;
      isMoving = true;
      lastMoveTime = performance.now();
    };

    const onMouseMove = (event: MouseEvent) => {
      updateMouseFromPoint(event.clientX, event.clientY);
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const t = event.touches[0];
      const rect = canvas.getBoundingClientRect();
      if (
        t.clientX >= rect.left &&
        t.clientX <= rect.right &&
        t.clientY >= rect.top &&
        t.clientY <= rect.bottom
      ) {
        event.preventDefault();
        updateMouseFromPoint(t.clientX, t.clientY);
      }
    };

    const onResize = () => {
      const size = getSize();
      viewWidth = size.width;
      viewHeight = size.height;
      renderer.setSize(viewWidth, viewHeight, false);
      displayMaterial.uniforms.uResolution.value.set(viewWidth, viewHeight);
      displayMaterial.uniforms.uDpr.value = window.devicePixelRatio;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(cardEl);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (isMoving && performance.now() - lastMoveTime > 50) {
        isMoving = false;
      }

      const prevTarget = pingPongTargets[currentTarget];
      currentTarget = (currentTarget + 1) % 2;
      const currentRenderTarget = pingPongTargets[currentTarget];

      trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;
      trailsMaterial.uniforms.uMouse.value.copy(mouse);
      trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
      trailsMaterial.uniforms.uIsMoving.value = isMoving;

      renderer.setRenderTarget(currentRenderTarget);
      renderer.render(simScene, camera);

      displayMaterial.uniforms.uFluid.value = currentRenderTarget.texture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();

      pingPongTargets.forEach((rt) => rt.dispose());
      planeGeometry.dispose();
      trailsMaterial.dispose();
      displayMaterial.dispose();
      topTexture.dispose();
      bottomTexture.dispose();
      loadedTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [topImage, bottomImage]);

  return (
    <article
      ref={cardRef}
      className={[styles.card, className].filter(Boolean).join(" ")}
      style={{ aspectRatio }}
    >
      <div className={styles.canvasWrap}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {role && <p className={styles.role}>{role}</p>}
      </div>
    </article>
  );
}
