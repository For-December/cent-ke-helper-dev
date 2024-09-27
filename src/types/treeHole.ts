interface PostMeta {
    type: string;
    text: string;
    url: string;
}

class PostRecord {
    id: number;
    authorId: number;
    authorName: string;
    commentCount: number;
    upvoteCount: number;
    title: string;
    content: PostMeta[];
    contentJson:string;
    latestRepliedAt: Date; // 毫秒为单位
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, authorId: number, authorName: string,
                commentCount: number, upvoteCount: number,
                title: string, content: PostMeta[],
                contentJson:string,
                latestRepliedAt: Date, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.authorId = authorId;
        this.authorName = authorName;
        this.commentCount = commentCount;
        this.upvoteCount = upvoteCount;
        this.title = title;
        this.content = content;
        this.contentJson = contentJson;
        this.latestRepliedAt = latestRepliedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
