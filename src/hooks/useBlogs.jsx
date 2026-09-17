import { useCallback, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setBlogs(data);
    setLoading(false);
  }, []);

  const fetchMyBlogs = useCallback(async (userId) => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setBlogs(data);
    setLoading(false);
  }, []);

  const getBlog = useCallback(async (blogId) => {
    const { data, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", blogId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    return data;
  }, []);

  async function updateBlog(blogId, blogData) {
    const { data, error: updateError } = await supabase
      .from("blogs")
      .update({
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", blogId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return data;
  }

  async function createBlog(blogData, user) {
    const authorName = user.user_metadata?.display_name;

    const { data, error: createError } = await supabase
      .from("blogs")
      .insert({
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        author_id: user.id,
        author_name: authorName,
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    return data;
  }

  async function deleteBlog(blogId) {
    const { error: deleteError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", blogId);

    if (deleteError) {
      throw deleteError;
    }
  }

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    fetchMyBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}

// Note: we added a new function called createBlog:
// this function will use the currently logged-in supabase user,
// save the user's author_ id
// save the user's display name as author_name
// insert the title, excerpt , and content
// return an error if supabase reject the insert

// Why we're explicity sending author_id:
// the databad derfautl protects insets when the value isn't supplied, but
// we're explicitly sending the authenticated user's ID here as well and
// our RLS policy checks : auth.uid() = author_id
// so even if someone tried to manipulate the frontend, supabase's RLS remains
// the security boundary.
