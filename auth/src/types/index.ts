export interface Credentials {
  email: string,
  password?: string
}
export interface User extends Credentials {
  id?: string,
  first_name: string,
  last_name: string,
  type: string
}

export interface UserContextProps {
  user: User | null,
  setUser: (user: User | null) => void
}


