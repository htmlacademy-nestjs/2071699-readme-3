-- CreateTable
CREATE TABLE "Post" (
    "postId" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "video" TEXT,
    "tags" TEXT,
    "preview" TEXT,
    "text" TEXT,
    "quote" TEXT,
    "authQuote" TEXT,
    "photo" TEXT,
    "link" TEXT,
    "descriptionLink" TEXT,
    "postType" TEXT NOT NULL,
    "postState" TEXT NOT NULL,
    "isRepost" TEXT NOT NULL,
    "userId" TEXT,
    "originUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);
