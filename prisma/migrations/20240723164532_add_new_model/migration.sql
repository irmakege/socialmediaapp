-- AlterTable
CREATE SEQUENCE post_postid_seq;
ALTER TABLE "Post" ALTER COLUMN "postId" SET DEFAULT nextval('post_postid_seq');
ALTER SEQUENCE post_postid_seq OWNED BY "Post"."postId";
