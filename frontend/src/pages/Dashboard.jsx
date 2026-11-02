
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Banking Dashboard</h1>
      <p>Welcome to your Banking Transaction Simulator!</p>

      <h2>Banking Services</h2>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/deposit">Deposit</Link>
        <Link to="/withdraw">Withdraw</Link>
        <Link to="/transfer">Transfer</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Dashboard;
