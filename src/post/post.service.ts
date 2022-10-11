import { Inject, Injectable } from "@nestjs/common";
import { Post } from "src/entity/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @Inject(Post)
    private postRepository: Repository<Post>,
  ) {

  }

  // 개별적으로 트랜잭션 발생
  async createPost(): Promise<Post> {
    await this.postRepository.save({
      title: new Date().getTime().toString(),
      userId: 1,
    })
    await this.postRepository.save({
      title: new Date().getTime().toString(),
      userId: 1,
    })
    return await this.postRepository.save({
      title: new Date().getTime().toString(),
      userId: 1,
    });
  }
}