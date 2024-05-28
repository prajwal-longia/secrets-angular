import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactContent = "Get in Touch with me. I'm delighted to hear from you! Whether you have a question, a suggestion, or just want to share your thoughts, I'm here to listen. For general questions or feedback about my webpage, please feel free to reach out to me at : email : info@mydiary.com phone: 923-547-xxxx ."

  constructor(public contactService: ContactService) { }

  onAddQuery(form: NgForm) {
    this.contactService.addQuery({
      name: form.value.name,
      email: form.value.email,
      query: form.value.query
    });
  }

}
