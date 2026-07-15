import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  /* Only allow POST */
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    /* ── Step 1: Verify credentials using Firebase Auth REST API ── */
    const firebaseRestUrl =
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;

    const firebaseRes = await fetch(firebaseRestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const firebaseData = await firebaseRes.json();

    if (!firebaseRes.ok || firebaseData.error) {
      const code = firebaseData?.error?.message ?? '';
      let message = 'Invalid email or password. Please try again.';
      if (code.includes('TOO_MANY_ATTEMPTS')) {
        message = 'Too many failed attempts. Please try again later.';
      } else if (code.includes('USER_DISABLED')) {
        message = 'Your account has been disabled. Contact the Shishyakul admin.';
      }
      return res.status(401).json({ error: message });
    }

    const uid = firebaseData.localId;
    const idToken = firebaseData.idToken;

    /* ── Fetch user role from Firestore REST API using Admin Service Account ── */
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      throw new Error('Firebase Admin Service Account credentials missing in environment.');
    }

    const now = Math.floor(Date.now() / 1000);
    const authPayload = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };
    const adminJwt = jwt.sign(authPayload, privateKey, { algorithm: 'RS256' });

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${adminJwt}`
    });
    
    if (!tokenRes.ok) {
      throw new Error('Failed to generate Admin Access Token');
    }
    const { access_token } = await tokenRes.json();

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`;
    const fsRes = await fetch(firestoreUrl, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    if (!fsRes.ok) {
      const fsErrText = await fsRes.text();
      console.error('Firestore Error:', fsRes.status, fsErrText, firestoreUrl);
      return res.status(401).json({ error: `Could not retrieve user profile.` });
    }
    
    const fsData = await fsRes.json();
    const role = fsData?.fields?.role?.stringValue;
    
    const allowedPortalRoles = ['admin', 'branch_manager', 'service_manager', 'frontend_desk_manager', 'inventory_manager', 'teacher', 'student'];
    if (!allowedPortalRoles.includes(role)) {
      return res.status(403).json({ error: 'This email belongs to the Core Team. Please log in at shaitansquad.vercel.app' });
    }

    /* ── Step 2: Create a short-lived Custom Token manually ──
       We use jsonwebtoken instead of the massive firebase-admin SDK 
       to prevent Vercel ESM cold-start crashes. */
    const payload = {
      iss: clientEmail,
      sub: clientEmail,
      aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
      iat: now,
      exp: now + 3600, // 1 hour expiration
      uid: uid,
    };

    const customToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    /* ── Step 3: Redirect to portal with the token ── */
    const portalBase = process.env.PORTAL_URL ?? 'https://portal.shishyakul.in';
    const redirectUrl = `${portalBase}/auth?token=${encodeURIComponent(customToken)}`;

    return res.status(200).json({ redirectUrl, customToken });

  } catch (err) {
    console.error('[/api/auth] Unexpected error:', err);
    return res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
