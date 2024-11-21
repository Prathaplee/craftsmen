// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Scheme = require("./model/scheme");

const schemes = [
  {
    name: "Suvarna Heera",
    description: `
    * The minimum installment amount is Rs 1000.
    * Duration of the plan is 11 months.
    * GST Applicable
    `,
    type: "Monthly",
    minAmount: 1000,
    maxAmount: 200000,
    category: "diamond",
    duration: "11 months",
    duedate: "You should pay within the subscribed date of a month",
    image: "/images/diamond_scheme.jpg", // Path to image stored locally
    termsAndConditions: `
      * Maximum duration of the scheme shall be 11 months. On the 12th month, we will add 1 month pay and customers can purchase the Diamond Jewellery. Customers can choose 11 monthly installment of Rs 3000/-, Rs 5000/-, Rs 10000/-, & Rs 25000/-.
      * Payment of monthly installments can be made by cash/credit or debit card, ECS/PDC cheques in favour of CRAFTSMEN DIAMONDS. In case of dishonour of cheque, the cost incurred will be deducted from customers.
      * To avail the full benefits of the Diamond Jewellery savings plan (11+1), Members should remit the installments on or before the 10th of every month.
      * Any delay in installments will result in delay in the completion of the saving plan.
      * Customers can purchase Diamond Jewellery one month after the payment of last installments.
      * The customers who are not in position to continue to pay the monthly installments at regular intervals can purchase the Diamond Jewellery at the end of the plan period for the amount they had remitted.
      * Members are not allowed to change the plan.
      * No cash refund or purchase of Gold Jewellery or Gold Coins would be made under any circumstances, before or after the maturity of the scheme.
      * Incase customer loses the chit fund book, then in that case customer should carry receipt copy with them to proceed further.
      * No discounts or other offers can be availed under this 11 + 1 plan.
    `
  },
  {
    name: "Gold Saver",
    description: `
    * The minimum installment amount is Rs 1000.
    * Duration of the plan is 11 months.
    * GST Applicable
    `,
    type: "Monthly",
    duedate: "You should pay within the subscribed date of a month",
    minAmount: 1000,
    maxAmount: 200000,
    category: "gold",
    duration: "11 months",
    image: "/images/gold_scheme.jpg", // Path to image stored locally
    termsAndConditions: `
      * Maximum duration of the scheme shall be 11 months. On the 12th month, we will add 1 month pay, and customers can purchase the gold jewellery. Customers can choose 11 monthly installments of Rs 5000/-, Rs 10000/-, Rs 15000/-, Rs 20000/- & Rs 25000/-.
      * Payment of monthly installments can be made by cash, credit/debit card, Gpay, Phonepe, Paytm, ECS, or PDC cheques in favour of CRAFTSMEN DIAMONDS. In case of cheque dishonour, any incurred cost will be deducted from the customer's account.
      * To avail the full benefits of the Gold Jewellery saving plan (11+1), members should remit installments before the 10th of every month.
      * Any delay in installments will result in a delay in the completion date of the savings scheme plan.
      * Customers can purchase gold jewellery one month after the payment of the last installment.
      * Customers unable to continue regular monthly payments can purchase gold jewellery at the end of the plan period for the amount they have remitted.
      * No cash refunds or gold coins will be redeemed under any circumstances, before or after the scheme matures.
      * In case the customer loses the scheme card, they should carry a receipt copy or provide their Customer ID for further processing.
      * No discounts or other offers are applicable in this 11 + 1 Plan.
      * Customers can redeem both gold jewellery and diamond jewellery.
      * The gold rate applied during redemption will be based on the rate at that time.
      * Upon maturity, customers may place an order or select jewellery from a pre-designed catalogue.
      * Wastage and making charges will apply to this scheme.
    `
  }
  
  // Add other schemes here
];


mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("Connected to the database");
    
    await Scheme.deleteMany({}); // Clear existing data if needed
    await Scheme.insertMany(schemes);
    console.log("Schemes added successfully");
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Database connection error:", error);
    mongoose.connection.close();
  });
