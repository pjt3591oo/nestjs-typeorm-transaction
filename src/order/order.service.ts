import { Injectable } from '@nestjs/common';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import {
  PostRepository,
  PostRepositoryExtends,
} from './repository/post.repository';
import {
  UserRepository,
  UserRepositoryExtends,
} from './repository/user.repository';

@Injectable()
export class OrderService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private dataSource: DataSource,
  ) {}

  // 각각의 repository에서 save가 호출될 때 개별적으로 트랜잭션이 만들어 짐
  async createOrder(): Promise<any> {
    const users = await this.userRepository.createUser();
    const posts = await this.postRepository.createPost();
    return { users, posts };
  }

  // 하나의 트랜잭션으로 처리할 수 있지만 먼가 복잡하다...
  async queryRunnerCreateOrder(): Promise<any> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new User();
      user.firstName = new Date().getTime().toString();
      user.lastName = new Date().getTime().toString();
      user.age = Math.random() * 100;
      await queryRunner.manager.save(user);

      const post = new Post();
      post.title = new Date().getTime().toString();
      post.user = user;
      await queryRunner.manager.save(post);

      await queryRunner.commitTransaction();
      return '';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction failed');
    } finally {
      await queryRunner.release();
    }
  }

  async withRepositoryTransactionExtend() {
    const rst = await this.dataSource.transaction<string>(async (manager) => {
      const UserRepository = this.dataSource
        .getRepository(User)
        .extend(UserRepositoryExtends);
      const PostRepository = this.dataSource
        .getRepository(Post)
        .extend(PostRepositoryExtends);
      const userRepository = manager.withRepository(UserRepository);
      const postRepository = manager.withRepository(PostRepository);

      await userRepository.createUser();
      await userRepository.createUser();
      await userRepository.createUser();
      await postRepository.createPost();

      return await 'hello world';
    });

    return rst;
  }

  async withRepositoryTransactionRepository() {
    const rst = await this.dataSource.transaction<string>(async (manager) => {
      const userRepository = manager.withRepository(this.userRepository);
      const postRepository = manager.withRepository(this.postRepository);

      await userRepository.createUser();
      await userRepository.createUser();
      await userRepository.createUser();
      await postRepository.createPost();

      return await 'hello world';
    });

    console.log(rst);

    return rst;
  }

  // 정상적으로 동작하지 않음
  async withRepositoryTransactionPromise() {
    const manager = await this.getTransactionManager(); // 해당 함수가 종료될 때 connection이 닫힘
    const userRepository = manager.withRepository(this.userRepository);

    // await userRepository.createUser(); // 에러발생
    console.log('end');
    return 'hello world';
  }

  async getTransactionManager(): Promise<EntityManager> {
    return new Promise((resolve, reject) => {
      this.dataSource.transaction(async (manager) => {
        resolve(manager);
      });
    });
  }
}
