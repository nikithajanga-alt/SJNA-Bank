
function Transfer() {
  return (
    <div className="page-container">
      <h1>Transfer Money</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Transfer submitted');
      }}>
        <input type="text" placeholder="Recipient Account Number" required />
        <input type="number" placeholder="Amount" min="1" required />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}

export default Transfer;
