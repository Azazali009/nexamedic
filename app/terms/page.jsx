import React from "react";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-10">
      <h1 className="text-2xl font-bold sm:text-5xl">
        General Terms and Conditions (GTC)
      </h1>
      <p>
        Last updated: October 2025 These General Terms and Conditions (“GTC”)
        govern all offers, contracts, and services provided by Nexamedic SA,
        hereinafter referred to as “Nexamedic,” “we,” “us,” or “our.” By
        accessing our website, purchasing our products, or using our services,
        you agree to be bound by these GTC.
      </p>
      <ul className="list-item list-decimal space-y-8">
        <li>
          <strong>Company Information</strong>
          <p>
            <span>Nexamedic SA Bernstrasse 18 2555 Brügg, Switzerland </span>
            <span>📞 Phone: +41 (0)32 552 7070</span>
            <span>✉️ Email: info@nexamedic.ch</span>
            <span>🌐 Website: www.nexamedic.ch UID: CHE-292.506.716</span>
          </p>
        </li>
        <li>
          <strong>Scope of Application</strong>
          <p>
            These GTC apply to all business relations between Nexamedic SA and
            its customers, whether individuals or legal entities, unless
            otherwise agreed in writing.
          </p>

          <p>
            By placing an order or using our services, you confirm that you have
            read, understood, and accepted these conditions.
          </p>
        </li>
        <li>
          <strong>Offers and Contract Formation</strong>
          <p>
            All offers, quotations, and price lists provided by Nexamedic
            are non-binding and subject to change without notice.
          </p>

          <p>
            A contract is formed only when Nexamedic confirms the customer’s
            order in writing (by email or electronically) or begins executing
            the service.
          </p>
        </li>
        <li>
          <strong>Prices and Payment Terms</strong>
          <p>
            All prices are stated in Swiss francs (CHF) and are exclusive of
            VAT, unless explicitly stated otherwise.
          </p>
          <p>
            Payment must be made according to the terms specified on the
            invoice. If no terms are specified, payment is due within 30 days of
            the invoice date, without deduction.
          </p>
          <p>
            In case of late payment, Nexamedic reserves the right to:
            <ul className="list-inside list-disc">
              <li>
                Charge default interest in accordance with Art. 104 of the Swiss
                Code of Obligations, and
              </li>
              <li>
                Suspend or terminate the provision of services until full
                payment is received.
              </li>
            </ul>
          </p>
        </li>
        <li>
          <strong>Delivery and Performance</strong>

          <p>
            Delivery times and performance dates are provided for guidance only
            and are not binding unless expressly guaranteed in writing.
          </p>

          <p>
            Nexamedic shall not be held liable for delays due to circumstances
            beyond its reasonable control (force majeure, supply chain issues,
            illness, strikes, technical failures, etc.).
          </p>
        </li>
        <li>
          <strong>Customer Obligations</strong>
          <p>Customers agree to:</p>
          <ul className="list-inside list-disc">
            <li>
              Provide accurate and complete information necessary for Nexamedic
              to perform its obligations,
            </li>
            <li>
              Use Nexamedic’s products or services only in compliance with
              applicable laws and regulations, and
            </li>
            <li>
              Refrain from any misuse or unlawful use of the website, software,
              or systems operated by Nexamedic.
            </li>
          </ul>
        </li>
        <li>
          <strong>Warranty and Liability</strong>
          <p>
            Nexamedic guarantees that its products and services conform to the
            agreed specifications and are provided with due care and skill.
          </p>
          <div>
            To the extent permitted by law:
            <ul className="list-inside list-disc">
              <li>
                Nexamedic excludes all other warranties, whether express or
                implied, including merchantability or fitness for a particular
                purpose.
              </li>
              <li>
                Nexamedic’s total liability for any damages, regardless of legal
                grounds, shall be limited to the total price paid for the
                product or service giving rise to the claim.
              </li>
            </ul>
            <p>
              Nexamedic is not liable for indirect, consequential, or incidental
              damages (such as loss of profit, data, or reputation)
            </p>
          </div>
        </li>
        <li>
          <strong>Intellectual Property</strong>
          <p>
            All content, trademarks, designs, data, and materials on our website
            or provided within our services are the property of Nexamedic SA or
            its licensors and are protected under Swiss and international
            copyright and intellectual property laws.
          </p>
          <p>
            No rights or licenses are granted unless explicitly authorized in
            writing by Nexamedic.
          </p>
        </li>
        <li>
          <strong>Confidentiality and Data Protection</strong>
          <p>
            Nexamedic treats all customer information as confidential and
            processes personal data in accordance with the Swiss Federal Act on
            Data Protection (FADP) and, where applicable, the EU GDPR.
          </p>
          <p>
            Please refer to our separate Privacy Policy for details on how we
            handle personal data.
          </p>
        </li>
        <li>
          <strong>Force Majeure</strong>
          <p>
            Nexamedic shall not be liable for failure or delay in performance
            caused by circumstances beyond its reasonable control, including but
            not limited to natural disasters, pandemics, government actions,
            wars, strikes, or interruptions of internet or power supply.
          </p>
        </li>
        <li>
          <strong>Termination</strong>
          <p>
            Either party may terminate the contract for just cause if the other
            party materially breaches these GTC and fails to remedy the breach
            within a reasonable time after written notice.
          </p>

          <p>
            Upon termination, any outstanding payments become immediately due.
          </p>
        </li>
        <li>
          <strong>Governing Law and Jurisdiction</strong>
          <p>
            These GTC and all related contracts shall be governed exclusively
            by Swiss law, excluding its conflict-of-law provisions and the UN
            Convention on Contracts for the International Sale of Goods (CISG).
          </p>

          <p>
            The exclusive place of jurisdiction is the competent court of the
            Canton of Vaud, Switzerland.
          </p>
        </li>

        <li>
          <strong>Severability Clause</strong>

          <p>
            If any provision of these GTC is held invalid or unenforceable, the
            remaining provisions shall remain in full force and effect. The
            invalid provision shall be replaced by a valid one that best
            reflects the original intent.
          </p>
        </li>
        <li>
          <strong>Changes to the GTC</strong>
          <p>
            Nexamedic reserves the right to modify these GTC at any time. The
            updated version will be published on our website and becomes
            effective immediately upon publication. Continued use of our
            services constitutes acceptance of the modified terms.
          </p>
        </li>
      </ul>
      <strong>© 2025 Nexamedic SA. All rights reserved.</strong>
    </div>
  );
}
