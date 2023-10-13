import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { User } from '@shared/entities/user';
import { UserService } from '@shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  providers: [translatePrefixProvider('card')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent implements OnDestroy {
  private service = inject(UserService);
  user$ = this.service.user$;

  private router = inject(Router)
  private subscription: Subscription | null = null

  warnings(user: User): Warning[] {
    let warnings: Warning[] = [];
    if (!user.verifiedEmail)
      warnings.push({
        message: 'emailNotVerified',
        routerLink: '/user/auth/email/confirm',
        color: '#FF4B4B',
      });
    if (!user.studyPlaceInfo)
      warnings.push({
        message: 'notAMember',
        routerLink: '/user/auth/join',
        color: '#FF4B4B',
      });

    return warnings;
  }

  signout(): void {
    this.subscription?.unsubscribe()
    this.subscription = this.service.signout()
      .subscribe(() => this.router.navigate(['']));
  }

  revoke(): void {
    this.subscription?.unsubscribe()
    this.subscription = this.service.revokeToken().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}

interface Warning {
  message: string;
  routerLink: string;
  color: string;
}
