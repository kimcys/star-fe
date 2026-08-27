import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero';
import { CardComponent } from '../../shared/components/card/card';
import {
  OFFICE_ADDRESS,
  OFFICE_EMAIL,
  OFFICE_HOTLINE,
  OFFICE_HOURS,
  OFFICE_LAT,
  OFFICE_LON,
  OFFICE_MAIN_PHONE,
} from '../../shared/site-info';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

interface BrandGroup {
  category: string;
  brands: string;
}

// Small bounding box around the office, in degrees.
const MAP_BBOX_DELTA = 0.003;

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
    { icon: '📞', label: 'Phone', value: `${OFFICE_MAIN_PHONE} · Customer Hotline ${OFFICE_HOTLINE}` },
    { icon: '✉️', label: 'Email', value: OFFICE_EMAIL },
    { icon: '🕘', label: 'Office Hours', value: OFFICE_HOURS },
  ];

  readonly brandGroups: BrandGroup[] = [
    { category: 'Print & Digital', brands: 'The Star, The Star ePaper, StarBiz7, TSOL (The Star Online)' },
    { category: 'Lifestyle & Content', brands: 'Life Inspired, R.AGE, Mstar, Star Property, Kuali.com' },
    { category: 'Radio', brands: '988 FM, Suria FM' },
    { category: 'Marketplace & Events', brands: 'Beli Lokal, CarSifu, Star LIVE, Star Education Fair' },
  ];

  constructor(sanitizer: DomSanitizer) {
    // OpenStreetMap's embed needs no API key/billing, unlike Google's Maps
    // Embed API - free to use with just a bounding box and a marker.
    const bbox = [
      OFFICE_LON - MAP_BBOX_DELTA,
      OFFICE_LAT - MAP_BBOX_DELTA,
      OFFICE_LON + MAP_BBOX_DELTA,
      OFFICE_LAT + MAP_BBOX_DELTA,
    ].join(',');
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${OFFICE_LAT},${OFFICE_LON}`,
    );
  }
}
