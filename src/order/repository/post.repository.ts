import { Repository } from 'typeorm';
import { Post } from 'src/entity/post.entity';
import { CustomRepository } from 'src/database/repository/repository.decorator';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost() {
    await this.save({
      title: new Date().getTime().toString(),
      userId: 1,
    });
  }
}

export const PostRepositoryExtends = {
  createPost() {
    return this.save({
      title: new Date().getTime().toString(),
      userId: 1,
    });
  }
}