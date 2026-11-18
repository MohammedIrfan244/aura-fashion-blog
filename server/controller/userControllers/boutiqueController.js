import BoutiqueCategory from "../../model/boutiqueCategoryModel.js";
import Boutique from "../../model/boutiqueModel.js";
import BoutiqueReview from "../../model/boutiqueReviewModel.js";
import CustomError from "../../utilities/CustomError.js";

const getAllBoutiqueBanners = async (req, res, next) => {
  const banners = await BoutiqueCategory.find(
    {},
    { banner: 1, name: 1, title: 1 }
  );
  if (!banners) {
    return next(new CustomError("Boutique banners not found", 404));
  }
  res
    .status(200)
    .json({ banners, message: "Boutique banners fetched successfully" });
};

const getBoutiqueByCategory = async (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    return next(new CustomError("Please provide category", 400));
  }
  const boutique = await Boutique.find(
    { category: category },
    { name: 1, category: 1, firstImage: 1, price: 1 }
  );
  if (!boutique) {
    return next(new CustomError("Boutique not found", 404));
  }
  res.status(200).json({ boutique, message: "Boutique fetched successfully" });
};

const getBoutiqueById = async (req, res, next) => {
  const { id } = req.params;
  const boutique = await Boutique.findById(id);
  if (!boutique) {
    return next(new CustomError("Boutique not found", 404));
  }
  res.status(200).json({ boutique, message: "Boutique fetched successfully" });
};

const createBoutique = async (req, res, next) => {
  let { name, category, price, link, firstImage, secondImage, thirdImage, fourthImage } = req.body;

  // Handle uploaded files if provided
  if (req.uploadedFiles && req.uploadedFiles.length > 0) {
    const urls = req.uploadedFiles.map((f) => f.secure_url);
    if (urls[0]) firstImage = urls[0];
    if (urls[1]) secondImage = urls[1];
    if (urls[2]) thirdImage = urls[2];
    if (urls[3]) fourthImage = urls[3];
  } else if (req.uploadedFile?.secure_url) {
    firstImage = req.uploadedFile.secure_url;
  }

  if (!name || !category || !price || !firstImage) {
    return next(
      new CustomError("Name, category, price and at least first image are required", 400)
    );
  }

  // Fallbacks for missing thumbnails so the gallery doesn't break
  secondImage = secondImage || firstImage;
  thirdImage = thirdImage || secondImage || firstImage;
  fourthImage = fourthImage || thirdImage || firstImage;
  link = link || "#";

  // Clean price: ensure no leading raw double dollar signs
  const cleanPrice = price.toString().replace(/^\$+/, "");

  const categorySlug = category.toLowerCase().trim();

  const newBoutique = new Boutique({
    name: name.trim(),
    category: categorySlug,
    price: cleanPrice,
    link: link.trim(),
    firstImage: firstImage.trim(),
    secondImage: secondImage.trim(),
    thirdImage: thirdImage.trim(),
    fourthImage: fourthImage.trim(),
  });

  await newBoutique.save();

  // Ensure category exists in BoutiqueCategory collection
  const existingCategory = await BoutiqueCategory.findOne({ name: categorySlug });
  if (!existingCategory) {
    await BoutiqueCategory.create({
      name: categorySlug,
      title: category.trim(),
      banner: firstImage.trim(),
      image: firstImage.trim(),
      badge: firstImage.trim(),
    });
  }

  res.status(201).json({
    boutique: newBoutique,
    message: "Product created successfully",
  });
};

const addBoutiqueReview = async (req, res, next) => {
  const { id } = req.params;
  const { review } = req.body;

  if (!review || !review.trim()) {
    return next(new CustomError("Review/comment cannot be empty", 400));
  }

  const boutique = await Boutique.findById(id);
  if (!boutique) {
    return next(new CustomError("Product not found", 404));
  }

  const newReview = new BoutiqueReview({
    user: req.user.id,
    boutique: id,
    review: review.trim(),
  });

  await newReview.save();
  await newReview.populate("user", "username profile");

  res.status(201).json({
    review: newReview,
    message: "Comment added successfully",
  });
};

const getBoutiqueReviews = async (req, res, next) => {
  const { id } = req.params;

  const reviews = await BoutiqueReview.find({ boutique: id })
    .populate("user", "username profile")
    .sort({ createdAt: -1 });

  res.status(200).json({
    reviews,
    message: "Reviews fetched successfully",
  });
};

const deleteBoutiqueReview = async (req, res, next) => {
  const { id } = req.params;

  const review = await BoutiqueReview.findById(id);
  if (!review) {
    return next(new CustomError("Comment not found", 404));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new CustomError("You are not authorized to delete this comment", 403));
  }

  await BoutiqueReview.findByIdAndDelete(id);
  res.status(200).json({ message: "Comment deleted successfully" });
};

export {
  getAllBoutiqueBanners,
  getBoutiqueByCategory,
  getBoutiqueById,
  createBoutique,
  addBoutiqueReview,
  getBoutiqueReviews,
  deleteBoutiqueReview,
};
