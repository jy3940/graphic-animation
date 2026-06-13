const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// File to save to
const HTML_FILE = path.join(__dirname, 'Poster_Studio.html');

// Store current poster HTML in memory
let currentPosterHtml = null;
let posterMetadata = {
  lastSavedBy: 'anonymous',
  lastSavedTime: new Date().toISOString(),
  totalEdits: 0
};

// Load HTML file on startup
fs.readFile(HTML_FILE, 'utf8', (err, data) => {
  if (err) {
    console.warn('⚠️ Could not load existing HTML file, will create new on save');
  } else {
    currentPosterHtml = data;
    console.log('✅ Loaded existing Poster_Studio.html');
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Poster_Studio.html'));
});

// API to get current poster state
app.get('/api/poster', (req, res) => {
  res.json({
    html: currentPosterHtml,
    metadata: posterMetadata
  });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send current poster to newly connected client
  socket.emit('poster-updated', {
    html: currentPosterHtml,
    metadata: posterMetadata
  });

  // Handle save event from client
  socket.on('save-poster', (data) => {
    console.log(`Poster save received from ${socket.id}`);
    
    // Write to file system
    fs.writeFile(HTML_FILE, data.html, 'utf8', (err) => {
      if (err) {
        console.error('❌ Error writing file:', err.message);
        socket.emit('save-error', { message: 'Gagal menyimpan fail: ' + err.message });
        return;
      }
      
      console.log('✅ File successfully written');
      
      // Update memory after successful write
      currentPosterHtml = data.html;
      posterMetadata.lastSavedBy = data.clientId || 'anonymous';
      posterMetadata.lastSavedTime = new Date().toISOString();
      posterMetadata.totalEdits = (posterMetadata.totalEdits || 0) + 1;
      
      // Broadcast to all connected clients
      io.emit('poster-updated', {
        html: currentPosterHtml,
        metadata: posterMetadata
      });

      // Acknowledge save
      socket.emit('save-success', {
        message: 'Fail disimpan berjaya!',
        time: posterMetadata.lastSavedTime
      });
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎨 Poster Studio server running on http://localhost:${PORT}`);
  console.log(`📡 Real-time collaboration enabled via Socket.io`);
});
