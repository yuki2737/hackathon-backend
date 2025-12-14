"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, // DB 内の User.id
    uid, // Firebase UID
    name, email) {
        this.id = id;
        this.uid = uid;
        this.name = name;
        this.email = email;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map