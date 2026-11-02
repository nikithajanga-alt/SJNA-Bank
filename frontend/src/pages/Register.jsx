
function Register() {
  return (
    <div className="page-container">
      <h1>Create Account</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Registration submitted');
      }}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
