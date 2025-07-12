import ContentBox from "../components/ContentBox";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  // Document title
  useDocumentTitle("Privacy policy");
  return (
    <PageContent className="dark">
      <Section animation={false} title="Privacy policy" spaceBottom={true}>
        <ContentBox>
          <h2>Introduction</h2>
          <p>
            This Privacy Policy describes how HepDex, Inc. ("HepDex", "we",
            "our", "us") collects and processes personal information. HepDex
            respects your privacy and is committed to protecting it through our
            compliance with this Privacy Policy.
          </p>
          <p>
            By using our site, you consent to this Privacy Policy. If you do not
            consent to the collection and processing of your information in
            accordance with this Privacy Policy, we are unable to provide you
            with our services, and you should not use our site.
          </p>
          <h2>
            What personal information do we collect and how do we collect it?
          </h2>
          <h3>Job Candidates</h3>
          <p>
            When you use HepDex’s services (our “Service”) by registering with
            HepDex, or applying to HepDex, in connection with a job opportunity,
            the information we collect may include:
          </p>
          <ul>
            <li>
              Name, email address, social media accounts, cover letter (if
              applicable), resume and job experience, education, email and text
              communications sent via our Service, email and text
              communications, and other information that you choose to send to
              us or to give us administrative access to.
            </li>
            <li>
              Metadata related to your use of the Service, such as when you log
              in to the Service and how you use the Service.
            </li>
          </ul>

          <h3>Customers and Potential Customers</h3>
          <p>
            We collect information from potential customers when they inquire
            about HepDex’s services, communicate with HepDex, and request a
            demonstration of our Service, and we collect information from
            customers when they register for our Service. This information may
            include name, company name, email address, phone number, and billing
            information.
          </p>

          <h3>Third Party Data</h3>
          <p>
            We may receive your personal information from third parties,
            including data brokers, as well as from public sources such as
            social media platforms. We may use this third party data to enrich
            personal information about you that we have obtained from you or
            other sources.
          </p>

          <h3>Automatic Data Collection</h3>
          <p>
            As you navigate through and interact with our site, we may use
            automatic data collection technologies to collect certain
            information about your equipment, browsing actions and patterns,
            including:
          </p>
          <ul>
            <li>
              Details of your use of our site, including traffic data, logs, and
              other communication data and the resources that you access and use
              on the site.
            </li>
            <li>
              Information about the type of device or browser you use, your
              device’s operating software, your internet service provider, your
              device’s regional and language settings, and other similar
              information. This data may include IP address, MAC address, device
              advertising ID (e.g., IDFA or AAID), and other device identifiers.
            </li>
          </ul>

          <h2>How do we use personal information?</h2>
          <h3>To provide our Service</h3>
          <p>
            The personal information we collect may be processed and/or used in
            the following ways for purposes of providing our Service:
          </p>
          <ul>
            <li>To help companies post and manage jobs</li>
            <li>To help companies source candidates for jobs</li>
            <li>To help companies manage applicants for jobs</li>
            <li>
              To help companies communicate with you, including scheduling
              interviews with candidates and interviewers
            </li>
            <li>To help analyze recruiting activities</li>
            <li>To help companies onboard new hires</li>
            <li>To provide customer support</li>
            <li>To personalize your experience</li>
            <li>To improve our Service</li>
            <li>To provide and improve customer service</li>
            <li>To provide demonstrations of our Service</li>
            <li>To market our Service</li>
          </ul>
          <p>
            We may use your personal information, including your name, email
            address, phone number, and other contact details, to provide you
            with marketing communications, promotions, and special offers.
            Specifically:
          </p>
          <ul>
            <li>
              We may analyze your interactions with our Service to offer content
              and promotions that match your interests and preferences
            </li>
            <li>
              We may send you newsletters, product updates, event invitations,
              or other promotional materials
            </li>
            <li>
              Occasionally, we may invite you to participate in surveys or
              provide feedback to improve our products and marketing strategies.
            </li>
          </ul>
          <p>
            If you do not want us to use your personal information for marketing
            purposes, you may opt out via our Privacy Request Manager.
          </p>

          <p>
            In addition, we may aggregate and anonymize personal information to
            remove identifiable elements and use it for marketing purposes, such
            as analyzing trends, improving our services, developing promotional
            insights and preparing marketing reports. Aggregated and anonymized
            data does not identify any individual or company and may be shared
            with third parties or used internally to enhance our marketing
            strategies and offerings. This use complies with applicable privacy
            laws and ensures that your personal information remains protected.
          </p>

          <h3>To monitor and improve our site and our Service</h3>
          <p>
            The information we collect automatically helps us to improve our
            site and Service, including by enabling us to:
          </p>
          <ul>
            <li>Estimate our audience size and usage patterns</li>
            <li>
              Store information about your preferences, allowing us to customize
              our service according to your individual interests
            </li>
            <li>Speed up searches</li>
            <li>Recognize you when you return to our site</li>
          </ul>

          <h3>To process your application if you apply for a job at HepDex</h3>
          <p>
            If you apply for a job at HepDex, the personal information you
            submit with your application is used to evaluate your qualifications
            and suitability for HepDex employment opportunities, manage the
            recruitment process, conduct interviews, communicate with you,
            verify your work eligibility, and comply with legal or regulatory
            obligations. This information may include contact details,
            employment history, educational qualifications, references, and any
            other personal details provided during the application process.
          </p>

          <h2>Do we use cookies?</h2>
          <p>
            Yes. Cookies are small files that a site or its service provider
            places on your computer’s hard drive through your Web browser that
            enables the site’s or service provider’s systems to recognize your
            browser and capture and remember certain information. Unless you
            have adjusted your browser setting so that it will refuse cookies,
            our system will issue cookies when you direct your browser to our
            site.
          </p>

          <h2>How long do we retain your personal information?</h2>
          <p>
            Our retention period for your personal information depends on the
            type of data and the purpose for which we process the data. We will
            retain your personal information for the period necessary to fulfill
            the purposes outlined in this Privacy Notice unless a longer
            retention period is required or permitted by law.
          </p>

          <h2>How can we disclose or share your information?</h2>
          <p>We may share information about you as follows:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with our agents, vendors and other service providers (collectively
              "Service Providers") in connection with their work on our behalf.
              Service Providers assist us with services such as payment
              processing, credit checks, data analytics, marketing and
              promotional services, website hosting, and technical support.
              Service Providers are prohibited from using your information for
              any purpose other than to provide this assistance, although we may
              permit them to use aggregated information which does not identify
              you or de-identified data for other purposes. You can find a list
              of Service Providers (Sub-processors) and the services they
              provide to HepDex at the HepDex Trust Centre.
            </li>
            <li>
              <strong>Affiliates:</strong> We may share your information with
              our related entities, including our parent and sister companies.
              For example, we may share your information with our affiliates for
              customer support, marketing and technical operations.
            </li>
            <li>
              <strong>Business Partners:</strong> We may share your information
              with our business partners in connection with offering you
              co-branded services, selling or distributing our Service, or
              engaging in joint marketing activities.
            </li>
            <li>
              <strong>Professional Advisors:</strong> We may share your
              information with our professional advisors such as lawyers,
              auditors, bankers and insurers, where necessary in the course of
              the professional services that they render to us.
            </li>
            <li>
              <strong>Merger or Acquisition:</strong> We may share your
              information in connection with, or during negotiations of, any
              proposed or actual merger, purchase, sale or any other type of
              acquisition or business combination of all or any portion of our
              assets, or transfer of all or a portion of our business to another
              business.
            </li>
            <li>
              <strong>Security and Legal Compliance:</strong> We may share your
              information to comply with the law or other legal process, and
              where required, in response to lawful requests by public
              authorities, including to meet national security or law
              enforcement requirements. We may also share your information to
              protect the rights, property, life, health, security and safety of
              HepDex, our Service or any third party.
            </li>
            <li>
              <strong>Consent:</strong> We may share your information for any
              other purpose disclosed to you and with your consent.
            </li>
          </ul>
          <p>
            Without limiting the foregoing, in our sole discretion, we may share
            aggregated information that does not identify you or de-identified
            information about you with third parties or affiliates for any
            purpose except as prohibited by applicable law.
          </p>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information except in accordance with this Privacy Policy. We do not
            share your personal information with third parties for their direct
            marketing purposes.
          </p>

          <h2>How do we keep your personal information secure?</h2>
          <p>
            We have implemented measures designed to secure your personal
            information from accidental loss and from unauthorized access, use,
            alteration, and disclosure. All information you provide to us is
            stored on our secure servers that are hosted within data centers
            that commit to industry-leading security practices.
          </p>
          <p>
            The safety and security of your information also depends on you.
            Where you have chosen credentials for access to certain parts of our
            site or use an email /SSO account to authenticate, you are
            responsible for keeping the credentials or the account secure.
          </p>

          <h2>
            How can you access, correct or delete your personal information?
          </h2>
          <p>
            You may have certain rights regarding your personal information,
            including the right to request access, correction, updates, or
            deletion of your personal information. We will evaluate and respond
            to any such request in accordance with our rights and obligations
            (including our obligations to verify your identity) under applicable
            law. You may submit a request to us regarding your personal
            information using our Privacy Request Manager.
          </p>
          <p>
            Our Service is designed to assist our customers in managing their
            applicant tracking and recruitment processes. Our customers act as
            the data controllers under the General Data Protection Regulation
            (GDPR) or as businesses under the California Consumer Privacy Act
            (CCPA). HepDex, in its role as data processor under the GDPR and as
            service provider under the CCPA, processes personal information
            solely on behalf of our customers and in accordance with their
            instructions. We do not independently determine how personal
            information is used, nor do we make decisions regarding the rights
            of individuals related to the personal information we process on
            behalf of our customers.
          </p>
          <p>
            For requests to access, correct or delete your personal information
            that has been collected by or on behalf of an HepDex customer, we
            recommend that you reach out directly to the company you applied to
            or that contacted you for an employment opportunity. They will be
            able to initiate the necessary process to address your request. For
            information about how your personal information is used by an HepDex
            customer or to make a request to an HepDex customer regarding your
            rights, please refer to the privacy policy of the organization to
            which you submitted your application or otherwise provided your
            personal information, or that contacted you.
          </p>
          <p>
            Subject to the foregoing, residents of certain countries and states
            may have additional personal information rights and choices. Please
            see below for your rights as (1) an EU, UK or Swiss resident or (2)
            a California resident.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            HepDex is a U.S.-based company. If you are a non-U.S. resident and
            provide us with your personal information, you acknowledge and agree
            that your personal information may be transferred to and processed
            in the United States, where the laws regarding processing of
            personal information may be less stringent than the laws in your
            country. In addition, HepDex may share your personal information
            with service providers that are not located in the United States. By
            providing your information to HepDex, you consent to HepDex
            transferring your information to those service providers for
            purposes of providing our Service.
          </p>

          <h2>EU, UK and Swiss Residents</h2>
          <p>
            If you are a resident of the European Union, the United Kingdom or
            Switzerland, you are entitled to certain information and you have
            certain rights under, respectively, the General Data Protection
            Regulation (Regulation (EU) 2016/679) (the “EU GDPR”), the Data
            Protection, Privacy and Electronic Communications (Amendments etc.)
            (EU Exit) Regulations 2019 (the “UK GDPR”) (collectively, the
            “GDPR”) and the Swiss Federal Act on Data Protection (“FADP”). Those
            rights include:
          </p>
          <ul>
            <li>The right of access to your personal data.</li>
            <li>
              The right to rectify your personal data if it is incorrect or
              incomplete.
            </li>
            <li>
              The right to have your personal data erased (“right to be
              forgotten”) if certain grounds are met.
            </li>
            <li>
              The right to withdraw your consent to our processing of your
              personal data at any time (if our processing is based on consent).
            </li>
            <li>
              The right to object to our processing of your personal data (if
              processing is based on legitimate interests).
            </li>
            <li>
              The right to object to our processing of your personal data for
              direct marketing purposes.
            </li>
            <li>
              The right to receive your personal data from us in a structured,
              commonly used and machine-readable format, and the right to
              transmit your personal data to another controller without
              hindrance from us (data portability).
            </li>
          </ul>
          <p>
            If you are located in the European Union, the United Kingdom or
            Switzerland and you are or have been a user of our Service, we may
            send you marketing communications based on our legitimate interests,
            subject always to your right to opt out of such communications.
            Further, if you are located in the European Union, the United
            Kingdom or Switzerland, we will never share your personal data with
            a third party for such third party’s marketing purposes, unless you
            have specifically consented to us doing so.
          </p>
          <p>
            You may exercise any of the above rights by submitting a request. We
            may request specific information from you to confirm your identity,
            and in some circumstances, we may charge a reasonable fee for access
            to your information.
          </p>
          <p>
            Furthermore, if you believe that our processing of your personal
            data is inconsistent with your data protection rights under the GDPR
            or FADP (as applicable) and we have not adequately addressed your
            concerns, you have the right to lodge a complaint with the data
            protection supervisory authority of your country.
          </p>

          <h2>Participation in the Data Privacy Framework</h2>
          <p>
            HepDex complies with the EU-U.S. Data Privacy Framework (EU-U.S.
            DPF), the UK Extension to the EU-U.S. DPF, and the Swiss-U.S. Data
            Privacy Framework (Swiss-U.S. DPF) as set forth by the U.S.
            Department of Commerce. HepDex has been certified to the U.S.
            Department of Commerce that it adheres to the EU-U.S. Data Privacy
            Framework Principles (EU-U.S. DPF Principles) with regard to the
            processing of personal data received from the European Union in
            reliance on the EU-U.S. DPF and from the United Kingdom (and
            Gibraltar) in reliance on the UK Extension to the EU-U.S. DPF.
            HepDex has been certified to the U.S. Department of Commerce that it
            adheres to the Swiss-U.S. Data Privacy Framework Principles
            (Swiss-U.S. DPF Principles) with regard to the processing of
            personal data received from Switzerland in reliance on the
            Swiss-U.S. DPF. If there is any conflict between the terms in this
            privacy policy and the EU-U.S. DPF Principles and/or the Swiss-U.S.
            DPF Principles, the Principles shall govern. To learn more about the
            Data Privacy Framework (DPF) program, and to view our certification,
            please visit{" "}
            <Link target="_blank" to="https://www.dataprivacyframework.gov/">
              https://www.dataprivacyframework.gov/
            </Link>
            .
          </p>
          <p>
            In compliance with the EU-U.S. DPF, the UK Extension to the EU-U.S.
            DPF and the Swiss-U.S. DPF, HepDex commits to resolve DPF
            Principles-related complaints about our collection and use of your
            personal information. EU and UK and Swiss individuals with inquiries
            or complaints regarding our handling of personal data received in
            reliance on the EU-U.S. DPF, the UK Extension to the EU-U.S. DPF and
            the Swiss-U.S. DPF should first contact HepDex using the contact
            information provided in the Contacting Us section below.
          </p>
          <p>
            In compliance with the EU-U.S. DPF, the UK Extension to the EU-U.S.
            DPF and the Swiss-U.S. DPF, HepDex commits to refer unresolved
            complaints concerning our handling of personal data received in
            reliance on the EU-U.S. DPF, the UK Extension to the EU-U.S. DPF and
            the Swiss-U.S. DPF to the International Centre for Dispute
            Resolution, operated by the American Arbitration Association, an
            alternative dispute resolution provider based in the United States.
            If you do not receive timely acknowledgment of your DPF
            Principles-related complaint from us, or if we have not addressed
            your DPF Principles-related complaint to your satisfaction, please
            visit{" "}
            <Link to="https://go.adr.org/dpf_irm.html" target="_blank">
              https://go.adr.org/dpf_irm.html
            </Link>{" "}
            for more information or to file a complaint. The services of the
            International Centre for Dispute Resolution are provided at no cost
            to you.
          </p>
          <p>
            The Federal Trade Commission has jurisdiction over HepDex’s
            compliance with the EU-U.S. Data Privacy Framework (EU-U.S. DPF),
            the UK Extension to the EU-U.S. DPF and the Swiss-U.S. Data Privacy
            Framework (Swiss-U.S. DPF).
          </p>
          <p>
            EU, UK and Swiss individuals may invoke binding arbitration under
            the Data Privacy Framework Principles if a complaint has not been
            resolved by HepDex or by other recourse and enforcement mechanisms.
          </p>
          <p>
            As required under the Data Privacy Framework, HepDex has
            responsibility for the processing of personal information it
            receives under the Data Privacy Framework and subsequently transfers
            to a third party acting as an agent on its behalf. HepDex remains
            liable under the Data Privacy Framework Principles if its agent
            processes such personal information in a manner inconsistent with
            the Principles, unless HepDex proves that it is not responsible for
            the event giving rise to the damage.
          </p>

          <h2>California Privacy Rights</h2>
          <p>
            If you are a California resident, you have certain rights under the
            California Consumer Privacy Act, as amended (CCPA). These rights
            include:
          </p>
          <ul>
            <li>
              Right to Know. You have the right to request information about the
              categories and specific pieces of personal information we have
              collected about you, the purposes for which your personal
              information is used, the categories of sources from which the
              information was collected, and the categories of third parties
              with whom we share your information.
            </li>
            <li>
              Right to Delete. You may request that we delete personal
              information we have collected about you, subject to certain
              exceptions.
            </li>
            <li>
              Right to Correct. You may request that we correct inaccurate
              personal information we maintain about you.
            </li>
          </ul>

          <h2>Google API Services User Data Policy</h2>
          <p>
            HepDex’s use and transfer to any other app of information received
            from Google APIs will adhere to{" "}
            <Link
              target="_blank"
              to="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
            >
              {" "}
              Google API Services User Data Policy
            </Link>{" "}
            , including the Limited Use requirements.
          </p>

          <h2>Changes to our Privacy Policy</h2>
          <p>
            If we make any changes to our Privacy Policy, we will post those
            changes on this site and update the Privacy Policy modification date
            above. Privacy Policy changes will apply only to information
            collected after the effective date of the change.
          </p>

          <h2>Contacting Us</h2>
          <p>
            If there are any questions regarding this Privacy Policy, you may
            contact us via email:{" "}
            <Link to="mailto:privacy@HepDex.com">privacy@HepDex.com</Link>.
          </p>
        </ContentBox>
      </Section>
    </PageContent>
  );
}
