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
    amount: number;        
  }