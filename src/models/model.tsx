export interface Users {
    username : string,
    email : string,
    password:string
  }

  export interface LoginUser {
    email : string,
    password:string
  }

  export interface Movie {
    movieImg: string;      
    movieName: string;
    movieDesc:string,     
    movieRatings: number;  
    movieCert:string;
    amount: number;  
    movieVideo:string      
  }

  export interface bookedTickets {
    movieImg: string;      
    movieName: string;
    noOfTickets:number,
    tickets:string[],
    amount : number       
  }