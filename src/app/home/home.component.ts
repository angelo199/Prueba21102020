import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public dataUser : any;
	constructor(private router:Router) { }

	ngOnInit(): void {
		// se obtienen los valores por medio de la sessionStorage para mostrar informacion del usuario
		this.dataUser = JSON.parse(sessionStorage.getItem('user'));
	}

	onclose() : void{
		/* Se Eliminan los valores Storage (local y session)
		 dichos valores fueron suministrados por el api de Login*/
		localStorage.removeItem('token');
		sessionStorage.removeItem('user');
		this.router.navigate(['/login']);
	}
}
