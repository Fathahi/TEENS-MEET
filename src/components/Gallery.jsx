import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';

// Use glob only for file discovery; actual src constructed from BASE_URL
const imageModules = import.meta.glob('/public/gallery/*.{jpg,jpeg}', { eager: false, query: '?url' });

// All images in pool — lazy loading on each tile prevents browser overload
const DEFAULT_IMAGES = Object.keys(imageModules)
  .filter(path => !path.includes('hero-bg'))
  .map(path => ({
    src: `${import.meta.env.BASE_URL}gallery/${path.split('/').pop()}`,
    alt: 'Teens Meet 2026'
  }));


const DEFAULTS = { 
  maxVerticalRotationDeg: 0, 
  dragSensitivity: 20, 
  segments: 34, 
  minRadius: 600, 
  dragDampening: 2 
};

// ─── Main Gallery ─────────────────────────────────────────────────────────────
const Gallery = () => {
  const rootRef = useRef(null);
  const sphereElRef = useRef(null);
  const mainRef = useRef(null);
  const headerRef = useReveal();
  
  // Refs for Viewing/Enlarge Logic
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const frameRef = useRef(null);
  
  const viewingState = useRef({
    opening: false,
    focusedEl: null,
    originalTilePos: null
  });

  const computeItemBaseRot = (offsetX, offsetY, sizeX, sizeY) => {
    const unit = 360 / DEFAULTS.segments / 2;
    return { rotateX: unit * (offsetY - (sizeY - 1) / 2), rotateY: unit * (offsetX + (sizeX - 1) / 2) };
  };

  const closeEnlarged = useCallback(() => {
    if (!viewingState.current.focusedEl) return;
    const parent = viewingState.current.focusedEl.parentElement;
    const overlay = viewerRef.current.querySelector('.enlarge');
    if (!overlay) return;

    const refDiv = parent.querySelector('.item__image--reference');
    const currentRect = overlay.getBoundingClientRect();
    const rootRect = rootRef.current.getBoundingClientRect();

    const overlayRelative = { left: currentRect.left - rootRect.left, top: currentRect.top - rootRect.top, width: currentRect.width, height: currentRect.height };
    const animEl = document.createElement('div');
    animEl.style.cssText = `position:absolute; left:${overlayRelative.left}px; top:${overlayRelative.top}px; width:${overlayRelative.width}px; height:${overlayRelative.height}px; z-index:9999; border-radius:var(--enlarge-radius, 30px); overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35); transition:all 300ms ease-out; pointer-events:none;`;

    const img = overlay.querySelector('img').cloneNode();
    animEl.appendChild(img);
    overlay.remove();
    rootRef.current.appendChild(animEl);

    const rootLeft = viewingState.current.originalTilePos.left - rootRect.left;
    const rootTop = viewingState.current.originalTilePos.top - rootRect.top;

    requestAnimationFrame(() => {
      animEl.style.left = rootLeft + 'px';
      animEl.style.top = rootTop + 'px';
      animEl.style.width = viewingState.current.originalTilePos.width + 'px';
      animEl.style.height = viewingState.current.originalTilePos.height + 'px';
      animEl.style.opacity = '0';
    });

    animEl.addEventListener('transitionend', () => {
      animEl.remove();
      if (refDiv) refDiv.remove();
      viewingState.current.focusedEl.style.visibility = '';
      parent.removeAttribute('data-focused');
      viewingState.current.focusedEl = null;
      viewingState.current.opening = false;
      rootRef.current.removeAttribute('data-enlarging');
      document.body.classList.remove('dg-scroll-lock');
    }, { once: true });
  }, []);

  const onTileClick = useCallback((el, it) => {
    if (stateRef.current.isDragging || stateRef.current.hasMoved || (performance.now() - stateRef.current.lastDragEndAt < 80) || viewingState.current.opening) return;
    
    viewingState.current.opening = true;
    document.body.classList.add('dg-scroll-lock');
    const parent = el.parentElement;
    viewingState.current.focusedEl = el;
    parent.setAttribute('data-focused', 'true');

    const pX = parseFloat(parent.dataset.offsetX);
    const pY = parseFloat(parent.dataset.offsetY);
    const pRot = computeItemBaseRot(pX, pY, 2, 2);

    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference';
    refDiv.style.opacity = '0';
    refDiv.style.transform = `rotateX(${-pRot.rotateX}deg) rotateY(${-pRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    const tileR = refDiv.getBoundingClientRect();
    const viewerR = viewerRef.current.getBoundingClientRect();
    const frameR = frameRef.current.getBoundingClientRect();

    viewingState.current.originalTilePos = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
    el.style.visibility = 'hidden';

    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.left = (frameR.left - viewerR.left) + 'px';
    overlay.style.top = (frameR.top - viewerR.top) + 'px';
    overlay.style.width = frameR.width + 'px';
    overlay.style.height = frameR.height + 'px';
    overlay.style.opacity = '0';
    overlay.style.transition = `transform 300ms ease, opacity 300ms ease`;

    const img = document.createElement('img');
    img.src = it.src;
    overlay.appendChild(img);
    viewerRef.current.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = Math.max(0.01, tileR.width / frameR.width);
    const sy0 = Math.max(0.01, tileR.height / frameR.height);

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`;

    setTimeout(() => {
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
      rootRef.current.setAttribute('data-enlarging', 'true');
    }, 16);
  }, []);

  const stateRef = useRef({
    rotX: 0,
    rotY: 0,
    isDragging: false,
    hasMoved: false,
    startPos: { x: 0, y: 0 },
    startRot: { x: 0, y: 0 },
    inertiaRAF: null,
    lastDragEndAt: 0,
    instVx: 0,
    instVy: 0,
    lastTime: 0,
    prevPos: { x: 0, y: 0 }
  });

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const wrapAngleSigned = deg => {
    const a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
  };

  const buildItems = (pool, seg) => {
    if (!pool || pool.length === 0 || !pool[0].src) return [];
    const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];
    const coords = xCols.flatMap((x, c) => {
      const ys = c % 2 === 0 ? evenYs : oddYs;
      return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
    });
    return coords.map((c, i) => ({
      ...c,
      src: pool[i % pool.length].src,
      alt: pool[i % pool.length].alt
    }));
  };

  const applyDomeTransform = (xDeg, yDeg) => {
    if (sphereElRef.current) {
      sphereElRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const stopInertia = () => {
    if (stateRef.current.inertiaRAF) cancelAnimationFrame(stateRef.current.inertiaRAF);
    stateRef.current.inertiaRAF = null;
  };

  const startInertia = (vx, vy) => {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const d = clamp(DEFAULTS.dragDampening, 0, 1);
    const frictionMul = 0.94 + 0.055 * d;
    const stopThreshold = 0.015 - 0.01 * d;
    const maxFrames = Math.round(90 + 270 * d);
    const step = () => {
      vX *= frictionMul;
      vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
        stateRef.current.inertiaRAF = null;
        return;
      }
      if (++frames > maxFrames) {
        stateRef.current.inertiaRAF = null;
        return;
      }
      stateRef.current.rotX = clamp(stateRef.current.rotX - vY / 200, -DEFAULTS.maxVerticalRotationDeg, DEFAULTS.maxVerticalRotationDeg);
      stateRef.current.rotY = wrapAngleSigned(stateRef.current.rotY + vX / 200);
      applyDomeTransform(stateRef.current.rotX, stateRef.current.rotY);
      stateRef.current.inertiaRAF = requestAnimationFrame(step);
    };
    stopInertia();
    stateRef.current.inertiaRAF = requestAnimationFrame(step);
  };



  useEffect(() => {
    const domeItems = buildItems(DEFAULT_IMAGES, DEFAULTS.segments);

    domeItems.forEach((it) => {
      const el = document.createElement('div');
      el.className = 'item';
      el.dataset.offsetX = it.x;
      el.dataset.offsetY = it.y;
      el.dataset.sizeX = it.sizeX;
      el.dataset.sizeY = it.sizeY;
      el.style.setProperty('--offset-x', it.x);
      el.style.setProperty('--offset-y', it.y);
      el.style.setProperty('--item-size-x', it.sizeX);
      el.style.setProperty('--item-size-y', it.sizeY);

      const imgDiv = document.createElement('div');
      imgDiv.className = 'item__image';
      imgDiv.setAttribute('role', 'button');
      imgDiv.setAttribute('tabindex', '0');
      imgDiv.title = 'Click to view';

      const img = document.createElement('img');
      img.src = it.src;
      img.draggable = false;
      img.alt = it.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';

      imgDiv.appendChild(img);
      el.appendChild(imgDiv);
      sphereElRef.current.appendChild(el);

      imgDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        onTileClick(imgDiv, it);
      });
    });

    applyDomeTransform(0, 0);

    const onPointerDown = (e) => {
      stopInertia();
      stateRef.current.isDragging = true;
      stateRef.current.hasMoved = false;
      stateRef.current.startRot = { x: stateRef.current.rotX, y: stateRef.current.rotY };
      stateRef.current.startPos = { x: e.clientX, y: e.clientY };
      stateRef.current.prevPos = { x: e.clientX, y: e.clientY };
      stateRef.current.lastTime = performance.now();
      stateRef.current.instVx = 0;
      stateRef.current.instVy = 0;
      // DEFERRED: No setPointerCapture here to allow clicks on children
    };

    const onPointerMove = (e) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.startPos.x;
      const dy = e.clientY - stateRef.current.startPos.y;
      
      // Threshold for drag
      if (!stateRef.current.hasMoved && (dx * dx + dy * dy > 16)) {
        stateRef.current.hasMoved = true;
        // ACTIVATE CAPTURE now that we know it's a drag
        try {
          mainRef.current.setPointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
      }

      const now = performance.now();
      const dt = Math.max(1, now - stateRef.current.lastTime);
      stateRef.current.instVx = (e.clientX - stateRef.current.prevPos.x) / dt;
      stateRef.current.instVy = (e.clientY - stateRef.current.prevPos.y) / dt;
      stateRef.current.prevPos = { x: e.clientX, y: e.clientY };
      stateRef.current.lastTime = now;

      stateRef.current.rotX = clamp(stateRef.current.startRot.x - dy / DEFAULTS.dragSensitivity, -DEFAULTS.maxVerticalRotationDeg, DEFAULTS.maxVerticalRotationDeg);
      stateRef.current.rotY = wrapAngleSigned(stateRef.current.startRot.y + dx / DEFAULTS.dragSensitivity);
      applyDomeTransform(stateRef.current.rotX, stateRef.current.rotY);
    };

    const onPointerUp = (e) => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;
      
      try {
        mainRef.current.releasePointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }

      if (stateRef.current.hasMoved) stateRef.current.lastDragEndAt = performance.now();
      
      const vx = clamp(stateRef.current.instVx * 15, -1.2, 1.2);
      const vy = clamp(stateRef.current.instVy * 15, -1.2, 1.2);
      if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) startInertia(vx, vy);
    };

    const main = mainRef.current;
    main.addEventListener('pointerdown', onPointerDown);
    main.addEventListener('pointermove', onPointerMove);
    main.addEventListener('pointerup', onPointerUp);

    return () => {
      main.removeEventListener('pointerdown', onPointerDown);
      main.removeEventListener('pointermove', onPointerMove);
      main.removeEventListener('pointerup', onPointerUp);
      stopInertia();
    };
  }, []);

  return (
    <>
      <section id="gallery" className="relative bg-[#064e3b] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 pointer-events-none mb-12">
          <div ref={headerRef} className="text-center reveal">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/5 backdrop-blur-sm">
              Gallery
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter font-outfit">
              Glimpses from <span className="text-emerald-400">Previous Events</span>
            </h2>
            <p className="text-emerald-50/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed font-inter">
              Join 600+ motivated students from across Kozhikode. 
              Experience the energy, inspiration, and community that define Teens Meet.
            </p>
            <p className="text-emerald-400/50 text-xs mt-3 font-semibold tracking-widest uppercase">
              ✦ Click any image to view full size
            </p>
          </div>
        </div>

        <div
          ref={rootRef}
          className="sphere-root"
          style={{
            '--segments-x': 34,
            '--segments-y': 34,
            '--radius': '900px',
            '--viewer-pad': '72px',
            '--overlay-blur-color': 'rgba(6, 78, 59, 0.9)',
            '--tile-radius': '30px',
            '--enlarge-radius': '30px',
            '--image-filter': 'none'
          }}
        >
          <main ref={mainRef} className="sphere-main">
            <div className="stage">
              <div ref={sphereElRef} className="sphere"></div>
            </div>
            <div className="overlay"></div>
            <div className="overlay overlay--blur"></div>
            <div className="edge-fade edge-fade--top"></div>
            <div className="edge-fade edge-fade--bottom"></div>

            <div className="viewer" ref={viewerRef}>
              <div className="scrim" ref={scrimRef} onClick={closeEnlarged}></div>
              <div className="frame" ref={frameRef}></div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Gallery;
