
interface UserSchema {
  email: string;
  password: string;
  role: 'user' | 'admin'; 
  name: string;
  id:number
}


const users: UserSchema[] = [
  {
    id:1,
    email: 'fooduser@io',
    password: 'Food@123',
    role: 'user',
    name: 'Food User'
  },
  {
    id:2,
    email: 'foodadmin@io',
    password: 'Food@123',
    role: 'admin',
    name: 'Food Admin'
  },
];

export default users;
