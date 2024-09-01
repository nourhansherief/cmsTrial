// routes/dataLists.js
const express = require('express');
const router = express.Router();
const DataList = require('../models/DataList');
const DataDefinition = require('../models/DataDefinition');
const mongoose = require('mongoose');



// Get all data Lists
router.get('/', async (req, res) => {
  try {
    const dataLists = await DataList.find();
    res.status(200).json(dataLists);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new data list
router.post('/', async (req, res) => {
  try {
    const { name, dataDefinitionId } = req.body;

    console.log("sss" , name , dataDefinitionId)

    // Find the related data definition
    const dataDefinition = await DataDefinition.findById(dataDefinitionId);
    if (!dataDefinition) {
      return res.status(404).json({ error: 'Data definition not found' });
    }

    // Create a new data list
    const dataList = new DataList({
      name,
      dataDefinition: dataDefinition._id,
      records: []  // Start with an empty list of records
    });

    await dataList.save();
    res.status(201).json(dataList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get the structure of the data definition connected to a specific data list
router.get('/:id/structure', async (req, res) => {
  try {
    const dataListId = req.params.id;

    // Find the data list and populate the associated data definition
    const dataList = await DataList.findById(dataListId).populate('dataDefinition');
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    // Return the structure of the associated data definition
    const dataDefinitionStructure = dataList.dataDefinition.structure;
    res.status(200).json(dataDefinitionStructure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/records', async (req, res) => {
  try {
    const dataListId = req.params.id;
    const newRecordData  = req.body;

    // Find the data list
    const dataList = await DataList.findById(dataListId).populate('dataDefinition');
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    // Validate the record against the data definition structure
    // const isValid = validateRecord(newRecord, dataList.dataDefinition.structure);
    // if (!isValid) {
    //   return res.status(400).json({ error: 'Record structure does not match data definition' });
    // }

     // Generate a unique identifier for the new record
     const newRecord = {
      _id: new mongoose.Types.ObjectId(),
      data: newRecordData
    };


    // Add the record to the data list
    dataList.records.push(newRecord);
    await dataList.save();

    res.status(201).json(dataList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Function to validate a record against the data definition structure
// function validateRecord(record, structure) {
//   // Implement validation logic here based on your structure
//   // This is a simple example, you might need a more complex validation
//   return true;  // Assume valid for now
// }

// Get all records from a data list
router.get('/:id/records', async (req, res) => {
  try {
    const dataListId = req.params.id;

    // Find the data list
    const dataList = await DataList.findById(dataListId);
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    res.status(200).json(dataList.records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a data definition by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataList = await DataList.findByIdAndDelete(id);
    if (!dataList) {
      return res.status(404).json({ error: 'Data List not found' });
    }
    res.status(200).json({ message: 'Data List  deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update a specific record in a data list
router.put('/:dataListId/records/:recordId', async (req, res) => {
  try {
    const { dataListId, recordId } = req.params;
    const updatedRecordData = req.body;

    // Find the data list
    const dataList = await DataList.findById(dataListId);
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    // Find the specific record
    const record = dataList.records.id(recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Update the record data
    record.data = updatedRecordData;

    // Save the updated data list
    await dataList.save();

    res.status(200).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a specific record from a data list
router.delete('/:dataListId/records/:recordId', async (req, res) => {
  try {
    const { dataListId, recordId } = req.params;

    // Find the data list
    const dataList = await DataList.findById(dataListId);
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    // Find the index of the record
    const recordIndex = dataList.records.findIndex(record => record._id.toString() === recordId);
    if (recordIndex === -1) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Remove the record from the array
    dataList.records.splice(recordIndex, 1);

    // Save the updated data list
    await dataList.save();

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get a specific record by ID along with its data definition
router.get('/:dataListId/records/:recordId', async (req, res) => {
  try {
    const { dataListId, recordId } = req.params;

    // Find the data list and populate the associated data definition
    const dataList = await DataList.findById(dataListId).populate('dataDefinition');
    if (!dataList) {
      return res.status(404).json({ error: 'Data list not found' });
    }

    // Find the specific record by ID
    const record = dataList.records.id(recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Prepare the response with the record data and its associated data definition structure
    const response = {
      record: record.data,
      definition: dataList.dataDefinition.structure
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get the content that starts with certain prefix
router.get('/content', async (req , res) => {
  try {
    // Step 1: Get all data lists that start with "web_"
    const dataLists =  await DataList.find({ name: { $regex: /^web_/, $options: 'i' } });

    console.log("data lists" , dataLists);

    // Step 2: Initialize an object to hold the structured data
    const structuredData = {};

    // Step 3: Process each data list
    dataLists.forEach(dataList => {
      dataList.records.forEach(record => {
        const { webPageName, webObjectName, parentId, ...rest } = record.data;

        // Step 4: Ensure webPageName is a key in structuredData
        if (!structuredData[webPageName]) {
          structuredData[webPageName] = {};
        }

        // Step 5: If parentId is "0", it's a root element
        if (parentId === "0") {
          if (!structuredData[webPageName][webObjectName]) {
            structuredData[webPageName][webObjectName] = { ...rest };
          } else {
            // Update existing root object if needed
            Object.assign(structuredData[webPageName][webObjectName], rest);
          }
        } else {
          // Step 6: Handle children records
          for (const [key, value] of Object.entries(structuredData[webPageName])) {
            if (key === parentId) {
              if (!value[webObjectName]) {
                value[webObjectName] = { ...rest };
              } else {
                // Update existing child object if needed
                Object.assign(value[webObjectName], rest);
              }
              break;
            }
          }
        }
      });
    });

    res.status(200).json(structuredData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

module.exports = router;
