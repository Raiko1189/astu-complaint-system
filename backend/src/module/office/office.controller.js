import Office from '../../model/Office.js';

// @desc    Get all offices
// @route   GET /api/offices
// @access  Public
export const getAllOffices = async (req, res) => {
    try {
        const offices = await Office.find();
        res.status(200).json({
            success: true,
            count: offices.length,
            data: offices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new office
// @route   POST /api/offices
// @access  Private/Admin
export const createOffice = async (req, res) => {
    try {
        const office = await Office.create(req.body);
        res.status(201).json({
            success: true,
            data: office
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create office',
            error: error.message
        });
    }
};

// @desc    Update office
// @route   PUT /api/offices/:id
// @access  Private/Admin
export const updateOffice = async (req, res) => {
    try {
        const office = await Office.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!office) {
            return res.status(404).json({
                success: false,
                message: 'Office not found'
            });
        }

        res.status(200).json({
            success: true,
            data: office
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update office',
            error: error.message
        });
    }
};

// @desc    Delete office
// @route   DELETE /api/offices/:id
// @access  Private/Admin
export const deleteOffice = async (req, res) => {
    try {
        const office = await Office.findByIdAndDelete(req.params.id);

        if (!office) {
            return res.status(404).json({
                success: false,
                message: 'Office not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete office',
            error: error.message
        });
    }
};
