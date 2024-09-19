export default function ExpenseBarItem({
  item: { title, balance },
}: {
  item: { id: number; title: string; balance: JSX.Element };
}) {
  return (
    <div className="expense-bar-item">
      <h3>{title}</h3>
      <h1>{balance}</h1>
    </div>
  );
}
