import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

type TransactionType = "Income" | "Expense";

type Transaction = {
  id: number;
  date: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
};

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-10-01",
    type: "Income",
    category: "Salary",
    description: "Monthly salary",
    amount: 75000,
  },
  {
    id: 2,
    date: "2026-10-02",
    type: "Expense",
    category: "Food",
    description: "Groceries",
    amount: 4500,
  },
  {
    id: 3,
    date: "2026-10-03",
    type: "Expense",
    category: "Transport",
    description: "Fuel",
    amount: 2500,
  },
  {
    id: 4,
    date: "2026-10-04",
    type: "Expense",
    category: "Bills",
    description: "Electricity bill",
    amount: 3200,
  },
  {
    id: 5,
    date: "2026-10-05",
    type: "Expense",
    category: "Shopping",
    description: "Household items",
    amount: 2800,
  },
  {
    id: 6,
    date: "2026-09-28",
    type: "Income",
    category: "Freelance",
    description: "Freelance project",
    amount: 12000,
  },
  {
    id: 7,
    date: "2026-09-29",
    type: "Expense",
    category: "Entertainment",
    description: "Movie and dinner",
    amount: 1800,
  },
];

const pieColors = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];

function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "reports">(
    "dashboard",
  );

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [monthFilter, setMonthFilter] = useState("2026-10");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [form, setForm] = useState({
    date: "2026-10-06",
    type: "Expense" as TransactionType,
    category: "Food",
    description: "",
    amount: "",
  });

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

  const expenseByCategory = useMemo(() => {
    const grouped: Record<string, number> = {};

    transactions
      .filter((item) => item.type === "Expense")
      .forEach((item) => {
        grouped[item.category] = (grouped[item.category] || 0) + item.amount;
      });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const months = ["Sep", "Oct"];

    return months.map((month) => {
      const monthNumber = month === "Sep" ? "09" : "10";

      const income = transactions
        .filter(
          (item) =>
            item.date.startsWith(`2026-${monthNumber}`) &&
            item.type === "Income",
        )
        .reduce((sum, item) => sum + item.amount, 0);

      const expense = transactions
        .filter(
          (item) =>
            item.date.startsWith(`2026-${monthNumber}`) &&
            item.type === "Expense",
        )
        .reduce((sum, item) => sum + item.amount, 0);

      return {
        month,
        income,
        expense,
      };
    });
  }, [transactions]);

  const filteredTransactions = transactions.filter((item) => {
    const matchesMonth = monthFilter === "All" || item.date.startsWith(monthFilter);
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesType = typeFilter === "All" || item.type === typeFilter;

    return matchesMonth && matchesCategory && matchesType;
  });

  const reportIncome = filteredTransactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const reportExpense = filteredTransactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const addTransaction = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.amount || Number(form.amount) <= 0 || !form.description) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      date: form.date,
      type: form.type,
      category: form.category,
      description: form.description,
      amount: Number(form.amount),
    };

    setTransactions((current) => [newTransaction, ...current]);

    setForm((current) => ({
      ...current,
      description: "",
      amount: "",
    }));
  };

  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>
          <h1>FinTrack Dashboard</h1>
          <p className="subtitle">
            Track your income, expenses and monthly savings in one place.
          </p>
        </div>

        <div className="nav">
          <button
            className={activeView === "dashboard" ? "nav-button active" : "nav-button"}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activeView === "reports" ? "nav-button active" : "nav-button"}
            onClick={() => setActiveView("reports")}
          >
            Reports
          </button>
        </div>
      </header>

      <main className="container">
        {activeView === "dashboard" ? (
          <>
            <section className="cards">
              <div className="card">
                <span>Total Income</span>
                <strong>{formatCurrency(totalIncome)}</strong>
                <small>All recorded income</small>
              </div>

              <div className="card">
                <span>Total Expenses</span>
                <strong>{formatCurrency(totalExpense)}</strong>
                <small>All recorded expenses</small>
              </div>

              <div className="card">
                <span>Current Balance</span>
                <strong>{formatCurrency(balance)}</strong>
                <small>Income minus expenses</small>
              </div>

              <div className="card">
                <span>Savings Rate</span>
                <strong>{savingsRate}%</strong>
                <small>Percentage of income saved</small>
              </div>
            </section>

            <section className="grid-two">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Expense Breakdown</h2>
                    <p>Expenses grouped by category</p>
                  </div>
                </div>

                <div className="chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseByCategory}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {expenseByCategory.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2>Monthly Overview</h2>
                    <p>Income versus expenses</p>
                  </div>
                </div>

                <div className="chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                      <Legend />
                      <Bar dataKey="income" name="Income" />
                      <Bar dataKey="expense" name="Expense" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Recent Transactions</h2>
                  <p>Latest income and expense records</p>
                </div>
              </div>

              <TransactionTable transactions={transactions.slice(0, 6)} />
            </section>

            <section className="panel form-panel">
              <div className="panel-header">
                <div>
                  <h2>Add Transaction</h2>
                  <p>Add a new income or expense record</p>
                </div>
              </div>

              <form className="transaction-form" onSubmit={addTransaction}>
                <label>
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                  />
                </label>

                <label>
                  Type
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        type: event.target.value as TransactionType,
                      })
                    }
                  >
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </label>

                <label>
                  Category
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Bills</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                    <option>Salary</option>
                    <option>Freelance</option>
                  </select>
                </label>

                <label>
                  Amount
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={(event) =>
                      setForm({ ...form, amount: event.target.value })
                    }
                  />
                </label>

                <label className="description-field">
                  Description
                  <input
                    type="text"
                    placeholder="Example: Grocery shopping"
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                  />
                </label>

                <button className="add-button" type="submit">
                  + Add Transaction
                </button>
              </form>
            </section>
          </>
        ) : (
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Transaction Reports</h2>
                <p>Filter transactions and review detailed results.</p>
              </div>
            </div>

            <div className="filters">
              <label>
                Month
                <select
                  value={monthFilter}
                  onChange={(event) => setMonthFilter(event.target.value)}
                >
                  <option value="All">All Months</option>
                  <option value="2026-10">October 2026</option>
                  <option value="2026-09">September 2026</option>
                </select>
              </label>

              <label>
                Category
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                >
                  <option>All</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Bills</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Salary</option>
                  <option>Freelance</option>
                </select>
              </label>

              <label>
                Type
                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                >
                  <option>All</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </label>
            </div>

            <div className="report-summary">
              <div>
                <span>Filtered Income</span>
                <strong>{formatCurrency(reportIncome)}</strong>
              </div>

              <div>
                <span>Filtered Expenses</span>
                <strong>{formatCurrency(reportExpense)}</strong>
              </div>

              <div>
                <span>Filtered Balance</span>
                <strong>{formatCurrency(reportIncome - reportExpense)}</strong>
              </div>

              <div>
                <span>Transactions</span>
                <strong>{filteredTransactions.length}</strong>
              </div>
            </div>

            <TransactionTable transactions={filteredTransactions} />
          </section>
        )}
      </main>

      <footer>
        <p>FinTrack • Streamhub Section A Web Application</p>
      </footer>
    </div>
  );
}

function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span
                    className={
                      transaction.type === "Income"
                        ? "badge income"
                        : "badge expense"
                    }
                  >
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td
                  className={
                    transaction.type === "Income"
                      ? "amount income-text"
                      : "amount expense-text"
                  }
                >
                  {transaction.type === "Income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;