import * as moment from "moment"

export interface Data {
  exp: moment.Moment,
  claims: {
    ID: number
  }
}