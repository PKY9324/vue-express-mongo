import axios from 'axios';

const url = '/api/posts/';

class PostService {
    //get posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createAt: new Date(post.createAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }
    //create post
    static insertPost(text) {
        return axios.post(url, {
            text: text
        });
    }
    //delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;