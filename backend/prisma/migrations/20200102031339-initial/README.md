# Migration `20200102031339-initial`

This migration has been generated by lvnr at 1/2/2020, 3:13:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "email" text  NOT NULL DEFAULT '' ,
  "id" text  NOT NULL  ,
  "name" text    ,
  "password" text  NOT NULL DEFAULT '' ,
  "role" text  NOT NULL DEFAULT 'USER' ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."AuthPayload" (
  "id" text  NOT NULL  ,
  "token" text  NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Company" (
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "id" text  NOT NULL  ,
  "name" text  NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "website" text    ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Headphone" (
  "ANC" boolean    ,
  "DSP" boolean    ,
  "THD100" Decimal(65,30)    ,
  "THD90" Decimal(65,30)    ,
  "amazonUrl" text    ,
  "cableBalanced" boolean    ,
  "cableLength" Decimal(65,30) []   ,
  "cableQty" integer    ,
  "cableRemovable" boolean    ,
  "cableTermAmp" text []   ,
  "cableTermEar" text    ,
  "carryingCase" boolean    ,
  "category" text    ,
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "driverDesc" text    ,
  "driverMaterial" text    ,
  "driverQty" integer    ,
  "driverSize" text    ,
  "driverType" text    ,
  "earpadMaterial" text []   ,
  "earpadQty" integer    ,
  "enclosure" text    ,
  "freqRespFrom" integer    ,
  "freqRespTo" integer    ,
  "gaming" boolean    ,
  "id" text  NOT NULL  ,
  "images" text []   ,
  "impedance" Decimal(65,30)    ,
  "model" text  NOT NULL DEFAULT '' ,
  "portability" integer    ,
  "price" Decimal(65,30)    ,
  "sensitivity" Decimal(65,30)    ,
  "serviceability" integer    ,
  "slug" text  NOT NULL DEFAULT '' ,
  "tunability" integer    ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "url" text    ,
  "weight" Decimal(65,30)    ,
  "wireless" boolean    ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."HeadphoneReview" (
  "aesthetics" integer    ,
  "aestheticsUrl" text    ,
  "analytical" integer    ,
  "analyticalUrl" text    ,
  "balanced" integer    ,
  "balancedUrl" text    ,
  "bass" integer    ,
  "bassClarity" integer    ,
  "bassExtension" integer    ,
  "bassImpact" integer    ,
  "bassQty" integer    ,
  "bassTightness" integer    ,
  "bassUrl" text    ,
  "breathability" integer    ,
  "breathabilityUrl" text    ,
  "brigthness" integer    ,
  "brigthnessUrl" text    ,
  "build" integer    ,
  "buildUrl" text    ,
  "cableQuality" integer    ,
  "cableQualityUrl" text    ,
  "comfort" integer    ,
  "comfortUrl" text    ,
  "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "credibility" integer  NOT NULL DEFAULT 5 ,
  "detail" integer    ,
  "detailUrl" text    ,
  "distortion" integer    ,
  "distortionUrl" text    ,
  "dynamics" integer    ,
  "dynamicsUrl" text    ,
  "forwardness" integer    ,
  "forwardnessUrl" text    ,
  "fun" integer    ,
  "funUrl" text    ,
  "id" text  NOT NULL  ,
  "imaging" integer    ,
  "imagingUrl" text    ,
  "isolation" integer    ,
  "isolationUrl" text    ,
  "leakage" integer    ,
  "leakageUrl" text    ,
  "matchability" integer    ,
  "matchabilityUrl" text    ,
  "microDetail" integer    ,
  "microDetailUrl" text    ,
  "midrange" integer    ,
  "midrangeUrl" text    ,
  "naturalness" integer    ,
  "naturalnessUrl" text    ,
  "noBrainer" boolean    ,
  "noBrainerUrl" text    ,
  "nonFatiguing" integer    ,
  "nonFatiguingUrl" text    ,
  "notes" text    ,
  "priceVsPerf" integer    ,
  "priceVsPerfUrl" text    ,
  "reviewer" text    ,
  "separation" integer    ,
  "separationUrl" text    ,
  "sibilance" integer    ,
  "sibilanceUrl" text    ,
  "smoothess" integer    ,
  "smoothessUrl" text    ,
  "soundstage" integer    ,
  "soundstageDepth" integer    ,
  "soundstageHeight" integer    ,
  "soundstageUrl" text    ,
  "soundstageWidth" integer    ,
  "sourceForgiving" integer    ,
  "sourceForgivingUrl" text    ,
  "speed" integer    ,
  "speedUrl" text    ,
  "takeaways" text []   ,
  "transparency" integer    ,
  "transparencyUrl" text    ,
  "treble" integer    ,
  "trebleExtension" integer    ,
  "trebleUrl" text    ,
  "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "url" text    ,
  "video" boolean    ,
  "vocals" integer    ,
  "vocalsUrl" text    ,
  "warmth" integer    ,
  "warmthUrl" text    ,
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."AuthPayload" ADD COLUMN "user" text  NOT NULL  REFERENCES "public"."User"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Headphone" ADD COLUMN "company" text  NOT NULL  REFERENCES "public"."Company"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."HeadphoneReview" ADD COLUMN "headphone" text  NOT NULL  REFERENCES "public"."Headphone"("id") ON DELETE RESTRICT;

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Company.name" ON "public"."Company"("name")

CREATE UNIQUE INDEX "Headphone.slug" ON "public"."Headphone"("slug")

CREATE UNIQUE INDEX "Headphone.model" ON "public"."Headphone"("model")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200102031339-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,229 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://audiophile:LevAr8523*@audiophile-tools.clqkmkirkmxi.us-east-1.rds.amazonaws.com:5432/prisma?sslaccept=accept_invalid_certs"
+}
+
+
+
+model User {
+  id        String    @default(cuid()) @id
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  email     String    @unique
+  name      String?
+  role      Role      @default(USER)
+  password  String
+}
+
+model AuthPayload {
+  id    String    @default(cuid()) @id
+  user  User
+  token String
+}
+
+model Company {
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  name        String    @unique
+  website     String?
+  headphones  Headphone[]
+}
+
+model Headphone {
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  slug        String    @unique
+  model       String    @unique
+  company     Company
+  url         String?
+  amazonUrl   String?
+  images      String[]
+  category    HeadphoneCategory?
+  enclosure   HeadphoneEnclosure?
+  freqRespFrom Int? // Hz
+  freqRespTo   Int? // kHz
+  driverDesc  String?
+  driverQty   Int?
+  driverSize  String?
+  driverType  HeadphoneDriverType?
+  driverMaterial  HeadphoneDriverMaterial?
+  price       Float? // USD
+  weight      Float? // g
+  impedance   Float? // ohm
+  sensitivity Float? // dB
+  THD90       Float? // % @ 1kHz / 90dB SPL
+  THD100      Float? // % @ 1kHz / 100dB SPL
+  wireless    Boolean? @default(false)
+  DSP         Boolean? @default(false)
+  ANC         Boolean? @default(false)
+  cableQty        Int?
+  cableRemovable  Boolean?
+  cableBalanced   Boolean?
+  cableLength     Float[] // m
+  cableTermEar    HeadphoneCableTerm?
+  cableTermAmp    HeadphoneCableTerm[]
+  earpadQty       Int?
+  earpadMaterial  HeadphoneEarpadMaterial[]
+  carryingCase    Boolean?
+  tunability      Int?
+  portability     Int?
+  serviceability  Int?
+  gaming          Boolean?
+
+  reviews         HeadphoneReview[]
+}
+
+model HeadphoneReview {
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  headphone   Headphone
+
+  credibility Int       @default(5)
+  url         String?
+  reviewer    String?
+  video       Boolean?
+  notes       String?
+  takeaways   String[]
+
+  priceVsPerf       Int?
+  priceVsPerfUrl    String?
+  aesthetics        Int?
+  aestheticsUrl     String?
+  soundstage        Int?
+  soundstageDepth   Int?
+  soundstageWidth   Int?
+  soundstageHeight  Int?
+  soundstageUrl     String?
+  balanced          Int?
+  balancedUrl       String?
+  imaging           Int?
+  imagingUrl        String?
+  separation        Int?
+  separationUrl     String?
+  vocals            Int?
+  vocalsUrl         String?
+  fun               Int?
+  funUrl            String?
+  bass              Int?
+  bassUrl           String?
+  bassQty           Int?
+  bassClarity       Int?
+  bassExtension     Int?
+  bassTightness     Int?
+  bassImpact        Int?
+  midrange          Int?
+  midrangeUrl       String?
+  treble            Int?
+  trebleExtension   Int?
+  trebleUrl         String?
+  distortion        Int?
+  distortionUrl     String?
+  dynamics          Int?
+  dynamicsUrl       String?
+  detail            Int?
+  detailUrl         String?
+  microDetail       Int?
+  microDetailUrl    String?
+  naturalness       Int?
+  naturalnessUrl    String?
+  smoothess         Int?
+  smoothessUrl      String?
+  forwardness       Int?
+  forwardnessUrl    String?
+  speed             Int?
+  speedUrl          String?
+  warmth            Int?
+  warmthUrl         String?
+  brigthness        Int?
+  brigthnessUrl     String?
+  analytical        Int?
+  analyticalUrl     String?
+  transparency      Int?
+  transparencyUrl   String?
+  sibilance         Int?
+  sibilanceUrl      String?
+  nonFatiguing      Int?
+  nonFatiguingUrl   String?
+  build             Int?
+  buildUrl          String?
+  comfort           Int?
+  comfortUrl        String?
+  isolation         Int?
+  isolationUrl      String?
+  leakage           Int?
+  leakageUrl        String?
+  matchability      Int?
+  matchabilityUrl   String?
+  breathability     Int?
+  breathabilityUrl  String?
+  sourceForgiving    Int?
+  sourceForgivingUrl String?
+  cableQuality      Int?
+  cableQualityUrl   String?
+  noBrainer         Boolean?
+  noBrainerUrl      String?
+}
+
+
+
+
+enum Role {
+  USER
+  ADMIN
+}
+
+enum HeadphoneEarpadMaterial {
+  Leather
+  PerfLeather
+  Pleather
+  Suede
+  Fabric
+}
+
+enum HeadphoneCableTerm {
+  TRRS_2_5
+  TRS_3_5
+  TRRS_4_4
+  TRS_6_35
+  MMCX
+  TWO_PIN
+  XLR
+  Proprietary
+}
+
+enum HeadphoneEnclosure {
+  OPEN_BACK
+  CLOSED_BACK
+  SEMI_OPEN
+}
+
+enum HeadphoneDriverType {
+  DYNAMIC
+  PLANAR
+  ELECTROSTATIC
+  ISODYNAMIC
+  BA
+  HYBRID
+}
+
+enum HeadphoneDriverMaterial {
+  ALUMINIUM
+  ALUMINIUM_MAGNESIUM
+  PAPER
+  MYLAR
+  BIOCELLULOSE
+  BERYLLIUM
+}
+
+enum HeadphoneCategory {
+  OVER_EAR
+  ON_EAR
+  IN_EAR
+}
```


