import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private userRepository: Repository<User>,
  ) {

  }

  // 개별적으로 트랜잭션 발생
  async createUser(): Promise<User> {
    await this.userRepository.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
    await this.userRepository.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
    return await this.userRepository.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
  }
}