# lucUI CSS Framework - Setup Guide

This guide will help you set up lucUI for public distribution via GitHub and npm.

## Prerequisites

- GitHub account
- npm account (for publishing to npm)
- Git installed on your machine

## Step 1: GitHub Repository Setup

### Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `lucui` (or your preferred name)
3. Description: `Premium glass morphism CSS framework by luca.ecosystem`
4. Public: ✅ (for public distribution)
5. Initialize with: README (skip, we have one)
6. Click "Create repository"

### Push to GitHub

```bash
cd "/Users/luca/Projects/lucUI CSS Framework"

# Add all files
git add .

# Initial commit
git commit -m "Initial release: lucUI CSS Framework v1.0.0"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/lucaf1-15/lucui.git

# Push to GitHub
git push -u origin main
```

## Step 2: npm Publishing Setup

### npm Login

```bash
npm login
```
Enter your npm credentials when prompted.

### Verify package.json

Ensure `package.json` has correct information:
- name: `lucui-css-framework`
- version: `1.0.0`
- description: Clear and descriptive
- repository: Your GitHub URL
- license: `MIT`

### Publish to npm

```bash
cd "/Users/luca/Projects/lucUI CSS Framework"
npm publish
```

If successful, you'll see output like:
```
+ lucui-css-framework@1.0.0
```

## Step 3: CDN Distribution

Once published to npm, jsDelivr will automatically make it available via CDN:

```
https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.css
https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.min.css
```

## Step 4: GitHub Repository Configuration

### Add Topics

Go to your GitHub repository → Settings → Topics
Add topics: `css`, `framework`, `glass-morphism`, `design-system`, `ui`, `lucui`

### Enable GitHub Pages (Optional)

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: /root
5. Save

This will host the example.html at: `https://YOUR_USERNAME.github.io/lucui/example.html`

### Add Repository Description

Go to Settings → General
Add a clear description and website URL (luca.ecosystem)

## Step 5: Update README Links

After creating your GitHub repository, update these links in README.md:

```markdown
## Distribution

### GitHub
Repository: https://github.com/YOUR_USERNAME/lucui
Download releases from: https://github.com/YOUR_USERNAME/lucui/releases
```

## Step 6: Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Release title: `lucUI CSS Framework v1.0.0`
5. Description: Copy content from CHANGELOG.md
6. Publish release

## Step 7: Verification

### Test npm installation
```bash
npm install lucui-css-framework
```

### Test CDN access
Visit: https://cdn.jsdelivr.net/npm/lucui-css-framework@1.0.0/lucUI.css

### Test GitHub Pages
Visit: https://YOUR_USERNAME.github.io/lucui/example.html

## Ongoing Maintenance

### Version Updates

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Commit changes
4. Create new Git tag: `git tag v1.0.1`
5. Push tags: `git push origin v1.0.1`
6. Create GitHub release
7. Publish to npm: `npm publish`

### Semantic Versioning

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

## Troubleshooting

### npm Publish Errors

If you get "package name already exists":
- Choose a different name in package.json
- Or contact the current maintainer

### Git Push Errors

If you get "remote already exists":
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/lucui.git
```

### CDN Not Working

CDN may take a few minutes to update after npm publish. Wait 5-10 minutes and try again.

## Support

For issues or questions:
- GitHub Issues: https://github.com/YOUR_USERNAME/lucui/issues
- Email: support@luca.ecosystem
