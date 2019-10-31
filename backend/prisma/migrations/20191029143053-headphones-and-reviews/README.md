# Migration `20191029143053-headphones-and-reviews`

This migration has been generated by Levon Arakelyan at 10/29/2019, 2:30:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Post";

CREATE TABLE "public"."Company" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "website" text   ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."HeadphoneReview" (
  "aesthetics" integer   ,
  "aestheticsUrl" text   ,
  "analytical" integer   ,
  "analyticalUrl" text   ,
  "balanced" integer   ,
  "balancedUrl" text   ,
  "bassClarity" integer   ,
  "bassExtension" integer   ,
  "bassImpact" integer   ,
  "bassQty" integer   ,
  "bassTightness" integer   ,
  "bassUrl" text   ,
  "breathability" integer   ,
  "breathabilityUrl" text   ,
  "brigthness" integer   ,
  "brigthnessUrl" text   ,
  "build" integer   ,
  "buildUrl" text   ,
  "comfort" integer   ,
  "comfortUrl" text   ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "credibility" integer NOT NULL DEFAULT 5 ,
  "detail" integer   ,
  "detailUrl" text   ,
  "distortion" integer   ,
  "distortionUrl" text   ,
  "dynamics" integer   ,
  "dynamicsUrl" text   ,
  "forwardness" integer   ,
  "forwardnessUrl" text   ,
  "headphone" text   REFERENCES "public"."Headphone"("id") ON DELETE SET NULL,
  "id" text NOT NULL  ,
  "imaging" integer   ,
  "imagingUrl" text   ,
  "isolation" integer   ,
  "isolationUrl" text   ,
  "leakage" integer   ,
  "leakageUrl" text   ,
  "matchability" integer   ,
  "matchabilityUrl" text   ,
  "microDetail" integer   ,
  "microDetailUrl" text   ,
  "midrange" integer   ,
  "midrangeUrl" text   ,
  "naturalness" integer   ,
  "naturalnessUrl" text   ,
  "nonFatiguing" integer   ,
  "nonFatiguingUrl" text   ,
  "priceVsPerf" integer   ,
  "priceVsPerfUrl" text   ,
  "reviewer" text   ,
  "separation" integer   ,
  "separationUrl" text   ,
  "sibilance" integer   ,
  "sibilanceUrl" text   ,
  "smoothess" integer   ,
  "smoothessUrl" text   ,
  "soundstage" integer   ,
  "soundstageDepth" integer   ,
  "soundstageHeight" integer   ,
  "soundstageUrl" text   ,
  "soundstageWidth" integer   ,
  "speed" integer   ,
  "speedUrl" text   ,
  "transparency" integer   ,
  "transparencyUrl" text   ,
  "treble" integer   ,
  "trebleExtension" integer   ,
  "trebleUrl" text   ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "url" text   ,
  "warmth" integer   ,
  "warmthUrl" text   ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Headphone_images" (
  "nodeId" text   REFERENCES "public"."Headphone"("id") ON DELETE CASCADE,
  "position" integer NOT NULL  ,
  "value" text NOT NULL  ,
  PRIMARY KEY ("nodeId","position")
);

CREATE TABLE "public"."Headphone_cableLength" (
  "nodeId" text   REFERENCES "public"."Headphone"("id") ON DELETE CASCADE,
  "position" integer NOT NULL  ,
  "value" Decimal(65,30) NOT NULL  ,
  PRIMARY KEY ("nodeId","position")
);

CREATE TABLE "public"."Headphone_cableTermAmp" (
  "nodeId" text   REFERENCES "public"."Headphone"("id") ON DELETE CASCADE,
  "position" integer NOT NULL  ,
  "value" text NOT NULL  ,
  PRIMARY KEY ("nodeId","position")
);

CREATE TABLE "public"."Headphone_earpadMaterial" (
  "nodeId" text   REFERENCES "public"."Headphone"("id") ON DELETE CASCADE,
  "position" integer NOT NULL  ,
  "value" text NOT NULL  ,
  PRIMARY KEY ("nodeId","position")
);

