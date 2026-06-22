import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  try {
    const data = req.body;
    
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    
    // 1. Generate JWT for Firestore REST API
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
    
    // 2. Exchange JWT for Google OAuth Access Token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${token}`
    });
    
    const { access_token } = await tokenRes.json();
    if (!access_token) throw new Error('Failed to generate access token for Firestore');
    
    // 3. Format payload for Firestore REST API (Firestore requires explicit types)
    const fields = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined || value === '') continue; // Skip empties
      if (typeof value === 'string') fields[key] = { stringValue: value };
      else if (typeof value === 'boolean') fields[key] = { booleanValue: value };
      else if (typeof value === 'number') fields[key] = { doubleValue: value };
      else if (Array.isArray(value)) fields[key] = { arrayValue: { values: value.map(v => ({ stringValue: v })) } };
      else fields[key] = { stringValue: String(value) };
    }
    
    // Auto-add server timestamp and default status for HR
    fields['createdAt'] = { timestampValue: new Date().toISOString() };
    fields['status'] = { stringValue: 'New' };

    // 4. Create Document via REST API
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/job_applications`;
    const dbRes = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    
    const dbResult = await dbRes.json();
    if (dbResult.error) {
      console.error('Firestore Error:', dbResult.error);
      return res.status(500).json({ error: 'Failed to save application to database' });
    }
    
    return res.status(200).json({ status: 'success', id: dbResult.name.split('/').pop() });
    
  } catch (error) {
    console.error('Submit API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
