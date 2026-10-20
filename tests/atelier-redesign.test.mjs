import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

console.log('=== Superpowers TDD Suite: THE AI ENGINEER’S ATELIER ===');

// 1. Camera Framing & Asymmetric Composition Spec
{
  const presets = read('src/components/workspace/data/cameraPresets.ts');
  assert.match(
    presets,
    /zoom:\s*(1[5-9]\d|2\d\d)/,
    'Default orthographic camera zoom must be >= 150 so the room occupies 65-75% of the viewport'
  );
  assert.match(
    presets,
    /ATELIER_DESKTOP_OFFSET/,
    'Camera presets must define ATELIER_DESKTOP_OFFSET for asymmetric editorial framing'
  );
  console.log('✓ [1/7] Camera framing & asymmetric composition spec');
}

// 2. Cohesive Material Palette Library Spec
{
  const matPath = path.join(
    root,
    'src/components/workspace/objects/materials.ts'
  );
  assert.equal(
    fs.existsSync(matPath),
    true,
    'Cohesive PBR material palette module (objects/materials.ts) must exist'
  );
  const mats = read('src/components/workspace/objects/materials.ts');
  assert.match(mats, /ATELIER_PALETTE/, 'Must export ATELIER_PALETTE');
  assert.match(mats, /day:/, 'Must define Daylight studio palette');
  assert.match(mats, /night:/, 'Must define Night atelier palette');
  console.log('✓ [2/7] Cohesive PBR material library spec');
}

// 3. Non-cluttered 3D Hotspots Spec (No always-visible text labels over the 3D scene)
{
  const scene = read('src/components/workspace/WorkspaceScene.tsx');
  assert.doesNotMatch(
    scene,
    /<span className="ws-hotspot-text">/,
    '3D scene must NOT render always-visible text labels over every object by default'
  );
  assert.match(
    scene,
    /ws-beacon-node/,
    '3D scene must use subtle interactive beacon indicators with hover tooltip'
  );
  console.log('✓ [3/7] Non-cluttered 3D hotspots & hover tooltip spec');
}

// 4. Asymmetric Editorial Hero Typography & Compact Floating Project Dock Spec
{
  const controls = read('src/components/workspace/WorkspaceControls.tsx');
  assert.match(
    controls,
    /ws-editorial-hero/,
    'WorkspaceControls must render the asymmetric left editorial hero identity block'
  );
  assert.match(
    controls,
    /ws-atelier-dock/,
    'WorkspaceControls must render the compact floating navigation dock (Explore Lab, All Projects, About, Skills, Contact, Reset)'
  );
  assert.match(
    controls,
    /projectsMenuOpen/,
    'Floating dock must support an expandable project selector menu instead of 7 always-visible pills'
  );
  console.log('✓ [4/7] Editorial hero typography & floating project dock spec');
}

// 5. UI Color System & Atmospheric Background Tokens Spec
{
  const css = read('src/components/workspace/styles/workspace.css');
  for (const hex of [
    '#0D1422',
    '#182338',
    '#F4F7FB',
    '#AAB7C9',
    '#7DDCF7',
    '#AC98FF',
    '#FFC992',
  ]) {
    assert.equal(
      css.toUpperCase().includes(hex),
      true,
      `workspace.css must include design token ${hex}`
    );
  }
  console.log('✓ [5/7] UI color tokens & atmospheric background spec');
}

// 6. Cinematic Studio Day & Night Lighting Spec
{
  const lighting = read('src/components/workspace/RoomLighting.tsx');
  assert.match(
    lighting,
    /fillLightRef/,
    'RoomLighting must include a dedicated studio fill light so shadows are never crushed'
  );
  assert.match(
    lighting,
    /rimLightRef/,
    'RoomLighting must include a rim/accent light for miniature architectural definition'
  );
  console.log('✓ [6/7] Cinematic Day/Night lighting hierarchy spec');
}

// 7. All 7 Real Portfolio Projects Preserved & Accessible
{
  const projectsFile = read('src/data/projects.ts');
  for (const slug of [
    'video-retrieval-system',
    'milky-way-galaxy',
    'javatorch',
    'rag-film-chatbot',
    'traffic-monitoring',
    'uit-pinance',
    'milky-way-simulation',
  ]) {
    assert.equal(
      projectsFile.includes(`slug: '${slug}'`),
      true,
      `Project ${slug} must be preserved in src/data/projects.ts`
    );
  }
  console.log('✓ [7/10] All 7 portfolio projects preserved');
}

