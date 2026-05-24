firebase.initializeApp({
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
});
  
  const db = firebase.database();
  let motionEvents = 0;
  let lastMotionTime = null;
  
  function drawRing(id, pct, color, track, size) {
    const c = document.getElementById(id); if (!c) return;
    const ctx = c.getContext('2d');
    const s = size || 50, lw = 10;
    ctx.clearRect(0, 0, s * 2, s * 2);
    ctx.beginPath(); ctx.arc(s, s, s - lw / 2 - 2, 0, Math.PI * 2);
    ctx.strokeStyle = track; ctx.lineWidth = lw; ctx.stroke();
    if (pct > 0) {
      ctx.beginPath();
      ctx.arc(s, s, s - lw / 2 - 2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(pct, 1));
      ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke();
    }
  }
  
  // 1. Sensors Listener
  db.ref('Home/Sensors').on('value', snap => {
    const d = snap.val(); if (!d) return;
    
    // Temp/Hum
    const temp = parseFloat(d.Temperature) || 0;
    const hum = parseFloat(d.Humidity) || 0;
    document.getElementById('tempVal').textContent = Math.round(temp);
    document.getElementById('humVal').textContent = Math.round(hum);
    
    const tc = temp > 35 ? '#f87171' : temp < 15 ? '#93c5fd' : '#f472b6';
    drawRing('tempRing', temp / 50, tc, 'rgba(255,190,215,.5)', 50);
    document.getElementById('tempStatus').textContent = temp > 35 ? 'Too hot!' : temp < 18 ? 'Cool — check heating' : 'Comfortable range';
    
    drawRing('humRing', hum / 100, '#34d399', 'rgba(175,240,205,.5)', 50);
    document.getElementById('humStatus').textContent = hum > 70 ? 'High - ventilate' : hum < 30 ? 'Dry air' : 'Optimal humidity';
  
    // Motion Logic
    const dot = document.getElementById('motionDot');
    if (d.Motion == 1) {
      dot.className = 'mdot alert';
      document.getElementById('motionTxt').textContent = 'Motion detected!';
      document.getElementById('motionSub').textContent = 'Just now';
      motionEvents++;
      lastMotionTime = new Date();
      document.getElementById('eventsToday').textContent = motionEvents;
      document.getElementById('lastSeen').textContent = '0m';
    } else {
      dot.className = 'mdot';
      document.getElementById('motionTxt').textContent = 'No activity detected';
      document.getElementById('motionSub').textContent = 'Scanning perimeter...';
    }
  });
  
  // 2. Alert Listener
  db.ref('Home/Alert').on('value', snap => {
    let raw = String(snap.val() || "NORMAL");
    const ok = raw.toUpperCase().includes('NORMAL');
    
    document.getElementById('sysBadge').className = ok ? 'sys-badge' : 'sys-badge danger';
    document.getElementById('sysText').textContent = ok ? 'All systems normal' : 'GAS ALERT!';
    
    const txt = document.getElementById('gasTxt');
    const fill = document.getElementById('gasFill');
    txt.className = ok ? 'gas-status' : 'gas-status danger';
    txt.textContent = ok ? 'Normal - No threats detected' : raw + ' - check immediately!';
    fill.className = ok ? 'gas-fill' : 'gas-fill danger';
    fill.style.width = ok ? '18%' : '88%';
  });
  
  // 3. Controls
  function toggleDevice(name, on) {
    db.ref('Home/Control/' + name).set(on ? 1 : 0);
  }
  
  db.ref('Home/Control/Light').on('value', snap => {
    const on = snap.val() === 1;
    document.getElementById('lightTog').checked = on;
    document.getElementById('lightState').textContent = on ? 'Active' : 'Inactive';
    document.getElementById('lightState').className = 'ctrl-state' + (on ? ' on' : '');
  });
  
  db.ref('Home/Control/Fan').on('value', snap => {
    const on = snap.val() === 1;
    document.getElementById('fanTog').checked = on;
    document.getElementById('fanState').textContent = on ? 'Active' : 'Inactive';
    document.getElementById('fanState').className = 'ctrl-state' + (on ? ' on' : '');
  });
  
  // 4. Clock and Timer Updater
  setInterval(() => {
    const n = new Date();
    document.getElementById('clock').textContent = n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('dateLbl').textContent = n.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Keep last motion timer updating
    if (lastMotionTime) {
      const m = Math.round((n - lastMotionTime) / 60000);
      document.getElementById('lastSeen').textContent = m + 'm';
    }
  }, 1000);