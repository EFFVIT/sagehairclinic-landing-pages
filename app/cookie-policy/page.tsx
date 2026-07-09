import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

const GREEN = '#507a60'
const GOLD  = '#deb573'
const PANEL = '#f0f5f1'
const WHITE = '#ffffff'
const TEXT  = '#2c2e2b'

export default function CookiePolicyPage() {
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
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: TEXT, fontSize: 40, margin: 0, lineHeight: 1.129 }}>Cookie Policy</h1>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '56px 48px' }}>

        <Heading>Last Updated: [Pending]</Heading>

        <p style={P}>
          This Cookie Policy explains how Sage Hair Clinic (&ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;ours&rdquo;) uses cookies and similar technologies to recognize you when you visit our websites at (<a href="https://www.sagehairclinic.com" style={{ color: GREEN }}>https://www.sagehairclinic.com</a>). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
        <p style={P}>
          In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
        </p>

        <Heading>What Are Cookies?</Heading>
        <p style={P}>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
        <p style={P}>
          Cookies set by the website owner (in this case, https://www.sagehairclinic.com) are called &ldquo;first party cookies&rdquo;. Cookies set by parties other than the website owner are called &ldquo;third party cookies&rdquo;. Third-party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
        </p>

        <Heading>Why Do We Use Cookies?</Heading>
        <p style={P}>
          We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as &ldquo;essential&rdquo; or &ldquo;strictly necessary&rdquo; cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Websites for advertising, analytics and other purposes. This is described in more detail below.
        </p>
        <p style={P}>
          The specific types of first and third party cookies served through our Websites and the purposes they perform are described below (please note that the specific cookies served may vary depending upon the specific Online Properties you visit):
        </p>

        <Sub title="Analytics and customization cookies:">
          <p style={PIN}>These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are, or to help us customize our Websites for you.</p>
          <p style={PIN}><strong>Who serves these cookies:</strong> Google Analytics.</p>
          <p style={PIN}><strong>How to refuse:</strong> To refuse these cookies, please follow the instructions below under the heading &ldquo;How can I control cookies?&rdquo;</p>
        </Sub>

        <Sub title="Advertising cookies:">
          <p style={PIN}>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
          <p style={PIN}><strong>Who serves these cookies:</strong> Google.</p>
          <p style={PIN}><strong>How to refuse:</strong> To refuse these cookies, please follow the instructions below under the heading &ldquo;How can I control cookies?&rdquo;</p>
        </Sub>

        <Heading>What About Other Tracking Technologies, Like Web Beacons?</Heading>
        <p style={P}>
          Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called &lsquo;tracking pixels&rdquo; or &ldquo;clear gifs&rdquo;). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Websites or opened an e-mail that we have sent them. This allows us, for example, to monitor the traffic patterns of users from one page within our Websites to another, to deliver or communicate with cookies, to understand whether you have come to our Websites from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of e-mail marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and hence declining cookies will impair their functioning.
        </p>

        <Heading>Do You Use Flash Cookies or Local Shared Objects?</Heading>
        <p style={P}>
          Our Websites may also use so-called &ldquo;Flash Cookies&rdquo; (also known as Local Shared Objects or &ldquo;LSOs&rdquo;) to, among other things, collect and store information about your use of our services, fraud prevention and for other site operations.
        </p>
        <p style={P}>
          If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the Website Storage Settings Panel. You can also control Flash Cookies by going to the Global Storage Settings Panel and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies, to prevent Flash LSOs from being placed on your computer without you being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).
        </p>
        <p style={P}>
          Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.
        </p>

        <Heading>Do You Serve Targeted Advertising?</Heading>
        <p style={P}>
          Third parties may serve cookies on your computer or mobile device to serve advertising through our Websites. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details or other details that directly identify you unless you choose to provide these.
        </p>

        <Heading>How Can I Control Cookies?</Heading>
        <p style={P}>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu for more information.
        </p>
        <p style={P}>
          In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noreferrer" style={{ color: GREEN }}>www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank" rel="noreferrer" style={{ color: GREEN }}>www.youronlinechoices.com</a>.
        </p>

        <Heading>How Often Will You Update This Cookie Policy?</Heading>
        <p style={P}>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
        </p>
        <p style={P}>
          The date at the top of this Cookie Policy indicates when it was last updated.
        </p>

        <Heading>Where Can I Get Further Information?</Heading>
        <p style={P}>
          For more information on our data policies, see our <a href="/privacy-policy" style={{ color: GREEN }}>Privacy Policy</a>.
        </p>
        <p style={P}>
          If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:info@sagehairclinic.com" style={{ color: GREEN }}>info@sagehairclinic.com</a> or by post to:
        </p>
        <address style={{ fontStyle: 'normal', color: TEXT, lineHeight: 1.9, marginTop: 12, fontSize: 15 }}>
          <strong>Sage Hair Clinic</strong><br />
          171 Amboy Ave.<br />
          Metuchen, NJ 08840
        </address>
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

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#2a2a34', marginBottom: 10, marginTop: 8 }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
    </div>
  )
}
