import { Component } from '@angular/core';
import { UsersService, User } from '@angular-unicorn/users';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})

export class UsersListComponent {
  users: User[] = [];
  constructor(
    private UsersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.UsersService.deleteUser(id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category deleted',
            });
            this._getUsers();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: error.status,
              detail: 'Something went wrong.',
            });
          }
        );
      }
    });
  }

  _getUsers() {
    this.UsersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  updateUser(id: string){
    this.router.navigateByUrl(`users/form/${id}`);
  }
}
