/**
 * Lighting Configuration and Setup Manager
 * Centralizes the vibrant rendering aesthetic for Creator and Viewer.
 */

const LightingConfig = {
    // Default presets for different modes
    presets: {
        viewer: {
            hemiSky: 0xffffff, // Puramente neutral para no teñir de azul
            hemiGround: 0x444444,
            hemiIntensity: 0.7,
            ambientIntensity: 0.5,
            sunIntensity: 4.0,
            sunPos: { x: 20, y: 50, z: 20 },
            shadowResolution: 512,
            shadowBias: -0.0005
        },
        creator: {
            hemiSky: 0x87CEEB,
            hemiGround: 0x444444,
            hemiIntensity: 0.9,
            ambientIntensity: 0.3,
            sunIntensity: 1.8,
            sunPos: { x: 20, y: 50, z: 20 },
            shadowResolution: 512,
            shadowBias: -0.0002
        }
    },

    /**
     * Initializes the lighting for a THREE.Scene
     * @param {Object} THREE - The Three.js library object
     * @param {THREE.Scene} scene - The target scene
     * @param {string} preset - 'viewer' or 'creator'
     */
    init(THREE, scene, preset = 'viewer') {
        const config = this.presets[preset];

        // 1. Hemisphere Light (Sky/Ground bounce)
        const hemiLight = new THREE.HemisphereLight(
            config.hemiSky, 
            config.hemiGround, 
            config.hemiIntensity
        );
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        // 2. Ambient Light (Soft fill)
        const ambientLight = new THREE.AmbientLight(0xffffff, config.ambientIntensity);
        scene.add(ambientLight);

        // 3. Directional Sun Light (Volume and Shadows)
        const sunLight = new THREE.DirectionalLight(0xffffff, config.sunIntensity);
        sunLight.position.set(config.sunPos.x, config.sunPos.y, config.sunPos.z);
        sunLight.castShadow = true;
        
        // Shadow Camera Optimization
        const d = 80; // Scale of shadow coverage
        sunLight.shadow.camera.left = -d;
        sunLight.shadow.camera.right = d;
        sunLight.shadow.camera.top = d;
        sunLight.shadow.camera.bottom = -d;
        
        sunLight.shadow.mapSize.width = config.shadowResolution;
        sunLight.shadow.mapSize.height = config.shadowResolution;
        sunLight.shadow.bias = config.shadowBias;
        
        scene.add(sunLight);

        return { hemiLight, ambientLight, sunLight };
    }
};

// Global export for ease of use in HTML files
window.LightingConfig = LightingConfig;
