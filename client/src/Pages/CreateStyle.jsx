import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuImagePlus, LuPlus, LuTrash2, LuArrowLeft } from "react-icons/lu";
import axiosInstance from "../Utilities/axiosInstance";
import axiosErrorManager from "../Utilities/axiosErrorManager";

function CreateStyle() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [contentSections, setContentSections] = useState([
    { contentTitle: "Getting Started", contentDetails: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/public/all-style-categories");
        setCategories(response.data.categories || []);
        if (response.data.categories?.length > 0) {
          setCategory(response.data.categories[0].name);
        }
      } catch (err) {
        console.log(axiosErrorManager(err));
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageUrl("");
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
      setImageFile(null);
    } else {
      setImagePreview("");
    }
  };

  const addSection = () => {
    setContentSections([
      ...contentSections,
      { contentTitle: "", contentDetails: "" },
    ]);
  };

  const removeSection = (index) => {
    if (contentSections.length === 1) return;
    setContentSections(contentSections.filter((_, i) => i !== index));
  };

  const updateSection = (index, field, value) => {
    const updated = [...contentSections];
    updated[index][field] = value;
    setContentSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const targetCategory = category === "other" ? customCategory.trim() : category;

    if (!name.trim()) {
      setError("Please enter a blog title");
      return;
    }
    if (!targetCategory) {
      setError("Please select or enter a category");
      return;
    }
    if (!description.trim()) {
      setError("Please provide a brief description");
      return;
    }
    if (!imageFile && !imageUrl.trim()) {
      setError("Please provide a featured image (upload or URL)");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("category", targetCategory);
      formData.append("description", description.trim());
      formData.append("author", currentUser?.username || "Fashion Editor");
      formData.append("content", JSON.stringify(contentSections));

      if (imageFile) {
        formData.append("file", imageFile);
      } else {
        formData.append("image", imageUrl.trim());
      }

      const response = await axiosInstance.post("/style/create-style", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const created = response.data.style;
      navigate(`/style/${created.category}/${created._id}`);
    } catch (err) {
      setError(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-8 min-h-screen bg-richBlack text-snowWhite flex justify-center pb-20">
      <div className="max-w-3xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <LuArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-beban tracking-wider mb-2">Write a New Blog Post</h1>
        <p className="text-sm text-gray-400 mb-8">
          Share your style guides, fashion tips, and beauty trends with the community.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Blog Title *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Chic: Essential Streetwear for 2026"
              className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite"
              >
                {categories.map((c) => (
                  <option key={c._id || c.name} value={c.name}>
                    {c.title || c.name}
                  </option>
                ))}
                <option value="other">+ New Category</option>
              </select>
            </div>

            {category === "other" && (
              <div>
                <label className="block text-sm font-semibold mb-2">New Category Name *</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. Vintage Aesthetics"
                  className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Brief Summary / Intro *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A captivating summary that introduces your article to readers..."
              rows={3}
              className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">Featured Image *</label>
            <div className="space-y-3">
              <input
                type="text"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="Paste an image URL (e.g. https://images.unsplash.com/...)"
                className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
              />
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">or upload file:</span>
                <label className="cursor-pointer bg-[#2E2E33] hover:bg-[#3E3E44] px-4 py-1.5 rounded text-xs flex items-center gap-2 transition-colors">
                  <LuImagePlus /> Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <span className="text-xs text-electricBlue truncate max-w-xs">
                    {imageFile.name}
                  </span>
                )}
              </div>
            </div>

            {imagePreview && (
              <div className="mt-4 w-full h-56 rounded-lg overflow-hidden border border-[#2E2E33] bg-black">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Sections */}
          <div className="pt-4 border-t border-[#2E2E33]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-beban tracking-wider">Article Content Sections</h2>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-1.5 text-xs bg-electricBlue/20 text-electricBlue hover:bg-electricBlue hover:text-white px-3 py-1.5 rounded transition-all"
              >
                <LuPlus /> Add Section
              </button>
            </div>

            <div className="space-y-4">
              {contentSections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-[#18181C] border border-[#2A2A30] p-4 rounded-lg space-y-3 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Section {idx + 1}
                    </span>
                    {contentSections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="text-gray-500 hover:text-red-400 text-sm transition-colors"
                        title="Remove Section"
                      >
                        <LuTrash2 />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={section.contentTitle}
                    onChange={(e) => updateSection(idx, "contentTitle", e.target.value)}
                    placeholder="Section Title (e.g. Choosing the Right Palette)"
                    className="w-full bg-[#24242A] border border-[#33333A] rounded px-3 py-2 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
                  />

                  <textarea
                    value={section.contentDetails}
                    onChange={(e) => updateSection(idx, "contentDetails", e.target.value)}
                    placeholder="Detailed section content, styling advice, or product recommendations..."
                    rows={4}
                    className="w-full bg-[#24242A] border border-[#33333A] rounded px-3 py-2 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-snowWhite text-richBlack font-bold py-3 rounded-lg hover:bg-electricBlue hover:text-white transition-all disabled:opacity-50 text-base"
          >
            {loading ? "Publishing Post..." : "Publish Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStyle;
