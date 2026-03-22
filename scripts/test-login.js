/**
 * Automated Login Test
 * This script verifies that both regular users (RUT) and companies (Name)
 * can log in using the same credentials provided in the seed data.
 */

async function testLogin(username, password, label) {
  console.log(`Testing ${label}...`);
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.success) {
      console.log(`✅ SUCCESS: ${label} logged in correctly.`);
      console.log(`   User: ${data.user.name} (${data.user.role})`);
    } else {
      console.log(`❌ FAILED: ${label} login failed.`);
      console.log(`   Message: ${data.message}`);
    }
  } catch (error) {
    console.log(`❌ ERROR: Could not connect to server for ${label}.`);
  }
  console.log('-----------------------------------');
}

async function runTests() {
  console.log('Starting Automated Login Tests...\n');

  // Test 1: User with RUT format (dots/dashes)
  await testLogin('12.345.678-9', 'admin123', 'Regular User (Formatted RUT)');

  // Test 2: User with RUT format (plain digits)
  await testLogin('123456789', 'admin123', 'Regular User (Plain RUT)');

  // Test 3: Company with Name
  await testLogin('Casona Nueva', 'admin123', 'Company Admin');

  // Test 4: Wrong password
  await testLogin('12345678-9', 'wrongpass', 'Invalid Password Check');
}

runTests();
