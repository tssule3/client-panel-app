import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errBlock = 0;
  checkErrBlock = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
    this.errBlock = Number(localStorage.getItem('count'));
    console.log('localStorage ' + localStorage.getItem('count'));
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        if ( Number(localStorage.getItem('count')) > 3 ) {
          this.errBlock = 0;
          this.flashMessage.show('Please Wait 10 seconds Before Logging In Again', {cssClass: 'alert-danger', timeout: 10000} );
          this.checkErrBlock = true;
          setTimeout(() => {
            this.checkErrBlock = false;
          }, 10000);
        } else {
          this.errBlock = Number(localStorage.getItem('count'));
          let userCount = 3 - this.errBlock;
          this.flashMessage.show('Enter Registered Email & PassWord ' + userCount + ' chances left', {
            cssClass: 'alert-danger', timeout: 4000
          });
          // console.log(4 - this.errBlock + ' chances  left');
        }
        this.errBlock++;
        console.log('errBlock = ' + this.errBlock);
        localStorage.setItem('count', this.errBlock.toString());
        console.log('localStorage after submit ' + localStorage.getItem('count'));
      });
  }

}
