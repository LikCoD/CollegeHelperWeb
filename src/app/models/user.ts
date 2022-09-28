export interface User {
  id: string,
  email: string
  login: string
  name: string
  type: string
  typeName: string
  studyPlaceId: string
  password: string
  passwordRepeat: string
  studyPlace: string,
  permissions: string[],
  accepted: boolean,
  verifiedEmail: boolean,
  picture: string,
}


export interface AcceptUser {
  id: string,
  name: string
  type: string
  typename: string
}
