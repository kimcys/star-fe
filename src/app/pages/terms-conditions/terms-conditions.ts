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
        'By continuing to access or use this site, you acknowledge and consent to our use ' +
          'of cookies in accordance with these Terms & Conditions and our Privacy Policy. ' +
          'If you do not agree with these terms, please discontinue use of this website.',
      ],
    },
    {
      title: '2. Use of the Website',
      body: [
        'This website and its content are provided by Star Media Group Berhad (Company No: ' +
          '10894D) for general informational purposes only. You agree to use this site only ' +
          'for lawful purposes and in a manner that does not infringe the rights of, or ' +
          'restrict or inhibit the use of, this site by any third party.',
      ],
    },
    {
      title: '3. Copyright and Intellectual Property',
      body: [
        'All content, graphics, and images on this site are protected by Malaysian ' +
          'copyright law and are the property of Star Media Group Berhad or its licensors. ' +
          'They may not be copied or re-used without express written permission.',
        'You may access this website for informational and non-commercial offline use only, ' +
          'provided that content remains unmodified and all copyright notices are retained. ' +
          'Reproducing the site\'s HTML, visual design, colour scheme, button shapes, or ' +
          'layout is prohibited, as these constitute the Company\'s trademarks.',
      ],
    },
    {
      title: '4. Disclaimers',
      body: [
        'The Company makes no representations as to the accuracy, correctness, completeness, ' +
          'suitability, or validity of any information on this website and disclaims ' +
          'liability for any errors, omissions, or damages arising from its use.',
      ],
    },
    {
      title: '5. Cookies and Consent',
      body: [
        'Use of this site is subject to our cookie consent mechanism. Accepting cookies ' +
          'stores a record of your consent — a unique identifier (GUID), timestamp, and ' +
          'consent version — for one year. Declining stores a record of that decision for ' +
          'one day, after which you will be prompted again. See our Privacy Policy for full ' +
          'details.',
      ],
    },
    {
      title: '6. Limitation of Liability',
      body: [
        'Star Media Group Berhad shall not be liable for any indirect, incidental, or ' +
          'consequential damages arising from your use of this website.',
      ],
    },
    {
      title: '7. Changes to These Terms',
      body: [
        'We may update these Terms & Conditions from time to time. Continued use of the ' +
          'site after changes are posted constitutes acceptance of the revised terms.',
      ],
    },
    {
      title: '8. Contact Us',
      body: [
        'For questions regarding these Terms & Conditions, please contact us at ' +
          'customerservice@thestar.com.my, call 1300 88 7827 (Monday – Friday, 9:00 AM – ' +
          '5:30 PM), or write to us at Menara Star, 15, Jalan 16/11, Pusat Perdagangan ' +
          'Phileo Damansara, 46350 Petaling Jaya, Selangor. Further details are available on ' +
          'our About page.',
      ],
    },
  ];
}