// 8. Real 3D Asset Research Plan, Manifest & Credits Documentation Spec
{
  for (const docPath of [
    'docs/3d-asset-plan.md',
    'docs/3d-asset-credits.md',
    'docs/3d-asset-manifest.json',
  ]) {
    assert.equal(
      fs.existsSync(path.join(root, docPath)),
      true,
      `Required 3D asset documentation file ${docPath} must exist`
    );
  }
  const manifest = JSON.parse(read('docs/3d-asset-manifest.json'));
  assert.equal(
    manifest.totalAssets >= 19,
    true,
    'Manifest must contain at least 19 normalized GLB assets'
  );
  assert.equal(
    manifest.totalSizeBytes < 5_000_000,
    true,
    'Total 3D asset payload must stay well under the 5 MB target budget'
  );
  console.log(
    `✓ [8/10] 3D asset documentation & manifest verified (${manifest.totalAssets} assets, ${(manifest.totalSizeBytes / 1024).toFixed(1)} KB, ${manifest.totalTriangles} tris)`
  );
}

// 9. Binary glTF 2.0 (.glb) Asset Integrity & Normalization Spec
{
  const requiredGlbs = [
    'public/assets/3d/workstation/desk.glb',
    'public/assets/3d/workstation/desk_drawer.glb',
    'public/assets/3d/workstation/monitor.glb',
    'public/assets/3d/workstation/monitor_ultrawide.glb',
    'public/assets/3d/workstation/keyboard.glb',
    'public/assets/3d/workstation/mouse.glb',
    'public/assets/3d/workstation/desk_lamp.glb',
    'public/assets/3d/workstation/speaker.glb',
    'public/assets/3d/workstation/laptop.glb',
    'public/assets/3d/electronics/gpu_workstation.glb',
    'public/assets/3d/electronics/gpu_fan_unit.glb',
    'public/assets/3d/electronics/hologram_pedestal.glb',
    'public/assets/3d/furniture/office_chair.glb',
    'public/assets/3d/furniture/bookshelf.glb',
    'public/assets/3d/props/book_stack.glb',
    'public/assets/3d/props/houseplant_large.glb',
    'public/assets/3d/props/houseplant_small.glb',
    'public/assets/3d/props/coffee_mug.glb',
    'public/assets/3d/robot/datbot.glb',
  ];
  for (const relPath of requiredGlbs) {
    const full = path.join(root, relPath);
    assert.equal(fs.existsSync(full), true, `GLB file ${relPath} must exist`);
    const buf = fs.readFileSync(full);
    assert.equal(
      buf.subarray(0, 4).toString('ascii'),
      'glTF',
      `${relPath} must have valid binary glTF 2.0 header`
    );
    assert.equal(
      buf.includes('__AtelierNormalizedRoot'),
      true,
      `${relPath} must contain normalized transform root node __AtelierNormalizedRoot`
    );
  }
  console.log('✓ [9/10] All 19 normalized GLB binary assets verified');
}

// 10. R3F Scene Object Components Use Real GLB Assets Spec
{
  const componentChecks = [
    ['src/components/workspace/objects/Desk.tsx', 'workstation/desk.glb'],
    ['src/components/workspace/objects/Desk.tsx', 'furniture/office_chair.glb'],
    ['src/components/workspace/objects/Monitor.tsx', 'workstation/monitor_ultrawide.glb'],
    ['src/components/workspace/objects/Monitor.tsx', 'workstation/monitor.glb'],
    ['src/components/workspace/objects/GPUStation.tsx', 'electronics/gpu_workstation.glb'],
    ['src/components/workspace/objects/GPUStation.tsx', 'electronics/gpu_fan_unit.glb'],
    ['src/components/workspace/objects/Bookshelf.tsx', 'furniture/bookshelf.glb'],
    ['src/components/workspace/objects/CoffeeCup.tsx', 'props/coffee_mug.glb'],
    ['src/components/workspace/objects/Robot.tsx', 'robot/datbot.glb'],
    ['src/components/workspace/objects/GalaxyHologram.tsx', 'electronics/hologram_pedestal.glb'],
    ['src/components/workspace/objects/RoomShell.tsx', 'props/houseplant_large.glb'],
  ];
  for (const [compFile, assetRef] of componentChecks) {
    const src = read(compFile);
    assert.equal(
      src.includes(assetRef),
      true,
      `${compFile} must load real 3D asset ${assetRef}`
    );
  }
  console.log('✓ [10/10] All R3F object components verified to use real 3D GLB assets');
}

console.log('ALL TESTS PASSED!');
