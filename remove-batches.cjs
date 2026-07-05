const fs = require('fs');
const path = require('path');

const dir = 'src/routes';
const files = [
  'camps.index.tsx',
  'gallery.index.tsx',
  'highlights.tsx',
  'index.tsx',
  'projects.index.tsx',
  'reports.tsx',
  'team.tsx',
  '__root.tsx'
];

files.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remove from imports
  content = content.replace(/getBatches,\s*/g, '');
  content = content.replace(/,\s*getBatches/g, '');
  content = content.replace(/import\s*\{\s*getBatches\s*\}\s*from\s*["']@\/lib\/data["'];?\r?\n/g, '');
  
  // 2. Remove from Promise.all
  content = content.replace(/getBatches\(\),\s*/g, '');
  content = content.replace(/,\s*getBatches\(\)/g, '');
  
  // 3. Remove batches from loader data mapping in destructuring (e.g., const [projects, batches] = await Promise.all)
  // For most files it's const [..., batches] = await ...
  // This might be tricky via regex, so I'll be specific.
  
  if (f === 'camps.index.tsx') {
    content = content.replace(/const \[camps, batches\] = await Promise\.all\(\[/, 'const [camps] = await Promise.all([');
    content = content.replace(/return \{ camps, batches \};/, 'return { camps };');
    content = content.replace(/const \{ camps, batches \} = Route\.useLoaderData\(\)/, 'const { camps } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    // Also remove the filter dropdown in camps
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }
  
  if (f === 'gallery.index.tsx') {
    content = content.replace(/const \[albums, batches, albumTypes, years\] = await Promise\.all\(\[/, 'const [albums, albumTypes, years] = await Promise.all([');
    content = content.replace(/return \{ albums, batches, albumTypes, years \};/, 'return { albums, albumTypes, years };');
    content = content.replace(/const \{ albums, batches, albumTypes, years \} = Route\.useLoaderData\(\)/, 'const { albums, albumTypes, years } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }

  if (f === 'highlights.tsx') {
    content = content.replace(/const \[highlights, batches, highlightTypes, years\] = await Promise\.all\(\[/, 'const [highlights, highlightTypes, years] = await Promise.all([');
    content = content.replace(/return \{ highlights, batches, highlightTypes, years \};/, 'return { highlights, highlightTypes, years };');
    content = content.replace(/const \{ highlights, batches, highlightTypes, years \} = Route\.useLoaderData\(\)/, 'const { highlights, highlightTypes, years } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }

  if (f === 'projects.index.tsx') {
    content = content.replace(/const \[projects, batches\] = await Promise\.all\(\[/, 'const [projects] = await Promise.all([');
    content = content.replace(/return \{ projects, batches \};/, 'return { projects };');
    content = content.replace(/const \{ projects, batches \} = Route\.useLoaderData\(\)/, 'const { projects } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }

  if (f === 'reports.tsx') {
    content = content.replace(/const \[reports, batches, reportTypes, years\] = await Promise\.all\(\[/, 'const [reports, reportTypes, years] = await Promise.all([');
    content = content.replace(/return \{ reports, batches, reportTypes, years \};/, 'return { reports, reportTypes, years };');
    content = content.replace(/const \{ reports, batches, reportTypes, years \} = Route\.useLoaderData\(\)/, 'const { reports, reportTypes, years } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }

  if (f === 'team.tsx') {
    content = content.replace(/const \[team, batches\] = await Promise\.all\(\[/, 'const [team] = await Promise.all([');
    content = content.replace(/return \{ team, batches \};/, 'return { team };');
    content = content.replace(/const \{ team, batches \} = Route\.useLoaderData\(\)/, 'const { team } = Route.useLoaderData()');
    content = content.replace(/batches:\s*Batch\[\];/, '');
    content = content.replace(/<FilterGroup[\s\S]*?options=\{batches\.map[\s\S]*?\/>/, '');
  }
  
  if (f === '__root.tsx') {
    content = content.replace(/const \[s, batches, social\] = await Promise\.all\(\[getSiteSettings\(\), getSocialLinks\(\)\]\);/, 'const [s, social] = await Promise.all([getSiteSettings(), getSocialLinks()]);');
    // I already removed getBatches() in previous replace, so it's just [s, social]
    content = content.replace(/const \[s, social\] = await Promise\.all\(\[getSiteSettings\(\), getSocialLinks\(\)\]\);/, 'const [s, social] = await Promise.all([getSiteSettings(), getSocialLinks()]);');
    content = content.replace(/const \[s, batches, social\] = await Promise\.all\(\[getSiteSettings\(\), getBatches\(\), getSocialLinks\(\)\]\);/, 'const [s, social] = await Promise.all([getSiteSettings(), getSocialLinks()]);');
    content = content.replace(/return \{ s, batches, social \};/, 'return { s, social };');
    // For type: RouteContext
    content = content.replace(/batches: Batch\[\];\s*/, '');
    content = content.replace(/import type \{[\s\S]*?Batch[\s\S]*?\} from \"\.\.\/types\";/, function(match) {
        return match.replace(/Batch,\s*/, '');
    });
  }

  if (f === 'index.tsx') {
     content = content.replace(/const batches   = \[\];\n/, '');
     content = content.replace(/batches,\s*/g, '');
  }
  
  // also remove import Batch from types if it exists in these files
  content = content.replace(/Batch,\s*/g, '');

  fs.writeFileSync(filePath, content);
});
