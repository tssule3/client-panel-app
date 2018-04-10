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
  myClass;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.errBlock = Number(localStorage.getItem('regCount'));
    console.log('localStorage ' + localStorage.getItem('regCount'));
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
        if ( Number(localStorage.getItem('regCount')) > 3 ) {
          this.errBlock = 0;
          this.flashMessage.show('Please Wait 10 seconds Before Registering In Again', {cssClass: 'alert-danger', timeout: 10000} );
          this.checkErrBlock = true;
          this.myClass = {'customBtns': this.checkErrBlock};
          setTimeout(() => {
            this.checkErrBlock = false;
            this.myClass = {'customBtn': !this.checkErrBlock,
              'btn': true, 'btn-block': true, 'btn-outline': true};
            }, 10000);

        } else {
          this.errBlock = Number(localStorage.getItem('regCount'));
          let userCount = 3 - this.errBlock;
        this.flashMessage.show('Enter Valid Email ' + userCount + ' chances left', {

          cssClass: 'alert-danger', timeout: 4000

        });

        // console.log(4 - this.errBlock + ' chances  left');

      }

      this.errBlock++;

      console.log('errBlock = ' + this.errBlock);

      localStorage.setItem('regCount', this.errBlock.toString());

      console.log('localStorage after submit ' + localStorage.getItem('regCount'));

    });

}

}

























