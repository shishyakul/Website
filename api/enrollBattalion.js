import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    let { fullName, email, phone, batch, currentStatus } = req.body;
    
    if (!fullName || !email || !phone || !batch) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    email = email.trim().toLowerCase();
    fullName = fullName.trim();

    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_WEB_API_KEY;

    // 1. Generate Secure Password
    const password = 'SS@' + Math.floor(1000 + Math.random() * 9000) + Math.random().toString(36).substring(2, 5).toUpperCase();

    // 2. Create Auth User using Identity Toolkit REST API
    const authRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    
    const authData = await authRes.json();
    if (!authRes.ok || authData.error) {
      if (authData.error?.message === 'EMAIL_EXISTS') {
         return res.status(400).json({ error: 'An account with this email already exists in Shishyakul.' });
      }
      throw new Error(authData.error?.message || 'Failed to create auth user');
    }
    
    const uid = authData.localId;

    // 3. Generate JWT for Firestore REST API
    const token = jwt.sign(
      {
        iss: clientEmail,
        sub: clientEmail,
        aud: 'https://oauth2.googleapis.com/token',
        scope: 'https://www.googleapis.com/auth/datastore'
      },
      privateKey,
      { algorithm: 'RS256', expiresIn: '1h' }
    );
    
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${token}`
    });
    
    const { access_token } = await tokenRes.json();
    if (!access_token) throw new Error('Failed to generate access token for Firestore');
    
    const timestamp = new Date().toISOString();

    // Helper to perform REST API create
    const createDoc = async (collectionName, documentId, fields) => {
      let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}`;
      if (documentId) url += `?documentId=${documentId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      });
      const result = await response.json();
      if (result.error) throw new Error(`Firestore Error (${collectionName}): ` + result.error.message);
      return result.name.split('/').pop();
    };

    // 4. Create `users` doc
    await createDoc('users', uid, {
      email: { stringValue: email },
      fullName: { stringValue: fullName },
      role: { stringValue: 'student' },
      status: { stringValue: 'passout' },
      createdAt: { timestampValue: timestamp }
    });

    // 5. Create `students` CRM doc
    const studentDocId = await createDoc('students', null, {
      studentName: { stringValue: fullName },
      name: { stringValue: fullName },
      fullName: { stringValue: fullName },
      emailId: { stringValue: email },
      contactNo: { stringValue: phone },
      batch: { stringValue: batch },
      status: { stringValue: 'passout' }, // Key for Alumni to show up properly
      battalionEnrolled: { booleanValue: true },
      createdAt: { timestampValue: timestamp }
    });

    // 6. Create `battalion_profiles` doc
    await createDoc('battalion_profiles', studentDocId, {
      uid: { stringValue: studentDocId }, // Link it directly via the CRM student ID
      fullName: { stringValue: fullName },
      batchYear: { stringValue: batch },
      currentStatus: { stringValue: currentStatus || 'Passout' },
      createdAt: { timestampValue: timestamp }
    });
    
    return res.status(200).json({ status: 'success', password });
    
  } catch (error) {
    console.error('Enroll API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
