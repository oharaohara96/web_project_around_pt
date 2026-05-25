export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }


  setUserInfo(newName, newJob, newAvatar) {
    if (newName) this._nameElement.textContent = newName;
    if (newJob) this._jobElement.textContent = newJob;


    if (newAvatar && this._avatarElement) {
      this._avatarElement.src = newAvatar;
    }
  }
}
