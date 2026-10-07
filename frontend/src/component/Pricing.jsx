import { useState } from "react";
import { Check } from "lucide-react";
import "../css/pricing.css";

function Pricing() {

  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter Clinician",
      description:
        "For new private practices & part-time solo therapists",

      monthlyPrice: 39,
      annualPrice: 31,

      features: [
        "Up to 10 Active Patients",
        "Unlimited SOAP & DAP Notes",
        "Encrypted Telehealth HD",
        "HIPAA Business Associate Agreement"
      ],

      button: "Start 14-Day Trial",
      type: "starter"
    },

    {
      name: "Practitioner Pro",
      description:
        "Full-time clinicians requiring automated billing & outcomes",

      monthlyPrice: 89,
      annualPrice: 71,

      features: [
        "Unlimited Active Patients",
        "Automated CPT Superbill Invoicing",
        "GAD-7 / PHQ-9 Trajectory Analytics",
        "Care Packages & Retainer Engine",
        "24/7 Priority Clinical Support"
      ],

      button: "Get Started with Pro",
      type: "pro",
      popular: true
    },

    {
      name: "Group Practice / Clinic",
      description:
        "Clinics with multiple therapists, supervisors, and admins",

      monthlyPrice: 199,
      annualPrice: 159,

      features: [
        "Up to 10 Clinician Seats Included",
        "Centralized Billing & Claims Audit",
        "Supervisor Chart Co-signing",
        "Custom EHR Data Migration Assistant"
      ],

      button: "Contact Clinic Sales",
      type: "clinic"
    }
  ];


  return (
    <section className="pricingSection">

      {/* ================= HEADER ================= */}

      <div className="pricingHeader">

        <p className="pricingLabel">
          TRANSPARENT PRACTICE PRICING
        </p>

        <h2>
          Invest in Clinical Quality, Not Admin Overhead
        </h2>

        <p className="pricingSubtitle">
          Every plan includes unrestricted client accounts,
          HIPAA BAA agreement, and encrypted telehealth.
        </p>


        {/* ================= BILLING TOGGLE ================= */}

        <div className="billingToggle">

          <span
            className={!annual ? "billingActive" : ""}
          >
            Monthly Billing
          </span>


          <button
            type="button"
            className={`toggle ${annual ? "annual" : ""}`}
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle billing period"
          >
            <span></span>
          </button>


          <span
            className={annual ? "billingActive" : ""}
          >
            Annual Billing
          </span>


          <span className="saveBadge">
            Save 20%
          </span>

        </div>

      </div>


      {/* ================= PRICING CARDS ================= */}

      <div className="pricingGrid">

        {plans.map((plan) => (

          <div
            key={plan.name}
            className={`pricingCard ${plan.type}`}
          >

            {/* MOST POPULAR */}

            {plan.popular && (
              <div className="popularBadge">
                MOST POPULAR
              </div>
            )}


            <div className="pricingContent">

              <h3>
                {plan.name}
              </h3>

              <p className="planDescription">
                {plan.description}
              </p>


              {/* PRICE */}

              <div className="price">

                <span className="priceAmount">
                  ${annual
                    ? plan.annualPrice
                    : plan.monthlyPrice}
                </span>

                <span className="pricePeriod">
                  / month
                </span>

              </div>


              {/* FEATURES */}

              <div className="featureList">

                {plan.features.map((feature) => (

                  <div
                    className="pricingFeature"
                    key={feature}
                  >

                    <Check size={17} />

                    <span>
                      {feature}
                    </span>

                  </div>

                ))}

              </div>


              {/* BUTTON */}

              <button
                className="pricingButton"
              >
                {plan.button}
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Pricing;