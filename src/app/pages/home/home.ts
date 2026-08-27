import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card';
import { ButtonComponent } from '../../shared/components/button/button';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [CardComponent, ButtonComponent, SectionHeaderComponent],
  templateUrl: './home.html',
})
export class HomeComponent {
  readonly features: Feature[] = [
    {
      icon: '📰',
      title: 'Journalistic Excellence',
      description:
        'Award-winning work across print and digital that reflects our commitment to credibility, depth, and public trust.',
    },
    {
      icon: '🌏',
      title: 'Multi-Platform Reach',
      description:
        'Print, digital, radio, events, and content marketing, engaging audiences across every touchpoint in Malaysia and the region.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Growth',
      description:
        'Long-term value creation through strategic partnerships, ESG-led initiatives, and regional collaborations.',
    },
  ];

  readonly brands: string[] = [
    'The Star',
    'StarBiz7',
    'Life Inspired',
    'R.AGE',
    'Kuali.com',
    'Star Property',
    'CarSifu',
    '988 FM',
    'Suria FM',
  ];
}
