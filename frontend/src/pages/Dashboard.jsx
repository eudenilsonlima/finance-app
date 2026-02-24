import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [totalBalance, setTotalBalance] = useState(0);
  const [incomeMonth, setIncomeMonth] = useState(0);
  const [expenseMonth, setExpenseMonth] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const accountsResponse = await api.get("/accounts");
    const transactionsResponse = await api.get("/transactions");

    setAccounts(accountsResponse.data);
    setTransactions(transactionsResponse.data);

    calculateDashboard(accountsResponse.data, transactionsResponse.data);
  }

  function calculateDashboard(accountsData, transactionsData) {
    const total = accountsData.reduce(
      (sum, acc) => sum + Number(acc.balance || 0),
      0,
    );

    let income = 0;
    let expense = 0;

    transactionsData.forEach((t) => {
      if (t.type === "income") income += Number(t.amount);
      if (t.type === "expense") expense += Number(t.amount);
    });

    setTotalBalance(total);
    setIncomeMonth(income);
    setExpenseMonth(expense);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Financeiro</h1>

      {/* CARDS PRINCIPAIS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Saldo Total</h3>
          <p>R$ {totalBalance.toFixed(2)}</p>
        </div>

        <div style={styles.cardIncome}>
          <h3>Receitas</h3>
          <p>R$ {incomeMonth.toFixed(2)}</p>
        </div>

        <div style={styles.cardExpense}>
          <h3>Despesas</h3>
          <p>R$ {expenseMonth.toFixed(2)}</p>
        </div>
      </div>

      {/* CONTAS */}
      <h2>Contas</h2>
      <div style={styles.grid}>
        {accounts.map((account) => (
          <div key={account.id} style={styles.accountCard}>
            <h3>{account.name}</h3>
            <p>{account.bank}</p>
            <strong>R$ {account.balance}</strong>
          </div>
        ))}
      </div>

      {/* TRANSAÇÕES */}
      <h2>Transações Recentes</h2>
      <div style={styles.transactions}>
        {transactions.map((t) => (
          <div key={t.id} style={styles.transactionItem}>
            <div>
              <strong>{t.description}</strong>
              <p>{t.transaction_date}</p>
            </div>
            <div
              style={{
                color: t.type === "income" ? "#16a34a" : "#dc2626",
                fontWeight: "bold",
              }}>
              R$ {t.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    fontFamily: "Arial",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  title: {
    marginBottom: 20,
  },
  cards: {
    display: "flex",
    gap: 20,
    marginBottom: 30,
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    width: 200,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardIncome: {
    background: "#dcfce7",
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  cardExpense: {
    background: "#fee2e2",
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  grid: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  accountCard: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    width: 220,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  transactions: {
    background: "white",
    borderRadius: 10,
    padding: 20,
  },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #eee",
  },
};

export default Dashboard;
