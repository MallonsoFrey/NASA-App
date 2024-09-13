export class Services {
  static async getUsers() {
    try {
      const resp = await fetch("http://localhost:3001/users");
      return resp.json();
    } catch (e) {
      console.log(e);
    }
  }
  static async addUsers(user) {
    try {
      const resp = await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "aplication/json",
        },
      });
      return resp.json();
    } catch (e) {
      console.log(e);
    }
  }
  static async editUsers(user, id) {
    try {
      const resp = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "aplication/json",
        },
      });
      return resp.json();
    } catch (e) {
      console.log(e);
    }
  }
  static async delUsers(id) {
    try {
      const resp = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "aplication/json",
        },
      });
      return resp.json();
    } catch (e) {
      console.log(e);
    }
  }
}
