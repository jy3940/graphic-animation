# 🎨 Poster Studio - Real-Time Collaborative Editor

A shared web-based poster editor where multiple people can edit and save changes in real-time.

## Features ✨

- **Real-time Collaboration**: Multiple people editing simultaneously via WebSocket
- **Automatic Sync**: Changes from one person appear instantly to others
- **Persistent Storage**: All saves are stored on the server
- **No File Selection Needed**: Just click "Simpan HTML" to save and share changes
- **Browser-Based**: Works in any modern browser

## Setup (Local Development)

### 1. Install Node.js
- Download from https://nodejs.org/ (LTS version recommended)
- Verify: `node --version` and `npm --version` in PowerShell

### 2. Install Dependencies
```powershell
cd "c:\Users\junyu\Downloads\New folder (12)"
npm install
```

### 3. Start the Server
```powershell
npm start
```

You should see:
```
🎨 Poster Studio server running on http://localhost:3000
📡 Real-time collaboration enabled via Socket.io
```

### 4. Open in Browser
- Open http://localhost:3000 in your browser
- Repeat for multiple browsers/tabs to see real-time collaboration
- Edit the poster and click "Simpan HTML" to save

## How It Works

### For Users:
1. Open http://localhost:3000 (or your deployed URL)
2. Click "✏️ Mod Edit" to enable editing
3. Click any text on the poster to edit it
4. Click "💾 Simpan HTML" to save
5. Your changes are instantly synced to all other people viewing the same page

### Backend Flow:
- **Client connects** → Server sends current poster state
- **User saves** → Client sends updated HTML to server
- **Server updates** → Broadcasts to all connected clients
- **All clients update** → Everyone sees the new version instantly

## Deployment to Production

### Option A: Deploy to Render (Recommended for Free)

1. **Create GitHub Repository**
   - Push these files to GitHub: `server.js`, `package.json`, `Poster_Studio.html`
   - Add a `.gitignore`:
     ```
     node_modules/
     .env
     ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up (free tier available)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo

3. **Configure Render**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
   - Click "Create Web Service"

4. **Get Your URL**
   - Render will show: `https://your-app-name.onrender.com`
   - Share this with your team!

**Note**: Free tier on Render spins down after 15 minutes of inactivity. Paid tier keeps it always running.

### Option B: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Project**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Railway auto-detects Node.js and sets up deployment

3. **Get Your URL**
   - Railway shows public URL automatically
   - Share it with your team

**Cost**: Free tier included, paid plans available

### Option C: Deploy to DigitalOcean (More Control)

1. **Create DigitalOcean Account** (https://digitalocean.com)
2. **Create App Platform Project**
3. **Connect GitHub repository**
4. **Deploy** (DigitalOcean handles everything)

**Cost**: ~$5-12/month for small apps

## Multi-User Workflow

### Scenario:
- **Person A** opens http://localhost:3000
- **Person B** opens same URL in another browser
- **Person A** edits text and clicks "Simpan HTML"
- **Person B's screen instantly updates** with Person A's changes
- **Person B** can now edit the updated poster
- Everyone sees the latest version

### Important Notes:
- No git commits needed - changes saved automatically
- All changes are kept on the server
- To reset, restart the server (data is in-memory, resets on restart)

## Environment Variables

Optional `.env` file for production:
```
PORT=3000
NODE_ENV=production
```

## File Structure

```
Poster_Studio/
├── server.js           # Node.js backend
├── package.json        # Dependencies
├── Poster_Studio.html  # Client (modified for WebSocket)
└── README.md           # This file
```

## Troubleshooting

### "Cannot GET /socket.io"
- Server not running. Execute: `npm start`

### Browser shows "Not connected"
- Check firewall - ensure port 3000 is accessible
- Try: http://localhost:3000 (not 127.0.0.1)

### Changes not syncing between browsers
- Refresh both pages
- Check browser console for errors (F12)

### Server crashes on save
- Check terminal for error messages
- Restart: `npm start`

## Development Tips

### Watch for Changes
```powershell
npm install -g nodemon  # First time only
nodemon server.js       # Auto-restarts on file changes
```

### View Server Logs
The terminal shows when clients connect/disconnect and when saves happen:
```
Client connected: abc123
Poster saved by abc123
Poster updated (total edits: 1)
```

### Test Real-Time Sync
1. Open 3 browser windows
2. Edit in window 1 and save
3. Watch windows 2 and 3 update instantly ✨

## API Endpoints

### REST API
- `GET /` - Serve HTML client
- `GET /api/poster` - Get current poster state

### WebSocket Events
**Client → Server**:
- `save-poster` - Send updated HTML

**Server → Client**:
- `poster-updated` - Receive new poster state
- `save-success` - Confirmation of save
- `connect` - Connection established
- `disconnect` - Connection lost

## Future Enhancements

- [ ] Database persistence (MongoDB, PostgreSQL)
- [ ] User authentication
- [ ] Edit history / undo
- [ ] Undo/redo support
- [ ] Comment/annotation features
- [ ] Version control within app
- [ ] Export to PDF with latest edits

## License

MIT

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review server logs in terminal
3. Restart both server and browser
