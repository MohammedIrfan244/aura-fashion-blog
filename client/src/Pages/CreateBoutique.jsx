import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuImagePlus, LuArrowLeft } from "react-icons/lu";
import axiosInstance from "../Utilities/axiosInstance";
import axiosErrorManager from "../Utilities/axiosErrorManager";

function CreateBoutique() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");
  const [firstFile, setFirstFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/public/all-boutique-categories");
        const cats = response.data.categories || [];
        setCategories(cats);
        if (cats.length > 0) {
          setCategory(cats[0].name);
        }
      } catch (err) {
        console.log(axiosErrorManager(err));
      }
    };
    fetchCategories();
  }, []);

  const handleFirstFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFirstFile(file);
      setFirstImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const targetCategory = category === "other" ? customCategory.trim() : category;

    if (!name.trim()) {
      setError("Please enter a product name");
      return;
    }
    if (!targetCategory) {
      setError("Please select or enter a brand/category");
      return;
    }
    if (!price.trim()) {
      setError("Please specify a price");
      return;
    }
    if (!firstImage && !firstFile) {
      setError("Please provide at least the main product image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("category", targetCategory);
      formData.append("price", price.trim().replace(/^\$+/, ""));
      formData.append("link", link.trim() || "#");

      if (firstFile) {
        formData.append("files", firstFile);
      } else {
        formData.append("firstImage", firstImage.trim());
      }

      if (secondImage.trim()) formData.append("secondImage", secondImage.trim());
      if (thirdImage.trim()) formData.append("thirdImage", thirdImage.trim());
      if (fourthImage.trim()) formData.append("fourthImage", fourthImage.trim());

      const response = await axiosInstance.post("/boutique/create-boutique", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const created = response.data.boutique;
      navigate(`/boutiques?brand=${created.category}`);
    } catch (err) {
      setError(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-8 min-h-screen bg-richBlack text-snowWhite flex justify-center pb-20">
      <div className="max-w-2xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <LuArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-beban tracking-wider mb-2">Add New Boutique Product</h1>
        <p className="text-sm text-gray-400 mb-8">
          Feature curated fashion items, designer pieces, and luxury cosmetics in the boutique catalog.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dior Addict Lip Glow Oil"
              className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Brand / Category *</label>
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
                <option value="other">+ New Brand / Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Price (USD) *</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 40 or 40.00"
                className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
              />
            </div>
          </div>

          {category === "other" && (
            <div>
              <label className="block text-sm font-semibold mb-2">New Brand / Category Name *</label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Chanel"
                className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
              />
            </div>
          )}

          {/* Checkout URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">Checkout / Store URL</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g. https://www.sephora.com/product/..."
              className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">Main Product Image *</label>
            <div className="space-y-3">
              <input
                type="text"
                value={firstImage}
                onChange={(e) => {
                  setFirstImage(e.target.value);
                  setFirstFile(null);
                }}
                placeholder="Paste main image URL (e.g. https://...)"
                className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded-lg px-4 py-2 text-sm outline-none focus:border-electricBlue text-snowWhite placeholder:text-gray-500"
              />
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">or upload:</span>
                <label className="cursor-pointer bg-[#2E2E33] hover:bg-[#3E3E44] px-4 py-1.5 rounded text-xs flex items-center gap-2 transition-colors">
                  <LuImagePlus /> Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFirstFileChange}
                    className="hidden"
                  />
                </label>
                {firstFile && (
                  <span className="text-xs text-electricBlue truncate max-w-xs">
                    {firstFile.name}
                  </span>
                )}
              </div>
            </div>

            {firstImage && (
              <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border border-[#2E2E33] bg-black">
                <img
                  src={firstImage}
                  alt="Main Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Additional Gallery Images */}
          <div className="pt-4 border-t border-[#2E2E33]">
            <label className="block text-sm font-semibold mb-3">
              Gallery Images (Optional Thumbnail Views)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-xs text-gray-400 block mb-1">Thumbnail 2 URL</span>
                <input
                  type="text"
                  value={secondImage}
                  onChange={(e) => setSecondImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded px-3 py-1.5 text-xs outline-none focus:border-electricBlue text-snowWhite"
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">Thumbnail 3 URL</span>
                <input
                  type="text"
                  value={thirdImage}
                  onChange={(e) => setThirdImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded px-3 py-1.5 text-xs outline-none focus:border-electricBlue text-snowWhite"
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">Thumbnail 4 URL</span>
                <input
                  type="text"
                  value={fourthImage}
                  onChange={(e) => setFourthImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#1F1F24] border border-[#2E2E33] rounded px-3 py-1.5 text-xs outline-none focus:border-electricBlue text-snowWhite"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-snowWhite text-richBlack font-bold py-3 rounded-lg hover:bg-electricBlue hover:text-white transition-all disabled:opacity-50 text-base"
          >
            {loading ? "Adding Product..." : "Publish Product to Boutique"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBoutique;
