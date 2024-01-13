import { Component, OnInit } from '@angular/core';
import { UserdepService } from './userdep.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userdep',
  templateUrl: './userdep.component.html',
  styleUrls: ['./userdep.component.css']
})
export class UserdepComponent implements OnInit {
  dataList: any[] = [];
  editingData: any = {};
  userdetail!: FormGroup;
  country: any;
  state: any;
  countryobj: any = {};
  stateobj: any = {};
  flag = 'S'
  id: any;
  records: any[] = [];
  filteredRecords: any[] = [];
  searchTerm: string = '';
  constructor(private userdepService: UserdepService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userdetail = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]+")]),
      lastName: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]+")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.pattern("[1-9][0-9]{5}")]),
    })
    this.getCountry();
    this.getAllState()
    this.loadData();
  }
  getCountry() {
    this.userdepService.getCountryData().subscribe((res) => {
      this.country = res;
      for (let i = 0; i < this.country.length; i++) {
        this.countryobj[this.country[i]['id']] = this.country[i]['name']
      }
    });
  }
  getstate(id: any) {
    this.userdepService.getstate(id).subscribe((res: any) => {
      this.state = res
    })
  }
  loadData(): void {
    this.userdepService.getAllData().subscribe((res) => {
      this.dataList = res;
      this.records = res
    });
  }
  getAllState() {
    this.userdepService.getAllStateData().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.stateobj[res[i]['id']] = res[i]['name']
      }
    });
  }
  addData(event: any) {
    if (this.flag == 'S') {
      if (this.userdetail.valid) {
        this.userdepService.addData(this.userdetail.value).subscribe((res) => {
          this.clearForm();
          this.loadData();
        });
      }
    }
    else if (this.flag == 'E') {
      if (this.userdetail.valid) {
        this.userdepService.updateData(this.id, this.userdetail.value).subscribe((res) => {
          this.clearForm();
          this.loadData();
        });
      }
    }
    else {
      this.markFormGroupTouched(this.userdetail);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  updateData(id: any): void {
    if (this.userdetail.valid) {
      this.userdepService.updateData(id, this.userdetail.value).subscribe(() => {
        this.loadData();
        this.editingData = {};
      });
    }
  }
  onChange() {
    this.getstate(this.userdetail.value['country'])
  }
  clearForm() {
    this.userdetail.reset({
      'firstName': '',
      'lastName': '',
      'email': '',
      'gender': '',
      'dob': '',
      'country': '',
      'state': '',
      'pincode': ''
    });
  }
  search() {
    this.filterRecords();
  }
  filterRecords() {
    this.dataList = this.records.filter(record =>
      record.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      record.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  patchData(id: any) {
    this.userdepService.patchData(id).subscribe((res: any) => {
      this.flag = 'E'
      this.editingData = res
      this.id = this.editingData[0]['id']
      this.getstate(this.editingData[0]["country"]);
      this.userdetail.patchValue({
        firstName: this.editingData[0]['firstName'],
        lastName: this.editingData[0]['lastName'],
        email: this.editingData[0]['email'],
        gender: this.editingData[0]['gender'],
        dob: this.editingData[0]['dob'],
        pincode: this.editingData[0]['pincode'],
        country: this.editingData[0]['country'],
        state: this.editingData[0]['state']
      })
    })
  }
  deleteuser(id: number): void {
    this.userdepService.deleteData(id).subscribe(() => {
      this.loadData();
    });
  }
}
