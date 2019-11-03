# Migration `20191102174714-make-hp-slug-unique`

This migration has been generated by lvnr at 11/2/2019, 5:47:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Headphone.slug" ON "public"."Headphone"("slug")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191102174005-add-hp-slug-and-review-takeaways..20191102174714-make-hp-slug-unique
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://audiophile:LevAr8523*@audiophile-tools.clqkmkirkmxi.us-east-1.rds.amazonaws.com:5432/prisma"
 }
@@ -28,9 +28,9 @@
 model Headphone {
   id          String    @default(cuid()) @id
   createdAt   DateTime  @default(now())
   updatedAt   DateTime  @updatedAt
-  slug        String    
+  slug        String    @unique
   model       String    @unique
   company     Company
   url         String?
   amazonUrl   String?
```

## Photon Usage

You can use a specific Photon built for this migration (20191102174714-make-hp-slug-unique)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191102174714-make-hp-slug-unique'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```