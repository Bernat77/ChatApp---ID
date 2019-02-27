import { User } from './user';

export class Message {

    message: string;
    createdAt: Date;
    sender: User;


    constructor({ message, createdAt, sender }) {
        this.message = message;
        this.createdAt = createdAt;
        //this sets the sender which is a user object.
        this.sender = sender;
    }
}
