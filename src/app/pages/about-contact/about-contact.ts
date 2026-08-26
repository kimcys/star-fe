import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { CardComponent } from '../../shared/components/card/card';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-about-contact',
  imports: [PageHeroComponent, CardComponent],
  templateUrl: './about-contact.html',
})
export class AboutContactComponent {
  readonly contactDetails: ContactDetail[] = [
    { icon: '📍', label: 'Address', value: 'Petaling Jaya, Selangor, Malaysia (placeholder address)' },
    { icon: '📞', label: 'Phone', value: '+60 3-0000 0000 (placeholder number)' },
    { icon: '✉️', label: 'Email', value: 'enquiry@example.com (placeholder email)' },
    { icon: '🕘', label: 'Office Hours', value: 'Monday – Friday, 9:00 AM – 6:00 PM' },
  ];
}
