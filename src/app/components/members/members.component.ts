import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { NotificationService } from '../../services/notification.service';
import { Member } from '../../models/models';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  showAddForm = false;
  isSubmitting = false;

  // Template-driven form model
  newMember: Partial<Member> = {
    name: '',
    email: '',
    phone: '',
    membershipDate: new Date().toISOString().split('T')[0],
    membershipExpiry: '',
    borrowedBooks: [],
    isActive: true
  };

  constructor(
    private memberService: MemberService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe(m => this.members = m);
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onAddMember(): void {
    this.isSubmitting = true;
    this.memberService.addMember(this.newMember as Omit<Member, 'id'>).subscribe({
      next: () => {
        this.notificationService.success('Member added successfully!');
        this.showAddForm = false;
        this.resetForm();
        this.loadMembers();
        this.isSubmitting = false;
      },
      error: () => { this.isSubmitting = false; }
    });
  }

  deleteMember(id: number): void {
    if (confirm('Delete this member?')) {
      this.memberService.deleteMember(id).subscribe(() => {
        this.notificationService.success('Member deleted.');
        this.loadMembers();
      });
    }
  }

  private resetForm(): void {
    this.newMember = {
      name: '', email: '', phone: '',
      membershipDate: new Date().toISOString().split('T')[0],
      membershipExpiry: '', borrowedBooks: [], isActive: true
    };
  }

  isMembershipExpired(expiry: string): boolean {
    return new Date(expiry) < new Date();
  }
}
