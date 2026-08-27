import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { CardComponent } from '../../shared/components/card/card';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

interface BrandGroup {
  category: string;
  brands: string;
}

const OFFICE_ADDRESS =
  'Menara Star, 15, Jalan 16/11, Pusat Perdagangan Phileo Damansara, 46350 Petaling Jaya, Selangor';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBQquW7KSr2f9u_JjX8MjNvotIQV8J_ZRc';

@Component({
  selector: 'app-about',
  imports: [PageHeroComponent, CardComponent],
  templateUrl: './about.html',
})
export class AboutComponent {
  readonly officeAddress = OFFICE_ADDRESS;

  readonly mapUrl: SafeResourceUrl;

  readonly contactDetails: ContactDetail[] = [
    { icon: '📍', label: 'Address', value: OFFICE_ADDRESS },
    { icon: '📞', label: 'Phone', value: '+603 7967 1388 · Customer Hotline 1300 88 7827' },
    { icon: '✉️', label: 'Email', value: 'customerservice@thestar.com.my' },
    { icon: '🕘', label: 'Office Hours', value: 'Monday – Friday, 9:00 AM – 5:30 PM' },
  ];

  readonly brandGroups: BrandGroup[] = [
    { category: 'Print & Digital', brands: 'The Star, The Star ePaper, StarBiz7, TSOL (The Star Online)' },
    { category: 'Lifestyle & Content', brands: 'Life Inspired, R.AGE, Mstar, Star Property, Kuali.com' },
    { category: 'Radio', brands: '988 FM, Suria FM' },
    { category: 'Marketplace & Events', brands: 'Beli Lokal, CarSifu, Star LIVE, Star Education Fair' },
  ];

  constructor(sanitizer: DomSanitizer) {
    const query = encodeURIComponent(OFFICE_ADDRESS);
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${query}`,
    );
  }
}
