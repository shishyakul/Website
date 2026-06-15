import jwt from 'jsonwebtoken';

async function getGoogleAccessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/identitytoolkit',
  };

  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error_description || data.error || 'Failed to get Google OAuth token');
  }
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { uid, email, password, fullName } = req.body ?? {};

  if (!uid) {
    return res.status(400).json({ error: 'User UID is required' });
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase Admin Service Account credentials missing in environment.');
    }

    // 1. Get OAuth 2.0 Access Token for Identity Toolkit
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    // 2. Build the update payload
    const updatePayload = {
      localId: uid,
    };
    if (email) updatePayload.email = email;
    if (password) updatePayload.password = password;
    if (fullName) updatePayload.displayName = fullName;

    // 3. Call the Firebase Identity Toolkit API to update the user
    const updateRes = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    });

    const updateData = await updateRes.json();

    if (!updateRes.ok || updateData.error) {
      throw new Error(updateData.error?.message || 'Failed to update user in Firebase Auth');
    }

    return res.status(200).json({ success: true, user: updateData });
  } catch (err) {
    console.error('[/api/manageUser] Unexpected error:', err);
    return res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
