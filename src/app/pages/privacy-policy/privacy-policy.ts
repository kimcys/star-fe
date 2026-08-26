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
      title: '1. Information We Collect',
      body: [
        'We collect information you provide directly, such as when you contact us, ' +
          'as well as information collected automatically through cookies, including a ' +
          'unique identifier (GUID), the date and time of your consent decision, and the ' +
          'version of the consent notice you responded to.',
      ],
    },
    {
      title: '2. Cookies',
      body: [
        'Cookies are necessary for this website to function properly, for performance ' +
          'measurement, and to provide you with the best experience. When you accept our ' +
          'cookie notice, a cookie recording your consent is stored in your browser for ' +
          'one year. If you decline, a cookie recording that decision is stored for one day, ' +
          'after which you will be asked again.',
      ],
    },
    {
      title: '3. How We Use Information',
      body: [
        'Information collected is used to operate and improve this website, measure ' +
          'performance, and comply with applicable legal obligations regarding user consent.',
      ],
    },
    {
      title: '4. Data Storage',
      body: [
        'Consent records (GUID, timestamp, and consent version) are stored securely in ' +
          'our database and are only accessible to authorised administrators.',
      ],
    },
    {
      title: '5. Your Rights',
      body: [
        'You may withdraw or change your cookie consent at any time by clearing your ' +
          'browser cookies for this site, which will cause the consent notice to reappear ' +
          'on your next visit.',
      ],
    },
    {
      title: '6. Contact Us',
      body: [
        'If you have any questions about this Privacy Policy, please reach out via the ' +
          'details on our About Us / Contact Us page.',
      ],
    },
  ];
}
