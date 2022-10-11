import { Controller, Get } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {

  }

  @Get()
  createPost() {
    return this.postService.createPost();
  }
}