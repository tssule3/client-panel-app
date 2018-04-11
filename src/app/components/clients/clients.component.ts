import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  showSpinner = false;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showSpinner = true;
    }, 3000)
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
    for ( let start = 1; start < 10; start++)  {
      setTimeout(function () { console.log(start);  }, 1000 * start);

    }
      }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }

}
