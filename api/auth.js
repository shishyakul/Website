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

    /* ── Step 2: Create a short-lived Custom Token manually ──
       We use jsonwebtoken instead of the massive firebase-admin SDK 
       to prevent Vercel ESM cold-start crashes. */
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      throw new Error('Firebase Admin Service Account credentials missing in environment.');
    }

    const now = Math.floor(Date.now() / 1000);
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

    return res.status(200).json({ redirectUrl });

  } catch (err) {
    console.error('[/api/auth] Unexpected error:', err);
    return res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
