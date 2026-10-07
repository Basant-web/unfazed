import {
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Receipt,
  Plus
} from "lucide-react";



import "../css/clientPayments.css";

function ClientPayments() {

  async function purchasePackage(packageId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/client-packages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          packageId: packageId,
          clientId: localStorage.getItem("userId")
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Package purchase failed");
      return;
    }

    console.log("Purchased package:", data.clientPackage);

    alert("Package purchased successfully");

  } catch (error) {
    console.log("Purchase package error:", error);
  }
}

  const transactions = [
    {
      date: "Aug 28, 2026",
      description: "Individual Therapy Session",
      therapist: "Dr. Sarah Sharma",
      amount: "₹1,500",
      status: "Paid"
    },
    {
      date: "Aug 21, 2026",
      description: "Individual Therapy Session",
      therapist: "Dr. Sarah Sharma",
      amount: "₹1,500",
      status: "Paid"
    },
    {
      date: "Aug 14, 2026",
      description: "Follow-up Session",
      therapist: "Dr. Sarah Sharma",
      amount: "₹1,200",
      status: "Paid"
    },
    {
      date: "Aug 07, 2026",
      description: "Individual Therapy Session",
      therapist: "Dr. Sarah Sharma",
      amount: "₹1,500",
      status: "Pending"
    }
  ];

  return (
    <section className="clientPayments">

      {/* HEADER */}
      <div className="clientPaymentsHeader">
        <div>
          <h1>Payments</h1>
          <p>Manage your payments, invoices and billing history.</p>
        </div>

        <button className="addPaymentButton">
          <Plus size={17} />
          Add Payment Method
        </button>
      </div>


      {/* PAYMENT SUMMARY */}
      <div className="paymentSummary">

        <div className="paymentSummaryCard">
          <div className="paymentSummaryIcon">
            <CreditCard size={21} />
          </div>

          <div>
            <span>Total Spent</span>
            <strong>₹18,000</strong>
            <small>All sessions</small>
          </div>
        </div>


        <div className="paymentSummaryCard">
          <div className="paymentSummaryIcon">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Paid</span>
            <strong>₹16,500</strong>
            <small>11 transactions</small>
          </div>
        </div>


        <div className="paymentSummaryCard">
          <div className="paymentSummaryIcon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>₹1,500</strong>
            <small>1 transaction</small>
          </div>
        </div>

      </div>


      {/* PAYMENT METHOD */}
      <div className="paymentMethodSection">

        <div className="paymentSectionHeader">
          <div>
            <h2>Payment Method</h2>
            <p>Your saved payment method</p>
          </div>

          <button className="editPaymentButton">
            Edit
          </button>
        </div>


        <div className="savedPaymentCard">

          <div className="savedCardIcon">
            <CreditCard size={22} />
          </div>

          <div className="savedCardInfo">
            <strong>Visa ending in 4242</strong>
            <span>Expires 08/28</span>
          </div>

          <span className="defaultPaymentBadge">
            Default
          </span>

        </div>

      </div>


      {/* TRANSACTIONS */}
      <div className="transactionsSection">

        <div className="paymentSectionHeader">

          <div>
            <h2>Payment History</h2>
            <p>Your recent transactions</p>
          </div>

          <button className="downloadStatementButton">
            <Download size={16} />
            Download Statement
          </button>

        </div>


        <div className="transactionsTable">

          <div className="transactionTableHeader">
            <span>Date</span>
            <span>Description</span>
            <span>Therapist</span>
            <span>Amount</span>
            <span>Status</span>
            <span></span>
          </div>


          {transactions.map((transaction, index) => (

            <div className="transactionRow" key={index}>

              <span className="transactionDate">
                {transaction.date}
              </span>

              <div className="transactionDescription">
                <Receipt size={16} />
                <span>{transaction.description}</span>
              </div>

              <span>
                {transaction.therapist}
              </span>

              <strong className="transactionAmount">
                {transaction.amount}
              </strong>

              <span
                className={
                  transaction.status === "Paid"
                    ? "paymentPaidBadge"
                    : "paymentPendingBadge"
                }
              >
                {transaction.status}
              </span>

              <button className="invoiceButton">
                <Download size={16} />
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ClientPayments;