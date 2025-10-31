import React from "react";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-10">
      <h1 className="text-2xl font-bold sm:text-5xl">Imprint</h1>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Authorized Representative</h3>
          <strong>Christoph Jäger</strong>
          <p>Position: Managing Director</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Company Registration</h3>
          <p>
            Registered in the Commercial Register of the Canton of Vaud <br />{" "}
            <br />
            Company number (UID): CHE-292.506.716 <br /> <br />
            VAT number: CHE-292.506.716 MWST
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Regulatory Information</h3>
          <p>
            Nexamedic SA operates in accordance with applicable{" "}
            <strong> Swiss federal and cantonal regulations </strong>governing
            healthcare and medical technology companies.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Liability for Content</h3>
          <p>
            The content of this website has been created with the utmost care.
            However, Nexamedic SA does not guarantee the accuracy, completeness,
            or timeliness of the information provided. We reserve the right to
            modify, update, or remove any content at any time without prior
            notice. <br /> <br />
            Liability claims against Nexamedic SA for material or immaterial
            damage resulting from access to, use of, or non-use of the published
            information, or from technical faults, are excluded to the extent
            permitted by law.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Liability for Links</h3>
          <p>
            This website may contain links to external websites. Nexamedic SA
            has no control over the content of these third-party websites and
            therefore accepts no responsibility for them. The inclusion of
            external links does not imply endorsement of their content.
            Responsibility for the content of linked pages lies solely with
            their operators.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Copyright</h3>
          <p>
            © 2025 Nexamedic SA. All rights reserved. <br /> <br />
            All content, text, images, graphics, and other materials on this
            website are protected by copyright and other intellectual property
            laws. Any reproduction, modification, or use of such materials
            beyond personal use requires the prior written consent of Nexamedic
            SA.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">Data Protection</h3>
          <p>
            Nexamedic SA complies with the provisions of the{" "}
            <strong> Swiss Federal Act on Data Protection (FADP) </strong>and,
            where applicable, the
            <strong> EU General Data Protection Regulation (GDPR).</strong>{" "}
            <br /> <br /> <br />
            For details, please see our Privacy Policy.
          </p>
        </div>
      </div>

      <strong>© 2025 Nexamedic SA. All rights reserved.</strong>
    </div>
  );
}
