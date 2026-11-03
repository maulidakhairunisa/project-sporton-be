
import { Request, Response } from "express";
import Category from "../models/category.model";
import uploadToCloudinary from "../utils/cloudinary.util";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        "categories"
      );

      categoryData.imageUrl = result.secure_url;
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
      error,
    });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error,
    });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category",
      error,
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        "categories"
      );

      categoryData.imageUrl = result.secure_url;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      categoryData,
      { new: true, runValidators: true }
    );

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
      error,
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
      error,
    });
  }
};
