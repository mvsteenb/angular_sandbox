import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /**
   * Constructor
   * @param messageService message service
   */

  constructor(public messageService: MessageService) { } // public because we'll use it in the template !

  // ------------------- public methods --------------------- //

  /**
   * Initialize component
   */

  ngOnInit() { 
  }

}
