export type T_Classroom = {
    classroom_id: number,
    name: string,
    description: string,
    address: string,
    url: string,
    status: number
}
export interface User {
    id?: number; // Делает поле необязательным
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
  }