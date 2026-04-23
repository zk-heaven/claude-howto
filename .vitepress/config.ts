import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

function sidebarEN() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/' },
        { text: 'Quick Reference', link: '/QUICK_REFERENCE' },
        { text: 'Learning Roadmap', link: '/LEARNING-ROADMAP' },
        { text: 'Feature Catalog', link: '/CATALOG' },
        { text: 'Complete Index', link: '/INDEX' },
      ]
    },
    {
      text: '01: Slash Commands',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/01-slash-commands/' },
        { text: 'Commit', link: '/01-slash-commands/commit' },
        { text: 'Pull Request', link: '/01-slash-commands/pr' },
        { text: 'Push All', link: '/01-slash-commands/push-all' },
        { text: 'Unit Test Expand', link: '/01-slash-commands/unit-test-expand' },
        { text: 'Generate API Docs', link: '/01-slash-commands/generate-api-docs' },
        { text: 'Setup CI/CD', link: '/01-slash-commands/setup-ci-cd' },
        { text: 'Optimize', link: '/01-slash-commands/optimize' },
        { text: 'Doc Refactor', link: '/01-slash-commands/doc-refactor' },
      ]
    },
    {
      text: '02: Memory',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/02-memory/' },
        { text: 'Project CLAUDE.md', link: '/02-memory/project-CLAUDE' },
        { text: 'Directory API', link: '/02-memory/directory-api-CLAUDE' },
        { text: 'Personal CLAUDE.md', link: '/02-memory/personal-CLAUDE' },
      ]
    },
    {
      text: '03: Skills',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/03-skills/' },
        { text: 'Code Review', link: '/03-skills/code-review/SKILL' },
        { text: 'Brand Voice', link: '/03-skills/brand-voice/SKILL' },
        { text: 'Doc Generator', link: '/03-skills/doc-generator/SKILL' },
        { text: 'Refactor', link: '/03-skills/refactor/SKILL' },
        { text: 'Blog Draft', link: '/03-skills/blog-draft/SKILL' },
        { text: 'Claude MD', link: '/03-skills/claude-md/SKILL' },
      ]
    },
    {
      text: '04: Subagents',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/04-subagents/' },
        { text: 'Code Reviewer', link: '/04-subagents/code-reviewer' },
        { text: 'Clean Code Reviewer', link: '/04-subagents/clean-code-reviewer' },
        { text: 'Debugger', link: '/04-subagents/debugger' },
        { text: 'Test Engineer', link: '/04-subagents/test-engineer' },
        { text: 'Documentation Writer', link: '/04-subagents/documentation-writer' },
        { text: 'Implementation Agent', link: '/04-subagents/implementation-agent' },
        { text: 'Performance Optimizer', link: '/04-subagents/performance-optimizer' },
        { text: 'Security Reviewer', link: '/04-subagents/secure-reviewer' },
        { text: 'Data Scientist', link: '/04-subagents/data-scientist' },
      ]
    },
    {
      text: '05: MCP',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/05-mcp/' },
      ]
    },
    {
      text: '06: Hooks',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/06-hooks/' },
      ]
    },
    {
      text: '07: Plugins',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/07-plugins/' },
        { text: 'DevOps Automation', link: '/07-plugins/devops-automation/' },
        { text: 'Documentation', link: '/07-plugins/documentation/' },
        { text: 'PR Review', link: '/07-plugins/pr-review/' },
      ]
    },
    {
      text: '08: Checkpoints',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/08-checkpoints/' },
        { text: 'Examples', link: '/08-checkpoints/checkpoint-examples' },
      ]
    },
    {
      text: '09: Advanced Features',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/09-advanced-features/' },
        { text: 'Planning Mode', link: '/09-advanced-features/planning-mode-examples' },
      ]
    },
    {
      text: '10: CLI Reference',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/10-cli/' },
      ]
    },
    {
      text: 'Reference',
      collapsed: true,
      items: [
        { text: 'Style Guide', link: '/STYLE_GUIDE' },
        { text: 'Concepts Guide', link: '/claude_concepts_guide' },
        { text: 'Clean Code Rules', link: '/clean-code-rules' },
        { text: 'Contributing', link: '/CONTRIBUTING' },
        { text: 'Changelog', link: '/CHANGELOG' },
      ]
    }
  ]
}

