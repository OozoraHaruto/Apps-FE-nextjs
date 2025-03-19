import moment from "moment"

export const goTimeToMoment = (str: string) => {
  const time = moment(str)
  return time
}

export const goTimeToMonthYear = (str: string) => {
  const t = goTimeToMoment(str)
  return t.format("MMMM YYYY")
}