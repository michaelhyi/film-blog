import "../css/post.css";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthorizedRoute from "../components/AuthorizedRoute";
import DeleteModal from "../components/DeleteModal";
import Dropzone from "../components/Dropzone";
import Editor from "../components/Editor";
import Spinner from "../components/Spinner";
import Loading from "./loading";
import NotFound from "./not-found";
import useEditor from "../util/useEditor";
import { createPost, getPost, updatePost } from "../js/post-service";
import validateCreatePostForm from "../js/post-util";

export default function Post() {
    const [params] = useSearchParams();
    const [query, setQuery] = useState({
        data: null,
        loading: true,
        error: false,
    });
    const { data, loading, error: notFound } = query;

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showImage, setShowImage] = useState(params.get("id") !== null);
    const editor = useEditor();

    const toggleDeleteModal = useCallback(async () => {
        setDeleteModalOpen(!deleteModalOpen);
    }, [deleteModalOpen, setDeleteModalOpen]);

    const handleSubmit = useCallback(async () => {
        setSubmitting(true);

        try {
            const text = editor.getHTML();
            validateCreatePostForm(text, image, showImage);

            let id = params.get("id");
            const formData = new FormData();
            formData.append("text", text);
            formData.append("image", image || null);

            if (id) {
                await updatePost(id, formData);
            } else {
                id = await createPost(formData);
            }

            window.location.href = `${process.env.REACT_APP_MAIN_URL}/blog/${id}`;
        } catch ({ message }) {
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }, [params, setSubmitting, editor, image, showImage]);

    useEffect(() => {
        (async () => {
            const id = params.get("id");

            if (id) {
                try {
                    const post = await getPost(id);

                    editor.commands.setContent(
                        `<h1>${post.title}</h1>${post.content}`,
                    );
                    setQuery({
                        data: { post },
                        loading: false,
                        error: false,
                    });
                } catch (e) {
                    setQuery({
                        data: null,
                        loading: false,
                        error: true,
                    });
                }
            } else {
                setQuery({
                    data: null,
                    loading: false,
                    error: false,
                });
            }
        })();
    }, [editor, params]);

    if (loading) return <Loading />;
    if (notFound) return <NotFound />;

    return (
        <AuthorizedRoute>
            <main>
                <div className="content">
                    <a aria-label="back button" href="/blog">
                        &#8592;
                    </a>
                    <Editor editor={editor} disabled={submitting} />
                    <div
                        style={{
                            marginTop: "16px",
                        }}
                    />
                    <Dropzone
                        id={params.get("id")}
                        showImage={showImage}
                        setShowImage={setShowImage}
                        title={data && data.post.title}
                        postImage={data && data.post.image}
                        submitting={submitting}
                        image={image}
                        setImage={setImage}
                    />
                    <p className="post-error-message">{error || ""}</p>
                    <div className="post-btns">
                        {params.get("id") && (
                            <button
                                type="submit"
                                onClick={toggleDeleteModal}
                                className="post-delete-btn"
                            >
                                {submitting ? <Spinner /> : "Delete"}
                            </button>
                        )}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="post-submit-btn"
                        >
                            {submitting ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                    <DeleteModal
                        id={params.get("id")}
                        modalOpen={deleteModalOpen}
                        handleToggleModal={toggleDeleteModal}
                    />
                </div>
            </main>
        </AuthorizedRoute>
    );
}
