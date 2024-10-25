package com.michaelyi.filmblog.post;

import com.michaelyi.filmblog.util.HttpResponse;

public class GetPostResponse extends HttpResponse {
    private Post post;

    public GetPostResponse() {
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
