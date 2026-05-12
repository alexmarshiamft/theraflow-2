const http = require('http');

async function runTests() {
  console.log("🚀 Starting Comprehensive API System Test...\n");

  const results = {
    gemini: 'PENDING',
    chime: 'PENDING',
    webhooks: 'PENDING',
  };

  // 1. Test Gemini API (/api/gemini)
  try {
    process.stdout.write("Testing /api/gemini (Gemini 3.1 Flash)... ");
    const res = await fetch('http://127.0.0.1:3000/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: "Hello, this is an automated test. Respond with OK." })
    });
    const data = await res.json();
    if (res.ok && data.text) {
      console.log("✅ PASS");
      results.gemini = 'PASS';
    } else {
      console.log("❌ FAIL", data);
      results.gemini = 'FAIL';
    }
  } catch (e) {
    console.log("❌ ERROR", e.message);
    results.gemini = 'ERROR';
  }

  // 2. Test AWS Chime API (/api/chime)
  try {
    process.stdout.write("Testing /api/chime (AWS Telehealth WebRTC)... ");
    const res = await fetch('http://127.0.0.1:3000/api/chime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "create" })
    });
    const data = await res.json();
    if (res.ok && data.Meeting && data.Attendee) {
      console.log("✅ PASS");
      results.chime = 'PASS';
    } else {
      console.log("❌ FAIL", data);
      results.chime = 'FAIL';
    }
  } catch (e) {
    console.log("❌ ERROR", e.message);
    results.chime = 'ERROR';
  }

  // 3. Test Webhooks Receiver (/api/webhooks)
  try {
    process.stdout.write("Testing /api/webhooks (Enterprise Integrations)... ");
    const res = await fetch('http://127.0.0.1:3000/api/webhooks?uid=test_system_id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: "test.event", payload: "System diagnostics" })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log("✅ PASS");
      results.webhooks = 'PASS';
    } else {
      console.log("❌ FAIL", data);
      results.webhooks = 'FAIL';
    }
  } catch (e) {
    console.log("❌ ERROR", e.message);
    results.webhooks = 'ERROR';
  }

  console.log("\n📊 Test Summary:");
  console.table(results);
}

runTests();
