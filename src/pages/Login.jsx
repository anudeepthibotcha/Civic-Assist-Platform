import { useState } from "react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onLogin({
      name,
      email,
      role,
      phone,
      area
    });
  }

  function quickLogin(selectedRole) {
    const demoUsers = {
      citizen: {
        name: "Demo Citizen",
        email: "citizen@demo.com"
      },
      agent: {
        name: "Demo Agent",
        email: "agent@demo.com",
        phone: "9000000001",
        area: "Hyderabad"
      },
      admin: {
        name: "Platform Admin",
        email: "admin@demo.com"
      }
    };

    onLogin({
      ...demoUsers[selectedRole],
      role: selectedRole
    });
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">C</div>
          <span>CivicAssist</span>
        </div>

        <div className="login-content">
          <span className="eyebrow light-eyebrow">
            SIMPLIFYING PUBLIC SERVICE ACCESS
          </span>

          <h1>
            Government service assistance,
            <span> made simpler.</span>
          </h1>

          <p>
            Connect with verified service agents, get procedural
            guidance and monitor your certificate assistance
            requests from one convenient platform.
          </p>

          <div className="login-benefit">
            <span>✓</span>
            Transparent assistance charges
          </div>

          <div className="login-benefit">
            <span>✓</span>
            Verified agent workflow
          </div>

          <div className="login-benefit">
            <span>✓</span>
            Trackable service requests
          </div>
        </div>

        <small>
          Independent assistance platform. Not a government portal.
        </small>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <span className="eyebrow">WELCOME</span>

          <h2>Access your account</h2>

          <p className="muted-text">
            Select your role and enter your details.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Select user role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="citizen">Citizen</option>
                <option value="agent">Service Agent</option>
                <option value="admin">Administrator</option>
              </select>
            </label>

            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>

            {role === "agent" && (
              <>
                <label>
                  Phone number
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </label>

                <label>
                  Service area
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter city or service area"
                    required
                  />
                </label>
              </>
            )}

            <label>
              Password (demo only)
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                required
              />
            </label>

            <button
              type="submit"
              className="primary-button full-button login-submit"
            >
              Continue to Dashboard →
            </button>
          </form>

          <div className="demo-divider">
            <span>OR TRY DEMO ACCOUNTS</span>
          </div>

          <div className="demo-buttons">
            <button onClick={() => quickLogin("citizen")}>
              Citizen Demo
            </button>

            <button onClick={() => quickLogin("agent")}>
              Agent Demo
            </button>

            <button onClick={() => quickLogin("admin")}>
              Admin Demo
            </button>
          </div>

          <p className="login-disclaimer">
            Demo authentication only. Credentials are not validated.
            Connect a secure backend before real deployment.
          </p>
        </div>
      </div>
    </div>
  );
}