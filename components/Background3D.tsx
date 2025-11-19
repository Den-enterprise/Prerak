import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Deep fog for depth - subtle fade into the dark background
    scene.fog = new THREE.FogExp2(0x05050a, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Groups ---
    const starGroup = new THREE.Group();
    const structureGroup = new THREE.Group();
    scene.add(starGroup);
    scene.add(structureGroup);

    // --- Objects ---

    // 1. Primary Particle Field (Stardust)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide cylinder/sphere shape
        posArray[i] = (Math.random() - 0.5) * 150; 
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Colors from Tailwind config
    const colorViolet = new THREE.Color(0x8b5cf6); // brand-500
    const colorCyan = new THREE.Color(0x22d3ee);   // accent-400
    const colorDeep = new THREE.Color(0x4c1d95);   // brand-900
    const colorWhite = new THREE.Color(0xffffff);

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        color: colorViolet,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    starGroup.add(particlesMesh);

    // 2. Secondary Particle Field (Larger, sparser "Data Nodes")
    const largeParticlesGeo = new THREE.BufferGeometry();
    const largeParticlesCount = 100;
    const largePosArray = new Float32Array(largeParticlesCount * 3);
    for(let i = 0; i < largeParticlesCount * 3; i++) {
        largePosArray[i] = (Math.random() - 0.5) * 100;
    }
    largeParticlesGeo.setAttribute('position', new THREE.BufferAttribute(largePosArray, 3));
    
    const largeParticlesMat = new THREE.PointsMaterial({
        size: 0.3,
        color: colorCyan,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    const largeParticlesMesh = new THREE.Points(largeParticlesGeo, largeParticlesMat);
    starGroup.add(largeParticlesMesh);

    // 3. Main Wireframe Globe (Icosahedron)
    const globeGeometry = new THREE.IcosahedronGeometry(13, 2); 
    const globeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4c1d95, 
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    structureGroup.add(globe);
    
    // 4. Inner Core (Opposite rotation)
    const coreGeometry = new THREE.IcosahedronGeometry(6, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    structureGroup.add(core);

    // 5. Floating Geometric Shapes (Orbiting Debris)
    const shapesGroup = new THREE.Group();
    const shapeGeo = new THREE.TetrahedronGeometry(1, 0);
    const shapeMat = new THREE.MeshBasicMaterial({ 
        color: 0x7c3aed, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.2 
    });
    
    // Store reference to animate them individually
    const debris: { 
        mesh: THREE.Mesh, 
        rotationSpeed: {x: number, y: number}, 
        orbitSpeed: number, 
        orbitRadius: number, 
        orbitAngle: number,
        yOffset: number 
    }[] = [];

    for (let i = 0; i < 40; i++) {
        const mesh = new THREE.Mesh(shapeGeo, shapeMat);
        const radius = 15 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 50;
        
        mesh.position.set(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
        );
        
        const scale = Math.random() * 0.8 + 0.2;
        mesh.scale.set(scale, scale, scale);
        
        shapesGroup.add(mesh);
        debris.push({
            mesh,
            rotationSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
            orbitSpeed: (0.002 + Math.random() * 0.005) * (Math.random() < 0.5 ? 1 : -1),
            orbitRadius: radius,
            orbitAngle: angle,
            yOffset: y
        });
    }
    structureGroup.add(shapesGroup);


    // --- State ---
    const mouse = new THREE.Vector2();
    let scrollY = 0;
    
    // --- Animation Logic ---
    const clock = new THREE.Clock();
    
    const animate = () => {
        const time = clock.getElapsedTime();
        requestAnimationFrame(animate);

        // 1. Scroll Calculations
        const docHeight = document.body.scrollHeight - window.innerHeight || 1;
        const scrollPercent = Math.min(Math.max(scrollY / docHeight, 0), 1); // 0 to 1
        
        // 2. Dynamic Color Shifting based on Scroll
        // Start: Violet (Brand), Mid: Cyan (Accent), End: Dark Purple/Blue
        let targetColor = colorViolet;
        let secondaryColor = colorCyan;
        
        if (scrollPercent > 0.4 && scrollPercent <= 0.7) {
            targetColor = colorCyan;
            secondaryColor = colorWhite;
        } else if (scrollPercent > 0.7) {
            targetColor = colorDeep;
            secondaryColor = colorViolet;
        }

        // Smoothly interpolate colors
        particlesMaterial.color.lerp(targetColor, 0.02);
        largeParticlesMat.color.lerp(secondaryColor, 0.02);
        globeMaterial.color.lerp(targetColor, 0.05);
        shapeMat.color.lerp(secondaryColor, 0.05);

        // 3. Scene Rotation (Base + Scroll influence)
        // Adding scrollY to rotation gives a feeling of "progressing" through the system
        const rotationY = time * 0.05 + (scrollY * 0.0005);
        starGroup.rotation.y = rotationY * 0.2; // Stars move slower
        structureGroup.rotation.y = rotationY;
        
        // Tilt based on scroll to show different perspectives
        structureGroup.rotation.x = Math.sin(time * 0.2) * 0.1 + (scrollY * 0.0002);

        // 4. "Breathing" Effect for Globe
        const pulse = 1 + Math.sin(time * 0.8) * 0.03;
        globe.scale.set(pulse, pulse, pulse);
        core.scale.set(1/pulse, 1/pulse, 1/pulse);
        
        core.rotation.y -= 0.01; // Core spins independently

        // 5. Debris Animation
        debris.forEach(d => {
            // Self rotation
            d.mesh.rotation.x += d.rotationSpeed.x;
            d.mesh.rotation.y += d.rotationSpeed.y;
            
            // Orbit movement
            // Speed up slightly when scrolling
            const currentOrbitSpeed = d.orbitSpeed * (1 + scrollPercent * 2);
            d.orbitAngle += currentOrbitSpeed;
            
            d.mesh.position.x = Math.cos(d.orbitAngle) * d.orbitRadius;
            d.mesh.position.z = Math.sin(d.orbitAngle) * d.orbitRadius;
            
            // Float up/down
            d.mesh.position.y = d.yOffset + Math.sin(time + d.orbitAngle) * 2;
        });

        // 6. Mouse Parallax (Interactive Depth)
        const targetX = mouse.x * 3;
        const targetY = mouse.y * 3;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        
        // Look slightly offset from center based on mouse
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // --- Event Listeners ---
    const handleMouseMove = (event: MouseEvent) => {
        // Normalize mouse coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
        scrollY = window.scrollY;
    };

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }
        
        // Manual cleanup of geometries/materials to prevent leaks in SPA navigation
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        largeParticlesGeo.dispose();
        largeParticlesMat.dispose();
        globeGeometry.dispose();
        globeMaterial.dispose();
        coreGeometry.dispose();
        coreMaterial.dispose();
        shapeGeo.dispose();
        shapeMat.dispose();
        renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none bg-[#05050a]" />;
};