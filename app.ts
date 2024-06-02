import inquirer from "inquirer";
import chalk from "chalk";

//Class,Objects,Methods,Attributes

//Defining a student class
class Student{
     static counter=1000;  //Static variable which will be same for all students
     id:number;
     name:string;
     courses:string[];
     balance:number;

     constructor(name:string){     //Only will take studnet name and will assign automatically id , balance etc.
        this.id=Student.counter++;
        this.name=name;
        this.courses=[]; //Initializing an empty array for courses
        this.balance= 100;
     }

     //Method to enroll in a course
     enroll_course(course:string){
         this.courses.push(course);
     }

     //Method to view a student balance
     view_balance(){
        console.log(chalk.yellowBright(`\n\tBalance for ${this.name}: $${this.balance}`));
     }

     //Method to pay student fees
     pay_fees(amount:number){
        this.balance -= amount;   //Used assignment operator to deduct amount from the balance if fees was paid
        console.log(chalk.yellowBright(`\n\t$${amount} fees paid successfully for ${this.name}`));
        console.log(chalk.yellowBright(`\n\tRemaining balance: $${this.balance}`));
     }

     //Method to display student status
     show_status(){
        console.log(chalk.yellowBright(`\n\tID: ${this.id}`));
        console.log(chalk.yellowBright(`\n\tName: ${this.name}`));
        console.log(chalk.yellowBright(`\n\tCourses: ${this.courses}`));
        console.log(chalk.yellowBright(`\n\tBalance: ${this.balance}`));
     }
}

//Defining a class 2 student_manager to manage students
class student_manager{
    students : Student[]=[]

    constructor(){
      this.students=[];
    }

    //Method to add a student
    add_student(name:string){
      let student=new Student(name);      //Making object with new keyword(Using super class attributes)
      this.students.push(student);
      console.log(chalk.yellowBright(`\n\tStudent ${(name.toUpperCase())} added successfully. \n\tStudent ID ${student.id}`));
}
   //Method to enroll a student in a course
   enroll_student(student_id:number,course:string){
   let student=this.find_student(student_id);
      if(student){
         student.enroll_course(course);    //Using super class function 
      console.log(chalk.yellowBright(`\n\t${student.name} enrolled in ${course} successfully.`))
      }else{
         console.log(chalk.redBright(`\n\tStudent not found. Please enter a correct student ID.`))
      }
     }
   
   //Method to view a student balance
   view_student_balance(student_id:number){
      let student=this.find_student(student_id)
      if(student){
         student.view_balance();    //Using base class function in sub class
      }else{
         console.log(chalk.redBright(`\n\tStudent not found. Please enter a correct student ID.`))
      }
   }
 //Method to find a student by student id
  find_student(student_id:number){   //Used js built in function 'find'
   return this.students.find((std: { id: number; }) => std.id === student_id);
  }
 //Method to pay student fees
 pay_student_fees(student_id:number,amount:number){
  let student= this.find_student(student_id)
  if(student){
   student.pay_fees(amount)
  }else{
   console.log(chalk.redBright(`\n\tStudent not found. Please enter a correct student ID.`))
  }
 }
 //Method to show student status
 show_student_number(student_id:number){
   let student= this.find_student(student_id)
   if(student){
      student.show_status()
   }
 }
};

//Main function to run the program
async function main(){
   console.log(chalk.yellowBright('\t'+'*'.repeat(36)));
   console.log(chalk.yellowBright.bold('\tWelcome to Student Management System'));
   console.log(chalk.yellowBright('\t'+'*'.repeat(36)));
   
   let StudentManager=new student_manager();
 //While loop to keep program running

 while(true){
   let choice=await inquirer.prompt([
      {
         name:'choice',
         type:'list',
         message:chalk.yellowBright('\n\tSelect an option:\n'),
         choices:[
            'Add Student',
            'Enroll Student',
            'View StudentBalance',
            'Pay Fees',
            'Show Status',
            'Exit'
         ]
      }
   ]);
   //Using switch case to handle user choice
   switch(choice.choice){
      case 'Add Student':
      let name_input=await inquirer.prompt(
         {
            name:'name',
            type:'input',
            message:chalk.blueBright('\n\tEnter a student name:\n')
         }
      )
      StudentManager.add_student(name_input.name.toUpperCase())
      break;

      case 'Enroll Student':
      let course_input=await inquirer.prompt([
         {
            name:'student_id',
            type:'number',
            message:chalk.blueBright('\n\tEnter a student ID:')
         },
         {
            name:'course',
            type:'input',
            message:chalk.blueBright('\n\tEnter a course name:')
         }
      ])
      StudentManager.enroll_student(course_input.student_id,course_input.course)
      break;

      case 'View StudentBalance':
      let balance_input=await inquirer.prompt(
         { 
          name:'student_id',
          type:'number',
          message:chalk.blueBright('\n\tEnter a student ID:')
         }
      )
      StudentManager.view_student_balance(balance_input.student_id)
      break;

      case 'Pay Fees':
      let fees_input=await inquirer.prompt([
         {
          name:'student_id',
          type:'number',
          message:chalk.blueBright('\n\tEnter a student ID:')
         },
         {
          name:'amount',
          type:'number',
          message:chalk.blueBright('\n\tEnter the amount to pay:')
         }
      ])
      StudentManager.pay_student_fees(fees_input.student_id,fees_input.amount)
      break;

      case 'Show Status':
      let status_input=await inquirer.prompt(
         {
          name:'student_id',
          type:'number',
          message:chalk.blueBright('\n\t Enter a student ID:')
         }
      )
      StudentManager.show_student_number(status_input.student_id)
      break;

      case 'Exit':
         console.log(chalk.yellowBright('\n\tExisting....'));
         
         console.log(chalk.yellowBright('\t\t\t'+'*'.repeat(7)));
         console.log(chalk.yellowBright.bold('\t\t\tThe End'));
         console.log(chalk.yellowBright('\t\t\t'+'*'.repeat(7)));
         
         process.exit(); 
      
   } 
 }
};

//Calling a main function
main();

