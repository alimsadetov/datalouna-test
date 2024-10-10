-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 100,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skin" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "skinName" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkinToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ip_key" ON "User"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "_SkinToUser_AB_unique" ON "_SkinToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkinToUser_B_index" ON "_SkinToUser"("B");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_skinName_fkey" FOREIGN KEY ("skinName") REFERENCES "Skin"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkinToUser" ADD CONSTRAINT "_SkinToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skin"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkinToUser" ADD CONSTRAINT "_SkinToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
