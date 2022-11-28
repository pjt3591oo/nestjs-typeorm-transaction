import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CustomRepository } from 'src/database/repository/repository.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser() {
    await this.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
    await this.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
  }
}

export const UserRepositoryExtends = {
  createUser() {
    return this.save({
      firstName: new Date().getTime().toString(),
      lastName: new Date().getTime().toString(),
      age: Math.random() * 100,
    });
  },
};
