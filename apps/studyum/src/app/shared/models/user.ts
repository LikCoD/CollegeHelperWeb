export interface User {
  id: string,
  login: string
  picture: string,
  email: string
  verifiedEmail: boolean,
  studyPlaceInfo?: UserStudyPlaceInfo,
}

export interface UserStudyPlaceInfo {
  id: string,
  name: string,
  role: string,
  roleName: string,
  permissions: string[],
  accepted: boolean,
}


export interface AcceptUser {
  id: string,
  name: string
  role: string
  roleName: string
}
