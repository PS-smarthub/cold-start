-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "set_point" DOUBLE PRECISION,
    "in_validation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temperature" (
    "id" SERIAL NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "room_temperature" DOUBLE PRECISION NOT NULL,
    "temperature_1" DOUBLE PRECISION NOT NULL,
    "temperature_2" DOUBLE PRECISION NOT NULL,
    "container_id" TEXT NOT NULL,

    CONSTRAINT "Temperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulingContainer" (
    "id" SERIAL NOT NULL,
    "initial_date_time" TIMESTAMP(3) NOT NULL,
    "ending_date_time" TIMESTAMP(3) NOT NULL,
    "user_id_position_1" TEXT NOT NULL,
    "user_id_position_2" TEXT NOT NULL,
    "container_id" TEXT NOT NULL,
    "user_name_1" TEXT NOT NULL,
    "user_name_2" TEXT NOT NULL,
    "position1" BOOLEAN NOT NULL DEFAULT false,
    "position2" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SchedulingContainer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temperature" ADD CONSTRAINT "Temperature_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulingContainer" ADD CONSTRAINT "SchedulingContainer_container_id_fkey" FOREIGN KEY ("container_id") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
