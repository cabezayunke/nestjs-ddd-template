interface UserParams {
  name?: string;
  email: string;
}
export interface UserDto extends UserParams {
  id: string;
}
