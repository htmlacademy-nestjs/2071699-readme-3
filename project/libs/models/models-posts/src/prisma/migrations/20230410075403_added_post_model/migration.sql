/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "video" TEXT,
    "tags" TEXT,
    "preview" TEXT,
    "text" TEXT,
    "quote" TEXT,
    "auth_quote" TEXT,
    "photo" TEXT,
    "link" TEXT,
    "description_link" TEXT,
    "post_type" TEXT NOT NULL,
    "post_state" TEXT NOT NULL,
    "is_repost" TEXT NOT NULL,
    "user_id" TEXT,
    "origin_userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);
