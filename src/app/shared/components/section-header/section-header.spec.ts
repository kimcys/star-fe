import { TestBed } from '@angular/core/testing';
import { SectionHeaderComponent } from './section-header';

describe('SectionHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SectionHeaderComponent] }).compileComponents();
  });

  it('renders the title', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'What we stand for');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('What we stand for');
  });

  it('omits the subtitle paragraph when not provided', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'Title');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p')).toBeNull();
  });

  it('renders the subtitle when provided', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('subtitle', 'Supporting copy');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Supporting copy');
  });
});