function sidebar(locale: string) {
  const prefix = locale ? `/${locale}` : ''
  const items = sidebarEN()

  function prefixLink(item: { link?: string; items?: unknown[] }): any {
    if (item.link) {
      return { ...item, link: `${prefix}${item.link}` }
    }
    return item
  }

  return items.map(group => ({
    ...group,
    items: group.items.map(prefixLink)
  }))
}

export default withMermaid({
  title: 'Claude How-To',
  description: 'Master Claude Code in a Weekend — Visual tutorials, copy-paste templates, and a guided learning path.',

  // For GitHub Pages deployment at /claude-howto/
  base: '/claude-howto/',

  // Content was originally authored for GitHub README viewing, so internal links
  // reference GitHub file paths. Disable dead-link checking rather than rewriting
  // thousands of cross-references across 4 languages.
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/claude-howto/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', sizes: '32x32', href: '/claude-howto/resources/favicons/favicon-32.svg' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Claude How-To',
      description: 'Master Claude Code in a Weekend — Visual tutorials, copy-paste templates, and a guided learning path.',
      themeConfig: {
        logo: {
          light: '/claude-howto/resources/logos/claude-howto-logo.svg',
          dark: '/claude-howto/resources/logos/claude-howto-logo-dark.svg',
          alt: 'Claude How-To',
        },
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Learning Roadmap', link: '/LEARNING-ROADMAP' },
          { text: 'Catalog', link: '/CATALOG' },
          { text: 'GitHub', link: 'https://github.com/luongnv89/claude-howto' },
        ],
        sidebar: sidebarEN(),
      }
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi',
      title: 'Claude How-To',
      description: 'Làm chủ Claude Code trong một ngày cuối tuần — Hướng dẫn trực quan, mẫu sao chép và lộ trình học tập có hướng dẫn.',
      themeConfig: {
        logo: {
          light: '/claude-howto/resources/logos/claude-howto-logo.svg',
          dark: '/claude-howto/resources/logos/claude-howto-logo-dark.svg',
          alt: 'Claude How-To',
        },
        nav: [
          { text: 'Trang chủ', link: '/vi/' },
          { text: 'Lộ trình học', link: '/vi/LEARNING-ROADMAP' },
          { text: 'Danh mục', link: '/vi/CATALOG' },
          { text: 'GitHub', link: 'https://github.com/luongnv89/claude-howto' },
        ],
        sidebar: sidebar('vi'),
      }
    },
    zh: {
      label: '中文',
      lang: 'zh',
      title: 'Claude How-To',
      description: '用一个周末掌握 Claude Code — 可视化教程、可复制模板和引导式学习路径。',
      themeConfig: {
        logo: {
          light: '/claude-howto/resources/logos/claude-howto-logo.svg',
          dark: '/claude-howto/resources/logos/claude-howto-logo-dark.svg',
          alt: 'Claude How-To',
        },
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '学习路径', link: '/zh/LEARNING-ROADMAP' },
          { text: '目录', link: '/zh/CATALOG' },
          { text: 'GitHub', link: 'https://github.com/luongnv89/claude-howto' },
        ],
        sidebar: sidebar('zh'),
      }
    },
    uk: {
      label: 'Українська',
      lang: 'uk',
      title: 'Claude How-To',
      description: 'Опануй Claude Code за вихідні — Візуальні посібники, шаблони та навчальний план.',
      themeConfig: {
        logo: {
          light: '/claude-howto/resources/logos/claude-howto-logo.svg',
          dark: '/claude-howto/resources/logos/claude-howto-logo-dark.svg',
          alt: 'Claude How-To',
        },
        nav: [
          { text: 'Головна', link: '/uk/' },
          { text: 'Навчальний план', link: '/uk/LEARNING-ROADMAP' },
          { text: 'Каталог', link: '/uk/CATALOG' },
          { text: 'GitHub', link: 'https://github.com/luongnv89/claude-howto' },
        ],
        sidebar: sidebar('uk'),
      }
    },
  },

  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/luongnv89/claude-howto' },
    ],
    footer: {
      message: 'Built with VitePress and Claude Code',
      copyright: 'MIT License — luongnv89/claude-howto',
    },
    editLink: {
      pattern: 'https://github.com/luongnv89/claude-howto/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: true,
  },

  mermaid: {
    theme: 'default',
  },

  vite: {
    // Handle large number of markdown files
    build: {
      chunkSizeWarningLimit: 1500,
    },
  },
})
