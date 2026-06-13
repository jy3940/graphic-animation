# ⚡ Quick Start

## Test Locally (2 minutes)

### Step 1: Install packages
```powershell
cd "c:\Users\junyu\Downloads\New folder (12)"
npm install
```

### Step 2: Start server
```powershell
npm start
```

Expected output:
```
🎨 Poster Studio server running on http://localhost:3000
📡 Real-time collaboration enabled via Socket.io
```

### Step 3: Open in browser
- Window 1: http://localhost:3000
- Window 2: http://localhost:3000 (same URL)

### Step 4: Test real-time sync
1. In Window 1: Click "✏️ Mod Edit"
2. Edit some text
3. Click "💾 Simpan HTML"
4. Watch Window 2 update instantly! ✨

---

## Deploy to GitHub + Render (5 minutes)

### 1. Push to GitHub
```powershell
git init
git add .
git commit -m "Initial Poster Studio with real-time collaboration"
git remote add origin https://github.com/YOUR_USERNAME/poster-studio.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your `poster-studio` repo
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Click "Create Web Service"
8. Wait ~2 minutes for deployment

### 3. Share URL
- Render gives you: `https://your-app-name.onrender.com`
- Send this link to your team
- Everyone can now edit together! 🎉

---

## How to Use

### For Editors:
1. Open the link (local or deployed)
2. Click "✏️ Mod Edit" button
3. Click any text on poster to edit
4. Type your changes
5. Click "💾 Simpan HTML" to save
6. Everyone else sees your changes instantly!

### Important:
- **No login needed** - anyone with the link can edit
- **Changes are synced in real-time** - see others' edits as they happen
- **Each save persists** - next visit shows latest version

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot GET /" | Run `npm start` first |
| "Not connected" message | Restart server and browser |
| Changes don't sync | Refresh browser (F5) |
| Port 3000 already in use | `netstat -ano \| findstr :3000` then kill the process |

---

## What Changed from Original

✅ **Before**: Single person saved to file, browser download dialog
✅ **After**: Multiple people edit together, auto-save to server, real-time sync

- Added `server.js` - Node.js backend with Socket.io
- Added `package.json` - Dependencies
- Modified `Poster_Studio.html` - WebSocket client instead of file saving
- Removed file picker - not needed anymore
- Added real-time sync - everyone sees updates instantly

---

## Architecture

```
Browser 1 ──┐
            ├──→ Node.js Server (localhost:3000) ──→ Stores current poster
Browser 2 ──┤
            └──→ All edits broadcast to all browsers
Browser 3 ──┘
```

When anyone saves:
1. Client sends HTML to server
2. Server updates in-memory poster
3. Server broadcasts to all connected clients
4. All browsers display new version instantly

---

Enjoy collaborative poster editing! 🎨✨
