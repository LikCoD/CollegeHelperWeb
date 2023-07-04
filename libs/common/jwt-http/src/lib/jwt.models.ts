import * as moment from "moment"

export interface Data {
  exp: moment.Moment,
  claims: UserPreview
}

export interface UserPreview {
  id: string,
  userID: string,
  login: string,
  pictureURL: string,
  email: string,
  verifiedEmail: boolean,
  studyPlaceInfo?: StudyPlaceInfo,
}

export interface StudyPlaceInfo {
  id: string,
  name: string,
  role: string,
  roleName: string,
  tuitionGroup?: string,
  permissions: string[],
  accepted: boolean,
}