import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService }from './../services/login/login.service';
import { MessageService } from './../services/message/message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public messag : any;
    loginForm = new FormGroup({
        phone: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private loginService : LoginService, private router:Router, private messageService: MessageService) { }

    ngOnInit(): void {
      /* Esta servicio de mensaje permite capturar errores de api rest */
      this.messag = this.messageService.messages;
    }

    // funcion que permite validar el telefono y contraseña suministrada ór el cliente
    onSubmit() : void{
      this.messageService.clear();
      this.messag = this.messageService.messages;
      this.loginService.login(this.loginForm.value).subscribe(data => {
          if (data != undefined) {
            if (data['user'] != undefined && data['token'] != undefined) {
              const datUser : any ={
                name : data['user']['name']+" "+data['user']['lastName'],
                email : data['user']['email']
              };
              sessionStorage.setItem('user', JSON.stringify(datUser));
              this.router.navigate(['/home']);
              localStorage.setItem('token', data['token']);
            }
          }
      }, error => console.log("Mensaje de error : "+error));
    }

}
