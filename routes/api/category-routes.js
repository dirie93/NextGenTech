const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // find the category by its `id` value
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    await category.update(req.body);
    // update a category by its `id` value
    res.status(200).json({ message: "Category updated successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // find the category by its `id` value
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    // delete a category by its `id` value
    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