ALTER TABLE "public"."Headphone" ADD COLUMN "ANC" boolean   ,
ADD COLUMN "DSP" boolean   ,
ADD COLUMN "THD100" Decimal(65,30)   ,
ADD COLUMN "THD90" Decimal(65,30)   ,
ADD COLUMN "amazonUrl" text   ,
ADD COLUMN "cableBalanced" boolean   ,
ADD COLUMN "cableQty" integer   ,
ADD COLUMN "cableRemovable" boolean   ,
ADD COLUMN "cableTermEar" text   ,
ADD COLUMN "carryingCase" boolean   ,
ADD COLUMN "company" text   REFERENCES "public"."Company"("id") ON DELETE SET NULL,
ADD COLUMN "driverDesc" text   ,
ADD COLUMN "driverMaterial" text   ,
ADD COLUMN "driverQty" integer   ,
ADD COLUMN "driverSize" Decimal(65,30)   ,
ADD COLUMN "driverType" text   ,
ADD COLUMN "earpadQty" integer   ,
ADD COLUMN "enclosure" text   ,
ADD COLUMN "freqRespFrom" integer   ,
ADD COLUMN "freqRespTo" integer   ,
ADD COLUMN "impedance" Decimal(65,30)   ,
ADD COLUMN "model" text NOT NULL DEFAULT '' ,
ADD COLUMN "portability" integer   ,
ADD COLUMN "price" Decimal(65,30)   ,
ADD COLUMN "sensitivity" Decimal(65,30)   ,
ADD COLUMN "serviceability" integer   ,
ADD COLUMN "tunability" integer   ,
ADD COLUMN "type" text   ,
ADD COLUMN "url" text   ,
ADD COLUMN "weigth" Decimal(65,30)   ,
ADD COLUMN "wireless" boolean   ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191029034950-add-headphone..20191029143053-headphones-and-reviews
--- datamodel.dml
+++ datamodel.dml
@@ -3,35 +3,202 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://audiophile:LevAr8523*@audiophile-tools.clxxhblkftly.us-east-1.rds.amazonaws.com:5432/postgres"
 }
+
+
 model User {
   id    String  @default(cuid()) @id
   email String  @unique
   name  String?
   role  Role    @default(USER)
-  posts Post[]
 }
-model Post {
-  id        String   @default(cuid()) @id
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  published Boolean  @default(true)
-  title     String
-  content   String?
-  author    User?
+model Company {
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  name        String
+  website     String?
+  headphones  Headphone[]
 }
 model Headphone {
-  id        String    @default(cuid()) @id
-  createdAt DateTime  @default(now())
-  updatedAt DateTime  @updatedAt
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  model       String
+  company     Company
+  url         String?
+  amazonUrl   String?
+  images      String[]
+  type        HeadphoneType?
+  enclosure   HeadphoneEnclosure?
+  freqRespFrom Int? // Hz
+  freqRespTo   Int? // kHz
+  driverDesc  String?
+  driverQty   Int?
+  driverSize  Float? // mm
+  driverType  HeadphoneDriverType?
+  driverMaterial  HeadphoneDriverMaterial?
+  price       Float? // USD
+  weigth      Float? // g
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
+
+  reviews         HeadphoneReview[]
 }
+model HeadphoneReview {
+  id          String    @default(cuid()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  headphone   Headphone
+
+  credibility Int       @default(5)
+  url         String?
+  reviewer    String?
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
+  bassQty           Int?
+  bassClarity       Int?
+  bassExtension     Int?
+  bassTightness     Int?
+  bassImpact        Int?
+  bassUrl           String?
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
+}
+
+
+
+
 enum Role {
   USER
   ADMIN
 }
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
+enum HeadphoneType {
+  OVER_EAR
+  ON_EAR
+  IN_EAR
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20191029143053-headphones-and-reviews)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191029143053-headphones-and-reviews'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```