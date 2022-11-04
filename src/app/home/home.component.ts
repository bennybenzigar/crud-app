import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../service/api.service';
import { StudentModel } from './student.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  studentDetails!: FormGroup
  studentObject: StudentModel = new StudentModel();
  studentData!: any;
  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.studentDetails = this.formBuilder.group({
      id: [''],
      name: [''],

    })
    this.getStudentDetails();
  }

  postStudentDetails() {
    
    this.studentObject.id = this.studentDetails.value.id;
    this.studentObject.name = this.studentDetails.value.name;

    this.api.poststudent(this.studentObject).subscribe((res: any) => {
      console.log(res);
      alert("student added sucessfully");
      
      this.getStudentDetails();
      this.studentDetails.reset()
      
    },
    err=>{alert("something went wrong or user already exist")})

  }


  getStudentDetails() {
    this.api.getStudent().subscribe((res: any) => {
      this.studentData = res;
    })
  }


  editStudentDetails(student: any) {
    this.studentObject.id = student.id,
      this.studentDetails.controls['id'].setValue(student.id)
    this.studentDetails.controls['name'].setValue(student.name)

  }


  updateStudentDetails() {
    this.studentObject.id = this.studentDetails.value.id,
      this.studentObject.name = this.studentDetails.value.name,
      this.api.putStudent(this.studentObject, this.studentObject.id).subscribe((res: any) => {
        alert("Details updated sucessfully");
        this.getStudentDetails()
        this.studentDetails.reset()
      },
      err=>{alert("cant update user doesn't exist")})
  }

  deleteStudentDetails(student:any){
    this.api.deleteStudent(student.id).subscribe((res:any)=>{
      alert("deleted sucessfully ")
      this.getStudentDetails()
    })
  }
}
