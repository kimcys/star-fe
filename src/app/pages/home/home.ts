import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card';
import { ButtonComponent } from '../../shared/components/button/button';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [CardComponent, ButtonComponent],
  templateUrl: './home.html',
})
export class HomeComponent {
  readonly features: Feature[] = [
    {
      icon: '📰',
      title: 'Trusted News',
      description: 'Timely, accurate reporting across print and digital platforms.',
    },
    {
      icon: '🌏',
      title: 'Regional Reach',
      description: 'Connecting audiences across Malaysia and the wider region.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data is handled transparently, in line with our published policies.',
    },
  ];
}
