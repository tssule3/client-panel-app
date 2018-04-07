import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    console.log('localStorage ' + localStorage.getItem('count'));
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You Are Now Registered And Logged In', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        if ( Number(localStorage.getItem('count')) > 3 ) {
          this.flashMessage.show('Please Wait 10 seconds Before Registering In Again', {cssClass: 'alert-danger', timeout: 10000} );
          this.checkErrBlock = true;
          setTimeout(() => {
            this.checkErrBlock = false;
          }, 10000);
        } else {
          let userCount = 4 - this.errBlock;
          this.flashMessage.show('Enter Valid Email ' + userCount + ' chances left', {
            cssClass: 'alert-danger', timeout: 4000
          });
          // console.log(4 - this.errBlock + ' chances  left');
        }
        this.errBlock += 1;
        localStorage.setItem('count', this.errBlock.toString());
      });
  }

}
