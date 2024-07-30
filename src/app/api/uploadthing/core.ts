import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();


// FileRouter for app, can contain multiple FileRoutes
export const ourFileRouter = {

    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ configId: z.string().optional() }))

        // Set permissions and file types for this FileRoute
        .middleware(async ({ input }) => {
            return { input }

        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input

            return { configId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;