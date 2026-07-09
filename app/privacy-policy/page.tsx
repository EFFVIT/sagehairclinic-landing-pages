import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

const GREEN = '#507a60'
const GOLD  = '#deb573'
const PANEL = '#f0f5f1'
const WHITE = '#ffffff'
const TEXT  = '#2c2e2b'

export default function PrivacyPolicyPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Open Sans', sans-serif", color: TEXT, background: WHITE }}>

      {/* Header */}
      <header style={{ background: WHITE, padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 4px 22.7px 0px rgba(0,0,0,0.12)' }}>
        <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: TEXT, margin: 0 }}>Sage Hair Clinic</p>
        <a href="tel:" style={{
          border: '2px solid #2e2f2a',
          color: '#2e2f2a',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          textTransform: 'uppercase' as const,
          borderRadius: 62,
          padding: '13px 20px',
          textDecoration: 'none',
          whiteSpace: 'nowrap' as const,
        }}>
          (XXX) XXX-XXXX
        </a>
      </header>

      {/* Banner */}
      <div style={{ background: PANEL, padding: '56px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: TEXT, fontSize: 40, margin: 0, lineHeight: 1.129 }}>Privacy Policy</h1>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '56px 48px' }}>

        <Heading>Last Updated: [Pending]</Heading>

        <p style={P}>
          Thank you for choosing to be part of our community at Sage Hair Clinic (&ldquo;company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <a href="mailto:info@sagehairclinic.com" style={{ color: GREEN }}>info@sagehairclinic.com</a>.
        </p>
        <p style={P}>
          When you visit our website <a href="https://www.sagehairclinic.com" style={{ color: GREEN }}>https://www.sagehairclinic.com</a> and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our websites and our services.
        </p>
        <p style={P}>
          This privacy policy applies to all information collected through our website (such as https://www.sagehairclinic.com) and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the &ldquo;Websites&rdquo;).
        </p>
        <p style={{ ...P, fontWeight: 700 }}>
          Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
        </p>

        <Heading>Table of Contents</Heading>
        <ol style={{ color: TEXT, fontSize: 15, lineHeight: 2.2, paddingLeft: 24, marginBottom: 8 }}>
          {[
            'What Information Do We Collect?',
            'How Do We Use Your Information?',
            'Will Your Information Be Shared With Anyone?',
            'Do We Use Cookies and Other Tracking Technologies?',
            'How Long Do We Keep Your Information?',
            'How Do We Keep Your Information Safe?',
            'Do We Collect Information from Minors?',
            'What Are Your Privacy Rights?',
            'Do California Residents Have Specific Privacy Rights?',
            'Do We Make Updates to This Policy?',
            'How Can You Contact Us About This Policy?',
          ].map((item) => <li key={item} style={{ textTransform: 'uppercase' as const }}>{item}</li>)}
        </ol>

        <Section title="1. What Information Do We Collect?">
          <Sub title="Personal information you disclose to us">
            <p style={PIN}><em>In Short: We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.</em></p>
            <p style={PIN}>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Websites or otherwise contacting us.</p>
            <p style={PIN}>The personal information that we collect depends on the context of your interactions with the Websites, the choices you make and us and the products and features you use. The personal information we collect can include the following:</p>
            <p style={PIN}><strong>Name and Contact Data.</strong> We may collect your first and last name, email address, postal address, phone number, and other similar contact data.</p>
            <p style={PIN}><strong>Credentials.</strong> When needed, we collect passwords, password hints, and similar security information used for authentication and account access.</p>
            <p style={PIN}><strong>Payment Data.</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by the payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions.</p>
            <p style={PIN}>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>
          </Sub>
          <Sub title="Information collected from other sources">
            <p style={PIN}><em>In Short: We may collect limited data from public databases, marketing partners, and other outside sources.</em></p>
            <p style={PIN}>We may obtain information about you from other sources, such as public databases, joint marketing partners, as well as from other third parties. Examples of the information we receive from other sources include: social media profile information; marketing leads and search results and links, including paid listings (such as sponsored links).</p>
          </Sub>
        </Section>

        <Section title="2. How Do We Use Your Information?">
          <p style={PIN}><em>In Short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</em></p>
          <p style={PIN}>We use personal information collected via our Websites for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests (&ldquo;Business Purposes&rdquo;), in order to enter into or perform a contract with you (&ldquo;Contractual&rdquo;), with your consent (&ldquo;Consent&rdquo;), and/or for compliance with our legal obligations (&ldquo;Legal Reasons&rdquo;). We indicate the specific processing grounds we rely on next to each purpose listed below.</p>
          <p style={PIN}>We use the information we collect or receive:</p>
          <p style={PIN}><strong>Fulfill and manage your orders for Contractual reasons.</strong> We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Websites.</p>
          <p style={PIN}><strong>For other Business Purposes.</strong> We may use your information for other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Websites, products, services, marketing and your experience.</p>
        </Section>

        <Section title="3. Will Your Information Be Shared With Anyone?">
          <p style={PIN}><em>In Short: We only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations.</em></p>
          <p style={PIN}>We only share and disclose your information in the following situations:</p>
          <ul style={{ color: TEXT, lineHeight: 1.9, paddingLeft: 24, fontSize: 15 }}>
            <li><strong>Compliance with Laws.</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
            <li><strong>Vital Interests and Legal Rights.</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            <li><strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Websites, which will enable them to collect data about how you interact with the Websites over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.</li>
            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With your Consent.</strong> We may disclose your personal information for any other purpose with your consent.</li>
          </ul>
        </Section>

        <Section title="4. Do We Use Cookies and Other Tracking Technologies?">
          <p style={PIN}><em>In Short: We may use cookies and other tracking technologies to collect and store your information.</em></p>
          <p style={PIN}>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="/cookie-policy" style={{ color: GREEN }}>Cookie Policy</a>.</p>
        </Section>

        <Section title="5. How Long Do We Keep Your Information?">
          <p style={PIN}><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.</em></p>
          <p style={PIN}>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>
          <p style={PIN}>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
        </Section>

        <Section title="6. How Do We Keep Your Information Safe?">
          <p style={PIN}><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
          <p style={PIN}>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the Internet itself is 100 percent secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Websites is at your own risk. You should only access the services within a secure environment.</p>
        </Section>

        <Section title="7. Do We Collect Information from Minors?">
          <p style={PIN}><em>In Short: We do not knowingly collect data from or market to children under 18 years of age.</em></p>
          <p style={PIN}>We do not knowingly solicit data from or market to children under 18 years of age. By using the Websites, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&apos;s use of the Websites. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at <a href="mailto:info@sagehairclinic.com" style={{ color: GREEN }}>info@sagehairclinic.com</a>.</p>
        </Section>

        <Section title="8. What Are Your Privacy Rights?">
          <p style={PIN}><em>In Short: You may review, change, or terminate your account at any time.</em></p>
          <p style={PIN}>If you are resident in the European Economic Area, and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You also have the right to request access to your data, correction of your data and for your data to be removed. In the event of a data breach, you will be notified within 72 hours of the time the data breach is detected. You can find the European Economic Area contact details <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noreferrer" style={{ color: GREEN }}>here</a>.</p>
          <p style={PIN}><strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Websites. To opt-out of interest-based advertising by advertisers on our Websites visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noreferrer" style={{ color: GREEN }}>www.aboutads.info/choices/</a>. For more details, see our <a href="/cookie-policy" style={{ color: GREEN }}>Cookie Policy</a>.</p>
        </Section>

        <Section title="9. Do California Residents Have Specific Privacy Rights?">
          <p style={PIN}><em>In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em></p>
          <p style={PIN}>California Civil Code Section 1798.83, also known as the &ldquo;Shine The Light&rdquo; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
          <p style={PIN}>If you are under 18 years of age, reside in California, and have a registered account with the Websites, you have the right to request removal of unwanted data that you publicly post on the Websites. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Websites, but please be aware that the data may not be completely or comprehensively removed from our systems.</p>
        </Section>

        <Section title="10. Do We Make Updates to This Policy?">
          <p style={PIN}><em>In Short: Yes, we will update this policy as necessary to stay compliant with relevant laws.</em></p>
          <p style={PIN}>We may update this privacy policy from time to time. The updated version will be indicated by an updated &ldquo;Revised&rdquo; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>
        </Section>

        <Section title="11. How Can You Contact Us About This Policy?">
          <p style={PIN}>If you have questions or comments about this policy or any further questions or comments about us or our policies, you may email us at <a href="mailto:info@sagehairclinic.com" style={{ color: GREEN }}>info@sagehairclinic.com</a> or by post to:</p>
          <address style={{ fontStyle: 'normal', color: TEXT, lineHeight: 1.9, marginTop: 12, fontSize: 15 }}>
            <strong>Sage Hair Clinic</strong><br />
            171 Amboy Ave.<br />
            Metuchen, NJ 08840
          </address>
        </Section>

        <Heading>Personal Data Management</Heading>
        <p style={P}>
          According to the Privacy Policy, you agree to share your personal data with our service. However, you still have the right to update, transfer or delete it from us at any time. If you need further management for your data, please contact us at <a href="mailto:info@sagehairclinic.com" style={{ color: GREEN }}>info@sagehairclinic.com</a>.
        </p>
      </main>

      {/* Copyright bar */}
      <div style={{ background: PANEL, textAlign: 'center', padding: '20px 48px' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: '#2c2e2b',
          textTransform: 'uppercase' as const,
          lineHeight: '30px',
          margin: 0,
        }}>
          &copy; 2026 Sage Hair Clinic &bull; <a href="/privacy-policy" style={{ color: '#2c2e2b', textDecoration: 'none' }}>Privacy Policy</a> &bull; <a href="/cookie-policy" style={{ color: '#2c2e2b', textDecoration: 'none' }}>Cookie Policy</a>
        </p>
      </div>
    </div>
  )
}

const P = { fontSize: 16, lineHeight: 1.8, color: '#2c2e2b', marginBottom: 24 }
const PIN = { fontSize: 15, lineHeight: 1.8, color: '#2c2e2b', marginBottom: 14 }

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      fontSize: 26,
      color: GOLD,
      textTransform: 'uppercase' as const,
      margin: '40px 0 20px',
    }}>
      {children}
    </h2>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 22, color: GOLD, textTransform: 'uppercase' as const, marginBottom: 16 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {children}
      </div>
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: '#2a2a34', marginBottom: 10, marginTop: 8 }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
    </div>
  )
}
