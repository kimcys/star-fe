import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { LegalSection, LegalSectionsComponent } from '../../shared/components/legal-sections/legal-sections';

@Component({
  selector: 'app-privacy-policy',
  imports: [PageHeroComponent, LegalSectionsComponent],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicyComponent {
  readonly sections: LegalSection[] = [
    {
      title: '1. Overview',
      body: [
        'Star Media Group Berhad ("we", "us", "our") respects your privacy and is committed ' +
          'to complying with Malaysia\'s Personal Data Protection Act 2010 ("the Act"). This ' +
          'Privacy Policy explains how we collect, use, disclose, and protect information ' +
          'when you visit this website.',
      ],
    },
    {
      title: '2. Information We Collect',
      body: [
        'We collect information you provide directly, such as when you contact us through ' +
          'the details on our About page, as well as information collected automatically ' +
          'through cookies, including a unique identifier (GUID), the date and time of your ' +
          'consent decision, and the version of the consent notice you responded to.',
        'Where you register or participate in activities such as contests, polls, or ' +
          'membership schemes, we may also collect your name, contact number, address, date ' +
          'of birth, email address, and other identification details you provide.',
      ],
    },
    {
      title: '3. Cookies',
      body: [
        'Cookies are necessary for this website to function properly, for performance ' +
          'measurement, and to provide you with the best experience. When you accept our ' +
          'cookie notice, a cookie recording your consent is stored in your browser for ' +
          'one year. If you decline, a cookie recording that decision is stored for one day, ' +
          'after which you will be asked again.',
        'Most browsers allow you to block or erase cookies through their settings. Doing so ' +
          'may affect the functionality of parts of this website.',
      ],
    },
    {
      title: '4. How We Use Information',
      body: [
        'Information collected is used to operate and improve this website, respond to ' +
          'enquiries, measure performance, and comply with applicable legal obligations ' +
          'regarding user consent. It may also be used to complete transactions you ' +
          'request and to manage participation in our activities.',
      ],
    },
    {
      title: '5. Disclosure of Information',
      body: [
        'Personal data may be shared with Star Media Group subsidiaries and affiliates in ' +
          'accordance with our confidentiality standards. We may also engage vendors (data ' +
          'processors) to handle information on our behalf, who are required to maintain ' +
          'comparable levels of protection. Aggregated, non-personal data may be used to ' +
          'improve our website and business operations.',
      ],
    },
    {
      title: '6. Data Storage and Security',
      body: [
        'Consent records (GUID, timestamp, and consent version) and other personal data are ' +
          'stored securely on servers located in Malaysia and are only accessible to ' +
          'authorised administrators. We apply industry-standard safeguards to protect data ' +
          'in transit and at rest, although no method of transmission over the internet is ' +
          'ever completely secure.',
        'Data is retained only for as long as necessary to fulfil the purposes described in ' +
          'this policy or as required by law.',
      ],
    },
    {
      title: '7. Your Rights',
      body: [
        'Under the Personal Data Protection Act 2010, you may request access to, or ' +
          'correction of, your personal data, subject to any prescribed fee, by contacting ' +
          'us using the details below.',
        'You may also withdraw or change your cookie consent at any time by clearing your ' +
          'browser cookies for this site, which will cause the consent notice to reappear ' +
          'on your next visit.',
      ],
    },
    {
      title: '8. Contact Us',
      body: [
        'If you have any questions about this Privacy Policy, please contact us at ' +
          'customerservice@thestar.com.my, call our Customer Hotline at 1300 88 7827, or ' +
          'write to us at Menara Star, 15, Jalan 16/11, Pusat Perdagangan Phileo Damansara, ' +
          '46350 Petaling Jaya, Selangor. Further details are available on our About page.',
      ],
    },
  ];
}
