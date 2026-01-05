import Bus from '../models/Bus.js';

// Get all buses (only active ones, excluding sold)
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({ status: { $ne: 'sold' } }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: buses.length,
      data: buses
    });
  } catch (error) {
    console.error('Get buses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching buses',
      error: error.message
    });
  }
};

// Get single bus by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.json({
      success: true,
      data: bus
    });
  } catch (error) {
    console.error('Get bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bus',
      error: error.message
    });
  }
};

// Create new bus
export const createBus = async (req, res) => {
  try {
    const { busName, busModel, busType, seater, price, busImage } = req.body;

    // Validate input
    if (!busName || !busModel || !busType || !seater || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: busName, busModel, busType, seater, price'
      });
    }

    // Create new bus
    const newBus = await Bus.create({
      busName,
      busModel,
      busType,
      seater: parseInt(seater),
      price: parseFloat(price),
      busImage: busImage || null
    });

    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: newBus
    });
  } catch (error) {
    console.error('Create bus error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating bus',
      error: error.message
    });
  }
};

// Update bus
export const updateBus = async (req, res) => {
  try {
    const { busName, busModel, busType, seater, price, busImage, status } = req.body;

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    // Update fields
    if (busName) bus.busName = busName;
    if (busModel) bus.busModel = busModel;
    if (busType) bus.busType = busType;
    if (seater) bus.seater = parseInt(seater);
    if (price) bus.price = parseFloat(price);
    if (busImage !== undefined) bus.busImage = busImage;
    if (status) bus.status = status;

    const updatedBus = await bus.save();

    res.json({
      success: true,
      message: 'Bus updated successfully',
      data: updatedBus
    });
  } catch (error) {
    console.error('Update bus error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating bus',
      error: error.message
    });
  }
};

// Delete bus
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    await bus.deleteOne();

    res.json({
      success: true,
      message: 'Bus deleted successfully',
      data: bus
    });
  } catch (error) {
    console.error('Delete bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting bus',
      error: error.message
    });
  }
};

// Get bus statistics
export const getBusStats = async (req, res) => {
  try {
    // Get total buses count (excluding sold buses)
    const totalBuses = await Bus.countDocuments({ status: { $ne: 'sold' } });

    // Get AC buses count (only active, excluding sold)
    const acBuses = await Bus.countDocuments({ busType: 'AC', status: { $ne: 'sold' } });

    // Get Non-AC buses count (only active, excluding sold)
    const nonAcBuses = await Bus.countDocuments({ busType: 'Non-AC', status: { $ne: 'sold' } });

    // Get sold buses count
    const soldBuses = await Bus.countDocuments({ status: 'sold' });

    res.json({
      success: true,
      data: {
        totalBuses,
        acBuses,
        nonAcBuses,
        soldBuses
      }
    });
  } catch (error) {
    console.error('Get bus stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bus statistics',
      error: error.message
    });
  }
};
