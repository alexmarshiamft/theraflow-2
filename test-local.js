fetch('http://localhost:3000/api/licensure/parse', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileData: 'abc', mimeType: 'text/plain' }) })
  .then(res => res.json())
  .then(data => console.log("SUCCESS:", data))
  .catch(err => console.error("ERROR:", err));
