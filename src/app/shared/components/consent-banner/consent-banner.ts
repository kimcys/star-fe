import { Component, computed, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConsentService } from '../../../core/services/consent.service';
import { ButtonComponent } from '../button/button';

/**
 * Route `data` key a route can set to `true` so the banner never renders
 * on it - e.g. the Terms & Conditions / Privacy Policy pages, which exist
 * so a visitor can read them before deciding, not with a modal already
 * blocking the screen.
 */
export const HIDE_CONSENT_BANNER_ROUTE_DATA_KEY = 'hideConsentBanner';

function deepestRouteHidesBanner(root: ActivatedRouteSnapshot): boolean {
  let route = root;
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route.data[HIDE_CONSENT_BANNER_ROUTE_DATA_KEY] === true;
}

@Component({
  selector: 'app-consent-banner',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './consent-banner.html',
})
export class ConsentBannerComponent {
  readonly submitting = signal<'accept' | 'decline' | null>(null);
  readonly errorMessage = signal('');
  private readonly hiddenOnCurrentRoute = signal(false);

  readonly visible = computed(() => this.consent.showBanner() && !this.hiddenOnCurrentRoute());

  constructor(
    readonly consent: ConsentService,
    private readonly router: Router,
  ) {
    void consent.refreshStatus();

    this.hiddenOnCurrentRoute.set(deepestRouteHidesBanner(this.router.routerState.snapshot.root));
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.hiddenOnCurrentRoute.set(
          deepestRouteHidesBanner(this.router.routerState.snapshot.root),
        );
      });

    effect(() => {
      const shouldLockScroll = this.visible();
      document.documentElement.classList.toggle('overflow-hidden', shouldLockScroll);
      document.body.classList.toggle('overflow-hidden', shouldLockScroll);
    });
  }

  async accept(): Promise<void> {
    this.submitting.set('accept');
    this.errorMessage.set('');
    try {
      await this.consent.accept();
    } catch {
      this.errorMessage.set('Something went wrong. Please try again.');
    } finally {
      this.submitting.set(null);
    }
  }

  async decline(): Promise<void> {
    this.submitting.set('decline');
    this.errorMessage.set('');
    try {
      await this.consent.decline();
    } catch {
      this.errorMessage.set('Something went wrong. Please try again.');
    } finally {
      this.submitting.set(null);
    }
  }
}
