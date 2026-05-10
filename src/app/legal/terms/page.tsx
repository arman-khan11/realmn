'use client';

const sections = [
  {
    number: '01',
    title: 'GENERAL TERMS',
    content: `By accessing and placing orders on REALMN ("we", "us", "our"), you agree to be bound by these Terms & Conditions. These terms apply to all visitors, users, and customers. REALMN reserves the right to update or modify these terms at any time without prior notice. Continued use of the website after changes constitutes acceptance of the revised terms. If you do not agree to these terms, please refrain from using our services.`,
  },
  {
    number: '02',
    title: 'PRODUCTS & PRICING',
    content: `All products listed on REALMN are subject to availability. Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. REALMN reserves the right to modify product prices at any time without prior notice. Product images are for representational purposes only — slight variations in color or texture may occur due to screen calibration. We make every effort to display products as accurately as possible.`,
  },
  {
    number: '03',
    title: 'ORDER PROCESSING',
    content: `Orders placed on REALMN are subject to verification and confirmation within 24–48 hours. You will receive a WhatsApp confirmation once your order is verified. REALMN reserves the right to cancel any order at its sole discretion — including cases of suspected fraud, incorrect pricing, or product unavailability. Orders cannot be cancelled once dispatched. Please ensure your delivery address and contact details are accurate at the time of placing the order.`,
  },
  {
    number: '04',
    title: 'SHIPPING & DELIVERY',
    content: `REALMN ships across India via trusted courier partners. Standard delivery time is 5–7 business days from the date of dispatch. Delivery timelines may vary due to unforeseen circumstances such as public holidays, natural calamities, or courier delays — which are beyond our control. Shipping charges of ₹60–70 apply per order. REALMN is not liable for delays caused by incorrect address information provided by the customer.`,
  },
  {
    number: '05',
    title: 'RETURNS & REFUNDS',
    content: `We accept return requests within 7 days of delivery. Products must be unused, unwashed, and returned in their original packaging with all tags intact. Returns will not be accepted for items that show signs of use, damage, or alteration. For Cash on Delivery (COD) orders, refunds will be issued as store credit. For prepaid orders, refunds will be processed to the original payment method within 5–7 business days after the returned item is received and inspected. Shipping charges are non-refundable.`,
  },
  {
    number: '06',
    title: 'SIZING & FIT',
    content: `REALMN provides a size chart for all products. It is the customer's responsibility to refer to the size guide before placing an order. We do not accept returns or exchanges solely on the basis of size dissatisfaction if the delivered product matches the size ordered. In case of a genuine size defect or mismatch from our end, we will arrange a replacement or refund at no additional cost.`,
  },
  {
    number: '07',
    title: 'PAYMENTS',
    content: `REALMN currently accepts Cash on Delivery (COD) across India. Prepaid payment options will be available soon. For COD orders, payment is collected at the time of delivery by the courier partner. Refusal to accept a COD order after dispatch may result in the customer being blacklisted from future purchases. REALMN does not store any financial information such as bank account or card details.`,
  },
  {
    number: '08',
    title: 'PRIVACY POLICY',
    content: `REALMN collects personal information including name, mobile number, and delivery address solely for the purpose of order processing and delivery. We do not sell, trade, or share your personal data with any third party except for logistics and delivery partners. Location data collected during checkout is used exclusively to assist with accurate delivery. By placing an order, you consent to our use of your data as described in this policy. You may request deletion of your data by contacting us.`,
  },
  {
    number: '09',
    title: 'INTELLECTUAL PROPERTY',
    content: `All content on the REALMN website — including but not limited to logos, product images, text, graphics, and design — is the exclusive intellectual property of REALMN. Unauthorized reproduction, distribution, or commercial use of any content is strictly prohibited and may result in legal action. REALMN and "WEAR THE CONFIDENT" are brand identifiers owned exclusively by us.`,
  },
  {
    number: '10',
    title: 'LIMITATION OF LIABILITY',
    content: `REALMN shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our maximum liability in any dispute is limited to the purchase price of the product in question. We do not guarantee uninterrupted access to our website and are not responsible for any loss resulting from technical failures, unauthorized access, or circumstances beyond our control.`,
  },
  {
    number: '11',
    title: 'GOVERNING LAW',
    content: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts located in Uttar Pradesh, India. By using our services, you agree to submit to the personal jurisdiction of such courts.`,
  },
  {
    number: '12',
    title: 'CONTACT US',
    content: `For any queries, concerns, or support related to your order or these terms, please reach out to us via WhatsApp or email. We aim to respond to all queries within 24 hours. REALMN is committed to resolving customer concerns fairly and promptly. Your satisfaction is our priority — because at REALMN, we believe you deserve to Wear The Confident.`,
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Hero */}
      <div className="border-b-2 border-black px-6 md:px-16 py-16 md:py-24">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">REALMN / LEGAL</p>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
          TERMS &<br />CONDITIONS
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
            LAST UPDATED: MAY 2025
          </span>
          <span className="hidden md:block text-zinc-200">—</span>
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
            EFFECTIVE IMMEDIATELY
          </span>
        </div>
      </div>

      {/* Intro */}
      <div className="px-6 md:px-16 py-10 border-b border-zinc-100 max-w-3xl">
        <p className="text-sm text-zinc-500 leading-relaxed italic">
          Please read these Terms & Conditions carefully before placing an order with REALMN. 
          By using our website or placing an order, you acknowledge that you have read, 
          understood, and agree to be bound by the following terms.
        </p>
      </div>

      {/* Sections */}
      <div className="px-6 md:px-16 py-12 max-w-4xl">
        <div className="space-y-0">
          {sections.map((section, index) => (
            <div
              key={section.number}
              className="border-b border-zinc-100 py-10 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Number + Title */}
              <div className="md:col-span-4">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300">
                  SECTION {section.number}
                </span>
                <h2 className="text-xl font-black italic uppercase tracking-tight mt-1 leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <div className="md:col-span-8">
                <p className="text-[13px] text-zinc-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-black px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black italic uppercase tracking-tighter">REALMN</h3>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 mt-1">
            WEAR THE CONFIDENT.
          </p>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">
          © 2025 REALMN. ALL RIGHTS RESERVED.
        </p>
      </div>

    </div>
  );
}