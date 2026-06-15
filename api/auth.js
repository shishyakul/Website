/**
 * Vercel Serverless Function — /api/auth
 *
 * PURPOSE:
 *   Acts as a secure proxy between the login form and Firebase Auth.
 *   Firebase credentials are stored in Vercel Environment Variables ONLY.
 *   They are NEVER sent to the browser or included in any JS bundle.
 *
 * REQUIRED ENVIRONMENT VARIABLES (set in Vercel Dashboard → Settings → Env Vars):
 *   FIREBASE_WEB_API_KEY   — Firebase project Web API key (from Firebase Console → Project Settings)
 *   FIREBASE_PROJECT_ID    — Firebase project ID
 *   FIREBASE_CLIENT_EMAIL  — Service account email (from downloaded service account JSON)
 *   FIREBASE_PRIVATE_KEY   — Service account private key (from downloaded service account JSON)
 *   PORTAL_URL             — e.g. https://portal.shishyakul.in
 *
 * FLOW:
 *   1. Receives { email, password } from the login form via POST
 *   2. Calls Firebase Auth REST API to verify credentials (server-side)
 *   3. On success: uses Firebase Admin SDK to create a short-lived Custom Token
 *   4. Returns a redirect URL with the custom token as a query param
 *   5. Browser redirects to portal.shishyakul.in/auth?token=<customToken>
 *   6. Portal calls signInWithCustomToken(token) to establish its own Firebase session
 */

// We will dynamically import firebase-admin inside the handler 
// to prevent Vercel cold-start crashes and catch any import errors.
let adminApp;
let adminAuth;

async function getAdminApp() {
  if (adminApp) return adminApp;

  // Dynamic imports
  const { initializeApp, getApps, cert } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');

  adminAuth = getAuth;

  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  adminApp = initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  return adminApp;
}

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
    /* ── Step 1: Verify credentials using Firebase Auth REST API ──
       This call happens entirely on the server. The WEB_API_KEY lives
       in a Vercel env var and is NEVER sent to the browser.           */
    const firebaseRestUrl =
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;

    const firebaseRes = await fetch(firebaseRestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const firebaseData = await firebaseRes.json();

    if (!firebaseRes.ok || firebaseData.error) {
      /* Map Firebase error codes to user-friendly messages */
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

    /* ── Step 2: Create a short-lived Custom Token using Admin SDK ──
       Custom tokens expire in 1 hour and are single-use by design.
       The portal will exchange this for a full Firebase session.      */
    await getAdminApp(); // Ensure app is initialised
    const customToken = await adminAuth().createCustomToken(uid);

    const portalBase = process.env.PORTAL_URL ?? 'https://portal.shishyakul.in';
    const redirectUrl = `${portalBase}/auth?token=${encodeURIComponent(customToken)}`;

    return res.status(200).json({ redirectUrl });

  } catch (err) {
    console.error('[/api/auth] Unexpected error:', err);
    return res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
}
