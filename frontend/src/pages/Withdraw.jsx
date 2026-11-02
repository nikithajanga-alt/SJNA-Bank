
function Withdraw() {
  return (
    <div className="page-container">
      <h1>Withdraw Money</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Withdrawal submitted');
      }}>
        <input type="number" placeholder="Enter Amount" min="1" required />
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;
