import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) {
    this.toastr.info('', 'Welcome to core');
  }

  ngOnInit() {
  }

  navigate(url) {
    this.router.navigate([url]);

  }

}
