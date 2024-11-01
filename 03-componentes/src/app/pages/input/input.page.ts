import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class InputPage implements OnInit {

  public name: string = "Jose";
  public patternEmail: RegExp=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


  public myForm: FormGroup
  // = new FormGroup({
  //   name: new FormControl(""),
  // })
  public fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(this.patternEmail)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log( "submit" );
    console.log( this.myForm.value.email );

  }

}
