import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { resolve, dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')
const publicDir = resolve(__dirname, '../public')
const MANIFEST_PATH = join(__dirname, 'generated-index-files.json')

// When called with --cleanup, remove previously generated index.md files
if (process.argv.includes('--cleanup')) {
  if (existsSync(MANIFEST_PATH)) {
    const files = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
    for (const f of files) {
      if (existsSync(f)) rmSync(f)
    }
    rmSync(MANIFEST_PATH)
    console.log(`✓ Cleaned up ${files.length} auto-generated index.md files`)
  }
  process.exit(0)
}

function copy(src, dest) {
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(src, dest)
}

function copyDir(src, dest) {
  if (!existsSync(src)) return
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const srcPath = resolve(src, entry)
    const destPath = resolve(dest, entry)
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copy(srcPath, destPath)
    }
  }
}

// Copy resource directories to public/
copyDir(resolve(root, 'resources'), resolve(publicDir, 'resources'))
copyDir(resolve(root, 'assets'), resolve(publicDir, 'assets'))

// Copy root-level logo files
const rootLogo = resolve(root, 'claude-howto-logo.svg')
if (existsSync(rootLogo)) copy(rootLogo, resolve(publicDir, 'claude-howto-logo.svg'))
const rootLogoPng = resolve(root, 'claude-howto-logo.png')
if (existsSync(rootLogoPng)) copy(rootLogoPng, resolve(publicDir, 'claude-howto-logo.png'))

// Copy favicon
const faviconDir = resolve(root, 'resources/favicons')
const favicons = [
  'favicon-16.svg',
  'favicon-32.svg',
  'favicon-64.svg',
  'favicon-128.svg',
  'favicon-256.svg',
]
if (existsSync(faviconDir)) {
  for (const f of favicons) {
    const src = resolve(faviconDir, f)
    if (existsSync(src)) copy(src, resolve(publicDir, 'resources/favicons', f))
  }
}
copy(
  resolve(root, 'resources/favicons/favicon-32.svg'),
  resolve(publicDir, 'favicon.svg')
)

// VitePress resolves directory routes (e.g. /01-slash-commands/) by looking for
// index.md, NOT README.md. Since this project uses README.md as directory entry
// points (GitHub convention), we need to create index.md copies so that feature
// card links and sidebar "Overview" links work correctly.
// See: pathToFile() in vitepress/dist/client/app/utils.js — it always appends
// /index for trailing-slash paths, then looks up in the hashmap.
const ROUTE_DIRS = [
  '01-slash-commands', '02-memory', '03-skills', '04-subagents',
  '05-mcp', '06-hooks', '07-plugins', '08-checkpoints',
  '09-advanced-features', '10-cli',
  '07-plugins/devops-automation', '07-plugins/documentation', '07-plugins/pr-review',
]
const LOCALES = ['', 'vi', 'zh', 'uk']
let indexCount = 0, createdFiles = []
for (const locale of LOCALES) {
  for (const dir of ROUTE_DIRS) {
    const dirPath = join(root, locale, dir)
    if (!existsSync(dirPath)) continue
    const readmePath = join(dirPath, 'README.md')
    const indexPath = join(dirPath, 'index.md')
    if (existsSync(readmePath) && !existsSync(indexPath)) {
      writeFileSync(indexPath, readFileSync(readmePath))
      indexCount++
      createdFiles.push(indexPath)
    }
  }
}
if (indexCount > 0) {
  console.log(`✓ Created ${indexCount} index.md files from README.md for VitePress directory route resolution`)
  writeFileSync(MANIFEST_PATH, JSON.stringify(createdFiles, null, 2))
} else {
  console.log('✓ All directory routes already have index.md files')
}
