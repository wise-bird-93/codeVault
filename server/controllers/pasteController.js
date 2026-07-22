const Paste = require("../models/Paste");

const createPaste = async (req, res) => {
    try {
        const { title, code, language } = req.body;

        if (!title || !code) {
            return res.status(400).json({
                success: false,
                message: "Title and code are required",
            });
        }

        const paste = await Paste.create({
            title,
            code,
            language,
        });

        return res.status(201).json({
            success: true,
            data: paste,
            message: "Paste created successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getAllPastes = async (req, res) => {
    try {
        const pastes = await Paste.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: pastes,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getPasteById = async (req, res) => {
    try {
        const { id } = req.params;

        const paste = await Paste.findById(id);

        if (!paste) {
            return res.status(404).json({
                success: false,
                message: "Paste not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: paste,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updatePaste = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, code, language } = req.body;

        if (!title || !code) {
            return res.status(400).json({
                success: false,
                message: "Title and code are required",
            });
        }

        const updatedPaste = await Paste.findByIdAndUpdate(
            id,
            {
                title,
                code,
                language,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedPaste) {
            return res.status(404).json({
                success: false,
                message: "Paste not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedPaste,
            message: "Paste updated successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deletePaste = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPaste = await Paste.findByIdAndDelete(id);

        if (!deletedPaste) {
            return res.status(404).json({
                success: false,
                message: "Paste not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Paste deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createPaste,
    getAllPastes,
    getPasteById,
    updatePaste,
    deletePaste,
};