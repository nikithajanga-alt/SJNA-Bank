
import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("Guest");
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(25000);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [activePanel, setActivePanel] = useState("");
const [submitted, setSubmitted] = useState(false);

  const addTransaction = (type, amount, details) => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (value > 1000000) {
      setMessage("Maximum demo transaction amount is ₹10,00,000.");
      return;
    }

    if (["Withdraw", "Transfer", "Payment"].includes(type) && value > balance) {
      setMessage("Insufficient balance!");
      return;
    }

    const newBalance =
      type === "Deposit" ? balance + value : balance - value;

    setBalance(newBalance);

    setTransactions((old) => [
      {
        id: Date.now(),
        type,
        amount: value,
        details,
        date: new Date().toLocaleString(),
      },
      ...old,
    ]);

    setMessage(`${type} successful!`);
  };

  const navigate = (target) => {
    setPage(target);
    setMessage("");
    window.scrollTo(0, 0);
  };

  const handleAuth = (e, type) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (type === "Register") {
      setUser(data.get("name"));
    } else {
      setUser(data.get("email").split("@")[0]);
    }

    setLoggedIn(true);
    navigate("accounts");
  };

  const Header = () => (
    <>
      <div className="topbar">
        <span>♢ Secure Demo Banking</span>
        <div className="top-links">
  <button onClick={() => {
    navigate("help");
    setSubmitted(false);
  }}>
    Help & Support
  </button>

  <span>|</span>

  <button onClick={() => {
    navigate("contact");
    setSubmitted(false);
  }}>
    Contact Us
  </button>
</div>
      </div>

      <header className="header">
        <div className="brand" onClick={() => navigate("home")}>
          <div className="brand-icon">♜</div>
          <div>
            <h1>SJNA <span>Bank</span></h1>
            <small>Sruthi · Jagathi · Nikitha · Akshaya</small>
          </div>
        </div>

        <nav>
          {[
            ["Home", "home"],
            ["Accounts", "accounts"],
            ["Transfers", "transfer"],
            ["Payments", "payments"],
            ["Services", "transactions"],
          ].map(([name, target]) => (
            <button
              key={target}
              className={page === target ? "nav-active" : ""}
              onClick={() => navigate(target)}
            >
              {name}⌄
            </button>
          ))}
        </nav>

        <div className="auth-buttons">
          {loggedIn ? (
            <button className="login-btn" onClick={() => navigate("profile")}>
              ♙ {user}
            </button>
          ) : (
            <button className="login-btn" onClick={() => navigate("login")}>
              ♙ Log In
            </button>
          )}
          <button className="register-btn" onClick={() => navigate("register")}>
            Register
          </button>
        </div>
      </header>
    </>
  );

  const Feature = ({ icon, title, target }) => (
    <button className="feature" onClick={() => navigate(target)}>
      <span>{icon}</span>
      <strong>{title}</strong>
    </button>
  );

  const MoneyForm = ({ title, type, extra }) => (
    <div className="content-card">
      <h2>{title}</h2>
      <p className="muted">Current available balance: ₹{balance.toLocaleString("en-IN")}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const details = extra
            ? data.get("details")
            : "Bank transaction";
          addTransaction(type, data.get("amount"), details);
          e.target.reset();
        }}
      >
        {extra && (
          <input
            name="details"
            placeholder={extra}
            required
          />
        )}

        <input
          name="amount"
          type="number"
          placeholder="Enter amount (₹)"
          min="1"
          step="0.01"
          required
        />

        <button className="gold-btn" type="submit">
          {title}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );

  const Home = () => (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO SJNA BANK</span>
          <h2>Online Banking<br />Transaction Simulator</h2>
          <p>
            A secure and realistic banking platform to simulate
            real-world transactions, manage accounts, and explore
            core banking services.
          </p>
          <div className="hero-actions">
            <button className="gold-btn" onClick={() => navigate("register")}>
              Get Started →
            </button>
            <button className="outline-btn" onClick={() => navigate("accounts")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="bank-building">
            <div className="bank-symbol">♜</div>
            <h2>SJNA Bank</h2>
            <p>TRUST · SECURITY · SERVICE</p>
          </div>
        </div>
      </section>

      <section className="features">
        <Feature icon="♙" title="Account Management" target="accounts" />
        <Feature icon="⇄" title="Fund Transfer" target="transfer" />
        <Feature icon="▤" title="Bill Payments" target="payments" />
        <Feature icon="▤" title="Transaction History" target="transactions" />
        <Feature icon="⚙" title="Profile Settings" target="profile" />
      </section>

      <section className="welcome-section">
        <span className="eyebrow">BANKING MADE SIMPLE</span>
        <h2>Everything you need in one place</h2>
        <p>Explore the services available in your SJNA Bank simulator.</p>
        <div className="service-grid">
          <Feature icon="＋" title="Deposit Money" target="deposit" />
          <Feature icon="↓" title="Withdraw Money" target="withdraw" />
          <Feature icon="⇄" title="Transfer Funds" target="transfer" />
          <Feature icon="▣" title="Make Payments" target="payments" />
        </div>
      </section>
    </>
  );

  const Accounts = () => (
    <section className="page-section">
      <h2>My Account</h2>
      <div className="balance-card">
        <p>Available Account Balance</p>
        <h1>₹{balance.toLocaleString("en-IN")}</h1>
        <span>Account: SJNA-DEMO-001</span>
      </div>
      <div className="service-grid">
        <Feature icon="＋" title="Deposit" target="deposit" />
        <Feature icon="↓" title="Withdraw" target="withdraw" />
        <Feature icon="⇄" title="Transfer" target="transfer" />
        <Feature icon="▤" title="History" target="transactions" />
      </div>
    </section>
  );

  const Transactions = () => (
    <section className="page-section">
      <h2>Transaction History</h2>
      <div className="content-card">
        {transactions.length === 0 ? (
          <p>No transactions yet. Start by making a deposit or transfer.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.type}</td>
                    <td>{t.details}</td>
                    <td>₹{t.amount.toLocaleString("en-IN")}</td>
                    <td>{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  const Auth = ({ type }) => (
    <section className="page-section">
      <div className="content-card auth-card">
        <h2>{type === "login" ? "Welcome Back" : "Create Your SJNA Account"}</h2>
        <p className="muted">
          {type === "login" ? "Login to your demo account" : "Register for the banking simulator"}
        </p>
        <form onSubmit={(e) => handleAuth(e, type === "login" ? "Login" : "Register")}>
          {type === "register" && (
            <input name="name" placeholder="Full Name" required />
          )}
          <input name="email" type="email" placeholder="Email Address" required />
          <input name="password" type="password" placeholder="Password" required />
          <button className="gold-btn" type="submit">
            {type === "login" ? "Log In" : "Register"}
          </button>
        </form>
        <p className="muted">Demo only. Do not enter real banking credentials.</p>
      </div>
    </section>
  );

  const Profile = () => (
    <section className="page-section">
      <div className="content-card">
        <h2>My Profile</h2>
        <div className="profile-icon">♙</div>
        <h3>{user}</h3>
        <p>Account Number: SJNA-DEMO-001</p>
        <p>Account Type: Savings (Demo)</p>
        <p>Balance: ₹{balance.toLocaleString("en-IN")}</p>
        <button className="outline-btn" onClick={() => {
          setLoggedIn(false);
          setUser("Guest");
          navigate("home");
        }}>
          Log Out
        </button>
      </div>
    </section>
  );

  let content;

  switch (page) {
    case "accounts": content = <Accounts />; break;
    case "deposit": content = <MoneyForm title="Deposit Money" type="Deposit" />; break;
    case "withdraw": content = <MoneyForm title="Withdraw Money" type="Withdraw" />; break;
    case "transfer": content = <MoneyForm title="Transfer Money" type="Transfer" extra="Recipient account number" />; break;
    case "payments": content = <MoneyForm title="Bill Payments" type="Payment" extra="Biller name or reference" />; break;
    case "transactions": content = <Transactions />; break;
    case "login": content = <Auth type="login" />; break;
    case "register": content = <Auth type="register" />; break;
    case "profile": content = <Profile />; break;
    case "help": content = (
  <div className="info-page">
    <h1>Help & Support</h1>
    <p>Welcome to SJNA Bank Support.</p>
    <h3>Frequently Asked Questions</h3>
    <p><b>1. How do I register?</b> Click Register and complete the form.</p>
    <p><b>2. How do I transfer money?</b> Log in and select Transfers.</p>
    <p><b>3. How do I check transactions?</b> Open Transaction History.</p>
    <h3>Need more help?</h3>
    <p>Email: support@sjnabank.demo</p>
    <p>Phone: +91 98765 43210</p>
  </div>
); break;

case "contact": content = (
  <div className="info-page">
    <h1>Contact Us</h1>
    <p>Get in touch with SJNA Bank.</p>
    <form onSubmit={(e) => {
      e.preventDefault();
      alert("Thank you! Your message has been submitted.");
      e.target.reset();
    }}>
      <input placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <input placeholder="Subject" required />
      <textarea placeholder="Your Message" required />
      <button type="submit">Send Message</button>
    </form>
  </div>
); break;
    default: content = <Home />;
  }

  return (
    <div className="app">
      <Header />
      <main>{content}</main>
      <footer>
        <h2>SJNA <span>Bank</span></h2>
        <p>Online Banking Transaction Simulator</p>
        <p>Educational demo only · No real money or bank accounts are involved.</p>
        <p>© 2026 SJNA Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

