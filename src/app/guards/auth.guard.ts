import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MemberService } from '../services/member.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private memberService: MemberService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.memberService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/books'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
