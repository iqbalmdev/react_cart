interface UserSchema  {
    email:string,
    passwors:string,
    admin:boolean
}

interface AdminUserSchema {
    email:string,
    passwors:string,
    admin:boolean
}
export const user:UserSchema = {
    email: "fooduser@io",
    passwors: "Food@123",
    admin:false
}

export const admin:AdminUserSchema =  {
  email: "foodadmin@io",
    passwors: "Food@123",
    admin:true
}