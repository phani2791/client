import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessageService {
  constructor(private toastr: ToastrService) {
  }
  messages: string[] = [];

  add(message: string) {
    console.log(message)
    // this.toastr.info(message, 'Info');
  }

  clear() {
    this.toastr.clear()
  }
}
