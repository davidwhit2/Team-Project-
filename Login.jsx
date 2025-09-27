import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { loginWithGoogleIdToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef(null);

  useEffect(() => {
    const clientId = process.env.REACT_APP_GSI_CLIENT_ID; // set in .env

    if (window.google && clientId) {
      /* global google */
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const idToken = response.credential;   // JWT ID token
          const profile = jwtDecode(idToken);    // { email, name, picture, ... }
          loginWithGoogleIdToken(idToken, profile);

          const dest = location.state?.from?.pathname || "/";
          navigate(dest, { replace: true });
        },
      });

      if (buttonRef.current) {
        google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "signin_with",
        });
      }

      google.accounts.id.prompt(); // optional One Tap
    }
  }, [loginWithGoogleIdToken, navigate, location.state]);

  return (
    <section className="container" style={{ maxWidth: 460, marginTop: 64, textAlign: "center" }}>
      <h1>Welcome to EZTech Store</h1>
      <p>Please sign in to continue.</p>
      <div ref={buttonRef} />
    </section>
  );
}
