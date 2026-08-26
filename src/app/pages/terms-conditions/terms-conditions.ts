import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { LegalSection, LegalSectionsComponent } from '../../shared/components/legal-sections/legal-sections';

@Component({
  selector: 'app-terms-conditions',
  imports: [PageHeroComponent, LegalSectionsComponent],
  templateUrl: './terms-conditions.html',
})
export class TermsConditionsComponent {
  readonly sections: LegalSection[] = [
    {
      title: '1. Acceptance of Terms',
      body: [
        'By continuing to access or use this site, you acknowledge and consent to our ' +
          'use of cookies in accordance with our Terms & Conditions and Privacy Statement. ' +
          'If you do not agree with these terms, please discontinue use of this website.',
      ],
    },
    {
      title: '2. Use of the Website',
      body: [
        'This website and its content are provided for general informational purposes ' +
          'only. You agree to use this site only for lawful purposes and in a manner that ' +
          'does not infringe the rights of, or restrict or inhibit the use of, this site by ' +
          'any third party.',
      ],
    },
    {
      title: '3. Intellectual Property',
      body: [
        'All content on this website, including text, graphics, logos, and images, is the ' +
          'property of Star Media Group Berhad or its licensors and is protected by ' +
          'applicable intellectual property laws.',
      ],
    },
    {
      title: '4. Cookies and Consent',
      body: [
        'Use of this site is subject to our cookie consent mechanism. Accepting cookies ' +
          'stores a record of your consent (a unique identifier, timestamp, and consent ' +
          'version) for one year. Declining stores a record of that decision for one day, ' +
          'after which you will be prompted again.',
      ],
    },
    {
      title: '5. Limitation of Liability',
      body: [
        'Star Media Group Berhad shall not be liable for any indirect, incidental, or ' +
          'consequential damages arising from your use of this website.',
      ],
    },
    {
      title: '6. Changes to These Terms',
      body: [
        'We may update these Terms & Conditions from time to time. Continued use of the ' +
          'site after changes are posted constitutes acceptance of the revised terms.',
      ],
    },
    {
      title: '7. Contact Us',
      body: [
        'For questions regarding these Terms & Conditions, please reach out via the ' +
          'details on our About Us / Contact Us page.',
      ],
    },
  ];
}
