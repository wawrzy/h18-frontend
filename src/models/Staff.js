export default class Staff {
  constructor(firstName, lastName, role) {
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
  }

  isAvailableOn(datetime) {
    return true
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
