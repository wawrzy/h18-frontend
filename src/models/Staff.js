export default class Staff {
  constructor(firstName, lastName, role) {
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
