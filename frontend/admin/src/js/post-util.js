export default function validateCreatePostForm(text, image, showImage) {
    if (!text || text.length === 0) {
        throw new Error("Fields cannot be blank.");
    }

    const titleIndex = text.search("</h1>");
    const title = text.substring(4, titleIndex);
    const content = text.substring(titleIndex + 5);

    if (!title || title.length === 0) throw new Error("Title cannot be blank.");

    if (!content || content.length === 0)
        throw new Error("Content cannot be blank.");

    if (!image && !showImage) throw new Error("An image is required.");

    if (
        image &&
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/webp"
    ) {
        throw new Error("Image must be a .jpeg, .png, or .webp file.");
    }
}
